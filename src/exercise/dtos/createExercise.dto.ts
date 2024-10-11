import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Category, muscleGroup } from '../schemas/exercise.schema';

export class creatExerciseDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsEnum(Category, { message: 'please enter a correct category' })
  @IsNotEmpty()
  readonly category: Category;

  @IsEnum(muscleGroup, { message: 'please enter a correct muscle group' })
  @IsOptional()
  readonly muscle_group: muscleGroup;
}
