import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWritingResultDto } from './dto/create-writing-result.dto';
import { UpdateWritingResultDto } from './dto/update-writing-result.dto';
import { WritingResult } from 'src/schemas/ResultShemas/WritingResult.schemas';

@Injectable()
export class WritingResultService {
  constructor(
    @InjectModel(WritingResult.name)
    private readonly writingResultModel: Model<WritingResult>,
  ) { }


  async create(createWritingResultDto: CreateWritingResultDto, userId: string) {

    const existingResult = await this.writingResultModel.findOne({
      testId: createWritingResultDto.testId,
      userId: userId,
    }).exec();

    if (existingResult) {
      throw new ConflictException('Bạn đã nộp kết quả cho bài test này rồi.');
    }

    const payload = {
      ...createWritingResultDto,
      userId,
    };

    return this.writingResultModel.create(payload);

  }

  async findAll() {
    return this.writingResultModel.find().exec();
  }

  async findOne(id: string) {
    return this.writingResultModel.findById(id).exec();
  }

  async update(id: string, updateWritingResultDto: UpdateWritingResultDto) {
    return this.writingResultModel.findByIdAndUpdate(id, updateWritingResultDto, {
      new: true,
    }).exec();
  }

  async remove(id: string) {
    return this.writingResultModel.findByIdAndDelete(id).exec();
  }
}
