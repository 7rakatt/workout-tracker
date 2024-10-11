import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class creatProfileDto {
  @IsEmpty({ message: 'you cannot pass the user id' })
  readonly user: User;
  @IsNumber()
  @IsNotEmpty()
  readonly age: number;
  @IsNumber()
  @IsNotEmpty()
  readonly weight: number;
  @IsString()
  @IsNotEmpty()
  readonly fitnessGoals: string;
}
