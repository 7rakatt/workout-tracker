import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProfileModule } from './profile/profile.module';
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutPlanModule } from './workoutPlan/workoutPlan.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    ProfileModule,
    ExerciseModule,
    WorkoutPlanModule
  ],
})
export class AppModule {}
