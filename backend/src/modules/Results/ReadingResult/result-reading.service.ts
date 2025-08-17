import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateResultReadingDto } from './dto/create-result-reading.dto';
import { UpdateResultReadingDto } from './dto/update-result-reading.dto';
import { ReadingResult } from 'src/schemas/ResultShemas/ReadingResult.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/modules/User/user.service';

@Injectable()
export class ResultReadingService {

  constructor(
    @InjectModel(ReadingResult.name) private ReadingResultModel: Model<ReadingResult>,
    private userService: UserService,
  ) { }

  async create(createResultReadingDto: CreateResultReadingDto, userId: string) {



    // Create a new result reading entry
    const payload = {
      ...createResultReadingDto,
      userId,
    };
    return await this.ReadingResultModel.create(payload);

  }


  async findAll(userId) {

    const user = await this.userService.getUserByid(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    console.log("findaii", userId)

    // Check if the userId is valid 
    const results = await this.ReadingResultModel.find({ userId: userId }).exec();

    if (!results) {
      throw new Error('No results found for this user.');
    }

    return results;
  }

  async findOne(id: string, userId: string) {
    return await this.ReadingResultModel.findOne({ testId: id, userId: userId }).exec();
  }

  async update(userid: string, updateResultReadingDto: UpdateResultReadingDto) {

    const payload = {
      ...updateResultReadingDto,
      userid,
    };

    return await this.ReadingResultModel.findOneAndUpdate(payload);
  }

  remove(id: number) {
    return `This action removes a #${id} resultReading`;
  }
}
