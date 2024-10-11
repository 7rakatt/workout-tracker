import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { updateExerciseDto } from 'src/exercise/dtos/updateExercise.dto';
import { Exercise } from './schemas/exercise.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { creatExerciseDto } from './dtos/createExercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseModel: mongoose.Model<Exercise>,
  ) {}

  async findAll(query: Query): Promise<Exercise[]> {
    const limit = +query.limit || 2;
    const curPage = Number(query.page) || 1;
    const skip = (curPage - 1) * limit;
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const exercises = await this.exerciseModel
      .find({ ...keyword })
      .limit(limit)
      .skip(skip);
    return exercises;
  }

  async creat(exercise: creatExerciseDto,user:User): Promise<Exercise> {
    const data = Object.assign({ user: user._id }, exercise);
    const newExercise = await this.exerciseModel.create(data);
    return newExercise;
  }

  async findById(id: string): Promise<Exercise> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('not valid id');
    }
    const exercise = await this.exerciseModel.findById(id);
    if (!exercise) {
      throw new NotFoundException('exercise is not found');
    }
    return exercise;
  }

  async update(id: string, exercise: updateExerciseDto): Promise<Exercise> {
    const updatedexercise = await this.exerciseModel.findByIdAndUpdate(
      id,
      exercise,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!exercise) {
      throw new NotFoundException('exercise is not found');
    }
    return updatedexercise;
  }

  async delete(id: string): Promise<Exercise> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
}
