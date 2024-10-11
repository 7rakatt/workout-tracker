import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { updateWorkoutPlanDto } from 'src/workoutPlan/dtos/updateWorkoutPlan.dto';
import { WorkoutPlan } from './schemas/workoutPlan.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { creatWorkoutPlanDto } from './dtos/createWorkoutPlan.dto';

@Injectable()
export class WorkoutPlanService {
  constructor(
    @InjectModel(WorkoutPlan.name)
    private workoutPlanModel: mongoose.Model<WorkoutPlan>,
  ) {}

  async findAll(query: Query): Promise<WorkoutPlan[]> {
    const limit = +query.limit || 2;
    const curPage = Number(query.page) || 1;
    const skip = (curPage - 1) * limit;
    const keyword = query.keyword
      ? {
          exercises: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const workoutPlans = await this.workoutPlanModel
      .find({ ...keyword })
      .limit(limit)
      .skip(skip);
    return workoutPlans;
  }

  async creat(
    workoutPlan: WorkoutPlan,
    user: User,
  ): Promise<WorkoutPlan> {
    const data = Object.assign(workoutPlan,{ user: user._id });
    const newWorkoutPlan = await this.workoutPlanModel.create(data);
    console.log(user._id)
    return newWorkoutPlan;
  }

  async findById(id: string): Promise<WorkoutPlan> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('not valid id');
    }
    const workoutPlan = await this.workoutPlanModel.findById(id);
    if (!workoutPlan) {
      throw new NotFoundException('workoutPlan is not found');
    }
    return workoutPlan;
  }

  async update(
    id: string,
    workoutPlan: updateWorkoutPlanDto,
  ): Promise<WorkoutPlan> {
    const updatedworkoutPlan = await this.workoutPlanModel.findByIdAndUpdate(
      id,
      workoutPlan,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!workoutPlan) {
      throw new NotFoundException('workout Plan is not found');
    }
    return updatedworkoutPlan;
  }

  async delete(id: string): Promise<WorkoutPlan> {
    return await this.workoutPlanModel.findByIdAndDelete(id);
  }
}
