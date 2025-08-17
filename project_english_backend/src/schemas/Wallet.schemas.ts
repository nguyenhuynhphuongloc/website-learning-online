import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Wallet extends Document {

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, min: 0, max: 1000000 })
  amount: number;

}

export const WalletSchemal = SchemaFactory.createForClass(Wallet);
