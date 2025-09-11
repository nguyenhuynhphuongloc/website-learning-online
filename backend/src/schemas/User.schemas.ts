import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaType, SchemaTypes, Types } from 'mongoose';
import { ROLE } from 'src/enum/role';


@Schema()
export class User {

  @Prop({ unique: false, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  password: string;

  @Prop({ required: false })
  email: string;

  @Prop({ default: 'local' }) // local | google | facebook ...
  provider: string;

  @Prop({ default: null })
  hashedRefreshToken: string

  @Prop({ required: false, default: null })
  firstName?: string;

  @Prop({ required: false, default: null })
  lastName?: string;

  @Prop({ required: false, default: null })
  avatarUrl?: string;

  @Prop({ required: false, default: null })
  dateOfbirth?: Date;

  @Prop({ required: false })
  codeId: string

  @Prop({ required: false, default: null })
  gender?: string;

  @Prop({ required: false, default: null })
  phoneNumber?: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({ default: false }) 
  isVip?: boolean;

  @Prop({ type: Number, default: 0 }) 
  roleId?: number;

  @Prop({ required: false }) 
  vipExpirationDate?: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  Comment: []

  @Prop({ enum: ROLE, default: ROLE.USER })
  role: ROLE;

}

export const UserSchemal = SchemaFactory.createForClass(User);
