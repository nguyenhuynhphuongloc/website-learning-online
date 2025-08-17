import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema()
export class ReadingTest extends Document {

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  user: Types.ObjectId;

  @Prop({ required: true })
  title: string

  @Prop({
    type: [
      {
        content: { type: String },
        questions: {
          type: [Object], // or Schema.Types.Mixed[]
        },
      },
    ],
    validate: {
      validator: (value: any[]) =>
        Array.isArray(value) && value.length <= 4, // Ensure there are exactly 4 sections
      message: 'The test must contain exactly 4 sections.',
    },
  })
  section: {
    content: string;
    questions: any[];
  }[];

  @Prop({ type: Types.ObjectId, ref: 'ReadingResult', default: null })
  result: Types.ObjectId; // Liên kết 1 kết quả
}

export const ReadingTestSchema = SchemaFactory.createForClass(ReadingTest);
