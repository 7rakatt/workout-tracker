import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';

export class creatWorkoutPlanDto {
  @IsEmpty({ message: 'you cannot pass the user id' })
  readonly user: User;
  @IsArray()
  @IsNotEmpty()
  readonly exercises: string[];
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
  @IsNotEmpty()
  @IsNumber()
  readonly reps: number;
  @IsNotEmpty()
  @IsNumber()
  readonly sets: number;
  @IsString()
  @IsNotEmpty()
  readonly date: string;
  @IsString()
  @IsNotEmpty()
  readonly time: string;
}
