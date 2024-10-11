import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  IsOptional, IsString } from 'class-validator';
import { Document } from 'mongoose';
export enum Category {
  Flexibility = 'flexibility',
  Strength = 'strength',
  Cardio = 'cardio',
}

export enum muscleGroup {
  Legs = 'legs',
  Back = 'back',
  Chest = 'chest',
  Arms = 'arms',
  Forearm = 'forearm',
}

@Schema({
  timestamps: true, //createdAt + updatedAt
})
export class Exercise extends Document {
  @Prop()
  @IsString()
  name: string;

  @Prop()
  @IsString()
  description: string;

  @Prop()
  category: Category;

  @Prop()
  @IsOptional()
  muscle_group: muscleGroup;
}

export const exerciseSchema = SchemaFactory.createForClass(Exercise);
