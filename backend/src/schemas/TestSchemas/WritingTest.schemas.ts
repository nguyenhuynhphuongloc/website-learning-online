import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class Section {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  imagePath?: string;
}

@Schema()
export class WritingTest {
  @Prop()
  title: string

  @Prop({ type: Section })
  sections: Section[];
}

export const WritingTestSchema = SchemaFactory.createForClass(WritingTest);
