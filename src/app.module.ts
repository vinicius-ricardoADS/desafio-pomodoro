import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PomodorosModule } from './controllers/pomodoros.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pomodoro } from './entities/pomodoro.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'pomodoro',
      entities: [Pomodoro],
      synchronize: true,
    }),
    PomodorosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
