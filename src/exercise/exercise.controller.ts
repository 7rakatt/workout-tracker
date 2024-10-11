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
import { ExerciseService } from './exercise.service';
import { Exercise } from './schemas/exercise.schema';
import { creatExerciseDto } from './dtos/createExercise.dto';
import { updateExerciseDto } from '../exercise/dtos/updateExercise.dto';
import { Query as expressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('exercise')
export class ExerciseController {
  constructor(private ExerciseService: ExerciseService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Query() query: expressQuery): Promise<Exercise[]> {
    return this.ExerciseService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async creatExercise(@Body() exercise: creatExerciseDto,@Req() req): Promise<Exercise> {
    return this.ExerciseService.creat(exercise,req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<Exercise> {
    return this.ExerciseService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateOne(
    @Param('id') id: string,
    @Body() exercise: updateExerciseDto,
  ): Promise<Exercise> {
    return this.ExerciseService.update(id, exercise);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string) {
    return this.ExerciseService.delete(id);
  }
}
