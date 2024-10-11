import { Module } from '@nestjs/common';
import { WorkoutPlanService } from './workoutPlan.service';
import { WorkoutPlanController } from './workoutPlan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { workoutPlanSchema } from './schemas/workoutPlan.schema';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'WorkoutPlan', schema: workoutPlanSchema },
    ]),
  ],
  controllers: [WorkoutPlanController],
  providers: [
    WorkoutPlanService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class WorkoutPlanModule {}
