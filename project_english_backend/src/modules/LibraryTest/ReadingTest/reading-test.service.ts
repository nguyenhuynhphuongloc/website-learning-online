import { Injectable } from '@nestjs/common';
import { CreateReadingTestDto } from './dto/create-reading-test.dto';
import { UpdateReadingTestDto } from './dto/update-reading-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReadingTest } from 'src/schemas/TestSchemas/ReadingTest.schemas';
import { Model } from 'mongoose';
import { ReadingResult } from 'src/schemas/ResultShemas/ReadingResult.schemas';

@Injectable()
export class ReadingTestService {
  constructor(
    @InjectModel(ReadingTest.name) private readonly ReadingModel: Model<ReadingTest>,
    @InjectModel(ReadingResult.name) private readonly ReadingResultModel: Model<ReadingResult>,
  ) { }

  async create(createReadingTestDto: CreateReadingTestDto) {
    return await this.ReadingModel.create(createReadingTestDto);
  }

  async findAll(userId, page: number, limit: number) {

    const skip = (page - 1) * limit;

    console.log('skip', skip);

    const [data, total, results] = await Promise.all([
      this.ReadingModel.find({}, { _id: 1, title: 1 }) // Chỉ lấy _id và title
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.ReadingModel.countDocuments().exec(),

      this.ReadingResultModel.find({ userId }).select('testId')
        .lean()
        .exec(),

    ]);

    const totalPages = Math.ceil(total / limit);

    const completedTestIds = new Set(results.map(r => r.testId.toString()));

    const enrichedData = data.map(test => ({
      ...test,
      isCompleted: completedTestIds.has(test._id.toString()),
    }));

    return {
      data: enrichedData,
      total,
      page,
      totalPages,
    };
  }

  async findOne(id: string) {
    const test = await this.ReadingModel.findById(id).lean();

    const formatted = test.section.map((s, index) => ({
      part: `Section ${index + 1}`,
      questions: s.questions.map((q, i) => ({
        id: q.id,
        answer: q.answer
      }))
    }));

    return { data: formatted };
  }

  async update(id: string, updateReadingTestDto: UpdateReadingTestDto) {
    return this.ReadingModel.findByIdAndUpdate(id, updateReadingTestDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.ReadingModel.findByIdAndDelete(id).exec();
  }

  async findOneFull(id: string) {
    return this.ReadingModel.findById(id).exec();
  }
}
