import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import mongoose from 'mongoose';



@Schema({
  timestamps: true, //createdAt + updatedAt
})
export class Profile {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  @IsNumber()
  age: number;

  @Prop()
  @IsNumber()
  weight: number;

  @Prop()
  @IsString()
  fitnessGoals: string;
}

export const profileSchema = SchemaFactory.createForClass(Profile);
