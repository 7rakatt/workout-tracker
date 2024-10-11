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
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';
import { creatProfileDto } from './dtos/createProfile.dto';
import { updateProfileDto } from './dtos/updateProfile.dto';
import { Query as expressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private ProfileService: ProfileService) {}

  @Get()
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard(), RolesGuard)
  async findAll(@Query() query: expressQuery): Promise<Profile[]> {
    return this.ProfileService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async creatProfile(
    @Body() profile: creatProfileDto,
    @Req() req,
  ): Promise<Profile> {
    return this.ProfileService.creat(profile, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<Profile> {
    return this.ProfileService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateOne(
    @Param('id') id: string,
    @Body() profile: updateProfileDto,
  ): Promise<Profile> {
    return this.ProfileService.update(id, profile);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string) {
    return this.ProfileService.delete(id);
  }
}
