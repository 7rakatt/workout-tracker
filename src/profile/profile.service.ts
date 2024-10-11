import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { updateProfileDto } from './dtos/updateProfile.dto';
import { Profile } from './schemas/profile.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: mongoose.Model<Profile>,
  ) {}

  async findAll(query: Query): Promise<Profile[]> {
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
    const profiles = await this.profileModel
      .find({ ...keyword })
      .limit(limit)
      .skip(skip);
    return profiles;
  }

  async creat(profile: Profile, user: User): Promise<Profile> {
    const data = Object.assign({ user: user._id },profile);
    const res = await this.profileModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Profile> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('not valid id');
    }
    const profile = await this.profileModel.findById(id);
    if (!profile) {
      throw new NotFoundException('profile is not found');
    }
    return profile;
  }

  async update(id: string, profile: updateProfileDto): Promise<Profile> {
    const updatedprofile = await this.profileModel.findByIdAndUpdate(
      id,
      profile,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!profile) {
      throw new NotFoundException('profile is not found');
    }
    return updatedprofile;
  }

  async delete(id: string): Promise<Profile> {
    return await this.profileModel.findByIdAndDelete(id);
  }
}
