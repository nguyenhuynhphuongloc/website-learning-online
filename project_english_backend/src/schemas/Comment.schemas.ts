import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export interface Reply {
  comment: string;
  date?: Date;
}
@Schema()
export class Comment {


  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: [] })
  replies: Reply[];

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
