import { Injectable } from '@nestjs/common';
import { CreateListeningTestDto } from './dto/create-listening-test.dto';
import { UpdateListeningTestDto } from './dto/update-listening-test.dto';
import { ListeningTest } from 'src/schemas/TestSchemas/ListeningTest.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { listeningResult } from 'src/schemas/ResultShemas/ListeningResult.schemas';
import { Public } from 'src/decorator/custome';

@Injectable()
export class ListeningTestService {

  constructor(
    @InjectModel(ListeningTest.name) private ListeningTestModel: Model<ListeningTest>,
    @InjectModel(listeningResult.name) private readonly ListentingResultModel: Model<listeningResult>,
  ) { }

  async create(createListeningTestDto: CreateListeningTestDto) {
    return await this.ListeningTestModel.create(createListeningTestDto);
  }

  async findAll(userId, page: number, limit: number) {

    const skip = (page - 1) * limit;

    console.log(userId)

    const [data, total, results] = await Promise.all([
      this.ListeningTestModel.find({}, { _id: 1, title: 1 }) // Chỉ lấy _id và title
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.ListeningTestModel.countDocuments().exec(),

      this.ListentingResultModel.find({ userId })
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
    return await this.ListeningTestModel.findById(id);
  }

  @Public()
  update(id: number, updateListeningTestDto: UpdateListeningTestDto) {
    return `This action updates a #${id} listeningTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} listeningTest`;
  }
}
