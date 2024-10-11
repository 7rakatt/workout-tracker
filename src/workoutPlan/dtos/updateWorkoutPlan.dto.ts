import { PartialType } from '@nestjs/mapped-types';
import { creatWorkoutPlanDto } from './createWorkoutPlan.dto';

export class updateWorkoutPlanDto extends PartialType(creatWorkoutPlanDto) {}
