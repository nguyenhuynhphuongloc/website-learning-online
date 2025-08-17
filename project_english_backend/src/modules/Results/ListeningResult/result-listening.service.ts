import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateResultListeningDto } from './dto/create-result-listening.dto';
import { UpdateResultListeningDto } from './dto/update-result-listening.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/modules/User/user.service';
import { listeningResult } from 'src/schemas/ResultShemas/ListeningResult.schemas';

@Injectable()
export class ResultListeningService {

  constructor(
    @InjectModel(listeningResult.name) private ListeningResultModel: Model<listeningResult>,
    private userService: UserService,
  ) { }


  async create(createResultListeningDto: CreateResultListeningDto, userId: string) {


    const existingResult = await this.ListeningResultModel.findOne({
      testId: createResultListeningDto.testId,
      userId: userId,
    }).exec();

    if (existingResult) {
      throw new ConflictException('Bạn đã nộp kết quả cho bài test này rồi.');
    }

    const payload = {
      ...createResultListeningDto,
      userId,
    };

    return await this.ListeningResultModel.create(payload);

  }

  async findAll(userId) {

    const user = await this.userService.getUserByid(userId);

    if (!user) {
      throw new Error('User not found.');
    }


    // Check if the userId is valid 
    const results = await this.ListeningResultModel.find({ userId: userId }).exec();

    if (!results) {
      throw new Error('No results found for this user.');
    }

    return results;
  }

  async findOne(id: string, userId: string) {

    const test = await this.ListeningResultModel.findOne({ testId: id, userId: userId }).exec();

    console.log("test", test);

    return test;
  }

  update(userid: string, updateResultListeningDto: UpdateResultListeningDto) {
    const payload = {
      ...updateResultListeningDto,
      userid,
    };
    return this.ListeningResultModel.findOneAndUpdate(payload);
  }

  remove(id: number) {
    return `This action removes a #${id} resultListening`;
  }
}
