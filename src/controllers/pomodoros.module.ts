import { Module } from '@nestjs/common';
import { PomodorosService } from './pomodoros.service';
import { PomodorosController } from './pomodoros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pomodoro } from 'src/entities/pomodoro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pomodoro])],
  controllers: [PomodorosController],
  providers: [PomodorosService],
  exports: [TypeOrmModule],
})
export class PomodorosModule {}
