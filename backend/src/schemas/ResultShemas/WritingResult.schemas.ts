import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class WritingResult extends Document {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ReadingTest' })
  testId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop()
  task1Content: string;

  @Prop()
  task2Content: string;

  @Prop()
  completedAt?: Date;
}

export const WritingResultSchema = SchemaFactory.createForClass(WritingResult);
