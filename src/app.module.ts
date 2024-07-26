import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PomodorosModule } from './controllers/pomodoros.module';

@Module({
  imports: [PomodorosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
