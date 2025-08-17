import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';  // Import HttpModul
import { StripeModule } from 'src/modules/Payment/spripte.module';
import { WalletModule } from 'src/modules/Walet/wallet.module';
@Module({
  imports: [HttpModule,WalletModule, StripeModule],  // Add HttpModule to the imports array
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
