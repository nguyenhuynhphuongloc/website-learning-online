import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Blacklist {

    @Prop({ unique: true })
    accesstoken: string

}

export const BlacklistSchemal = SchemaFactory.createForClass(Blacklist);
