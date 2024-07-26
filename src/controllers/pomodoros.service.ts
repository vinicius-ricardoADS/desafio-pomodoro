import { Injectable } from '@nestjs/common';
import { Pomodoro } from 'src/entities/pomodoro.entity';

@Injectable()
export class PomodorosService {
  create(pomodoro: Pomodoro) {
    return `This action adds a new pomodoro ${pomodoro.description}`;
  }

  findAll() {
    return `This action returns all pomodoros`;
  }

  findOne(id: string) {
    return `This action returns a #${id} pomodoro`;
  }

  update(id: string, pomodoro: Pomodoro) {
    return `This action updates a #${id} pomodoro ${pomodoro}`;
  }

  remove(id: string) {
    return `This action removes a #${id} pomodoro`;
  }
}
