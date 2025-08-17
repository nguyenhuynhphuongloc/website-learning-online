import { Controller, Get, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Post('create-wallet')
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get('balance')
  @UseGuards(AuthGuard)
  async getBalance(@Req() req) {
    const user = req.user;
    const userId = user.userId; // Lấy userId từ token
    return await this.walletService.getBalance(userId);
  }


  @Patch('update-wallet')
  @UseGuards(AuthGuard)
  update(@Req() req, @Body() updateWalletDto: UpdateWalletDto) {

    const user = req.user;

    console.log("user", user);
    ;

    return this.walletService.update(user.userId, updateWalletDto);
  }
}
