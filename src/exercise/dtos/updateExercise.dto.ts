import { PartialType } from '@nestjs/mapped-types';
import { creatExerciseDto } from './createExercise.dto';

export class updateExerciseDto extends PartialType(creatExerciseDto) {}
