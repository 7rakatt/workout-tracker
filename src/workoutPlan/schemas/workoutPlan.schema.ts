import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

@Schema({
  timestamps: true, //createdAt + updatedAt
})
export class WorkoutPlan {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  
  @Prop()
  @IsArray()
  exercises: string[];

  @Prop()
  @IsNumber()
  weight: number;
  @Prop()
  @IsNumber()
  reps: number;
  @Prop()
  @IsNumber()
  sets: number;

  @Prop()
  @IsString()
  date: string;

  @Prop()
  @IsString()
  time: string;
}

export const workoutPlanSchema = SchemaFactory.createForClass(WorkoutPlan);
