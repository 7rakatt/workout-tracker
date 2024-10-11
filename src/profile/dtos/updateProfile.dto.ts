import { PartialType } from '@nestjs/mapped-types';
import { creatProfileDto } from './createProfile.dto';

export class updateProfileDto extends PartialType(creatProfileDto) {}
