import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkoutPlanService } from './workoutPlan.service';
import { WorkoutPlan } from './schemas/workoutPlan.schema';
import { creatWorkoutPlanDto } from './dtos/createWorkoutPlan.dto';
import { updateWorkoutPlanDto } from '../workoutPlan/dtos/updateWorkoutPlan.dto';
import { Query as expressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('workoutPlan')
export class WorkoutPlanController {
  constructor(private WorkoutPlanService: WorkoutPlanService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Query() query: expressQuery): Promise<WorkoutPlan[]> {
    return this.WorkoutPlanService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async creatWorkoutPlan(
    @Body() workoutPlan: creatWorkoutPlanDto,
    @Req() req,
  ): Promise<WorkoutPlan> {
    return this.WorkoutPlanService.creat(workoutPlan, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<WorkoutPlan> {
    return this.WorkoutPlanService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateOne(
    @Param('id') id: string,
    @Body() workoutPlan: updateWorkoutPlanDto,
  ): Promise<WorkoutPlan> {
    return this.WorkoutPlanService.update(id, workoutPlan);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string) {
    return this.WorkoutPlanService.delete(id);
  }
}
