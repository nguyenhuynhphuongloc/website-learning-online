import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReadingTest } from 'src/schemas/TestSchemas/ReadingTest.schemas';

@Schema()
export class ListeningTest extends ReadingTest { // Kế thừa Document

    @Prop({ required: true })
    audio: string;

}

export const ListeningTestSchema = SchemaFactory.createForClass(ListeningTest);
