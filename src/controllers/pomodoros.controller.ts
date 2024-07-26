import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PomodorosService } from './pomodoros.service';
import { CreatePomodoroDto } from '../dto/create-pomodoro.dto';
import { UpdatePomodoroDto } from '../dto/update-pomodoro.dto';
import { Pomodoro } from 'src/entities/pomodoro.entity';
import { v4 as uuid } from 'uuid';

@Controller('pomodoros')
export class PomodorosController {
  constructor(private readonly pomodorosService: PomodorosService) {}

  @Post()
  create(@Body() createPomodoroDto: CreatePomodoroDto) {
    const pomodoroEntity = new Pomodoro();
    pomodoroEntity.description = createPomodoroDto.description;
    pomodoroEntity.numberOfPomodoros = +createPomodoroDto.numberOfPomodoros;
    pomodoroEntity.pomodoroTime = createPomodoroDto.pomodoroTime;
    pomodoroEntity.pomodoroBreak = createPomodoroDto.pomodoroBreak;
    pomodoroEntity.id = uuid();
    return this.pomodorosService.create(pomodoroEntity);
  }

  @Get()
  findAll() {
    return this.pomodorosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pomodorosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePomodoroDto: UpdatePomodoroDto,
  ) {
    const pomodoroEntity = new Pomodoro();
    pomodoroEntity.description = updatePomodoroDto.description;
    pomodoroEntity.numberOfPomodoros = +updatePomodoroDto.numberOfPomodoros;
    pomodoroEntity.pomodoroTime = updatePomodoroDto.pomodoroTime;
    pomodoroEntity.pomodoroBreak = updatePomodoroDto.pomodoroBreak;
    return this.pomodorosService.update(id, pomodoroEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pomodorosService.remove(id);
  }
}
