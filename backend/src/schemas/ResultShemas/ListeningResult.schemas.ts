import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class listeningResult extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ListeningTest' })
  testId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop()
  score: number;

  @Prop()
  completedAt?: Date;
}

export const listeningResultSchema = SchemaFactory.createForClass(listeningResult);
