import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema()
export class ReadingResult extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ReadingTest' })
  testId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop()
  score: number;

  @Prop()
  completedAt?: Date;
}

export const ReadingResultSchema = SchemaFactory.createForClass(ReadingResult);
