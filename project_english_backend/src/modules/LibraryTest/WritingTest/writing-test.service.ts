import { Injectable } from '@nestjs/common';
import { CreateWritingTestDto } from './dto/create-writing-test.dto';
import { UpdateWritingTestDto } from './dto/update-writing-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WritingTest } from 'src/schemas/TestSchemas/WritingTest.schemas';
import { WritingResult } from 'src/schemas/ResultShemas/WritingResult.schemas';

@Injectable()
export class WritingTestService {

  constructor(
    @InjectModel(WritingTest.name) private readonly WritingTestModel: Model<WritingTest>,
    @InjectModel(WritingResult.name) private readonly WritingResultModel: Model<WritingResult>,
  ) { }

  async create(createWritingTestDto: CreateWritingTestDto) {
    console.log('createWritingTestDto', createWritingTestDto);
    return await this.WritingTestModel.create(createWritingTestDto);
  }

  async getAll(userId: string, page: number, limit: number) {

    const skip = (page - 1) * limit;

    const [data, total, results] = await Promise.all([
      this.WritingTestModel.find({}, { _id: 1, title: 1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),

      this.WritingTestModel.countDocuments().exec(),

      this.WritingResultModel.find({ userId })
        .select('testId')
        .lean()
        .exec(),
    ]);

    const completedTestIds = new Set(results.map(r => r.testId.toString()));

    const enrichedData = data.map(test => ({
      ...test,
      isCompleted: completedTestIds.has(test._id.toString()),
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      data: enrichedData,
      total,
      page,
      totalPages,
    };
  }

  async findOne(id: string) {
    return await this.WritingTestModel.findById(id);
  }

  async update(id: string, updateWritingTestDto: UpdateWritingTestDto) {
    return await this.WritingTestModel.findByIdAndUpdate(id, updateWritingTestDto, { new: true });
  }

  async remove(id: string) {
    return await this.WritingTestModel.findByIdAndDelete(id);
  }
}
