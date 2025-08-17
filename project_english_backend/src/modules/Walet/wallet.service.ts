import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from 'src/schemas/Wallet.schemas';
import { Model } from 'mongoose';

@Injectable()
export class WalletService {

  constructor(

    @InjectModel(Wallet.name)

    private readonly walletModel: Model<Wallet>,

  ) { }

  async create(createWalletDto: CreateWalletDto) {

    const wallet = await new this.walletModel(createWalletDto);

    return await wallet.save();
  }

  async findOne(userId) {

    const wallet = await this.walletModel.findById(userId)

    if (wallet) return wallet

    else throw Error("wallet not found")

  }


  async update(userId, updateWalletDto: UpdateWalletDto) {

    const wallet = await this.walletModel.findOne({ userId });

    if (!wallet) {
      throw new Error(`Wallet not found for user ID: ${userId}`);
    }

    // Cập nhật ví
    wallet.amount += Number(updateWalletDto.amount);

    return await wallet.save();
  }

  async getBalance(userId) {
    const wallet = await this.walletModel.findOne({ userId });

    if (!wallet) {
      throw new Error(`Wallet not found for user ID: ${userId}`);
    }

    return wallet.amount;
  }

}
