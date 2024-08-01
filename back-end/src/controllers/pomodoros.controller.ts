import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PomodorosService } from './pomodoros.service';
import { CreatePomodoroDto } from '../dto/create-pomodoro.dto';
import { UpdatePomodoroDto } from '../dto/update-pomodoro.dto';
import { Pomodoro } from 'src/entities/pomodoro.entity';
import { v4 as uuid } from 'uuid';
import { ListPomodoroDto } from 'src/dto/list-pomodoro.dto';

@Controller('pomodoros')
export class PomodorosController {
  constructor(private readonly pomodorosService: PomodorosService) {}

  // Handler for creating a new pomodoro
  @Post()
  async create(
    @Body() createPomodoroDto: CreatePomodoroDto,
  ): Promise<Pomodoro> {
    try {
      const pomodoroEntity = this.mapCreateDtoToEntity(createPomodoroDto);
      return await this.pomodorosService.create(pomodoroEntity);
    } catch (error) {
      console.error('Error creating pomodoro:', error.message);
      throw new InternalServerErrorException('Error creating pomodoro');
    }
  }

  // Handler for retrieving all pomodoros
  @Get()
  async findAll(): Promise<ListPomodoroDto[]> {
    try {
      const pomodoros = await this.pomodorosService.findAll();
      return pomodoros.map(this.mapEntityToListDto);
    } catch (error) {
      console.error('Error retrieving pomodoros:', error.message);
      throw new InternalServerErrorException('Error retrieving pomodoros');
    }
  }

  // Handler for retrieving a single pomodoro by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pomodoro> {
    try {
      const pomodoro = await this.pomodorosService.findOne(id);
      if (!pomodoro) {
        throw new NotFoundException(`Pomodoro with id ${id} not found`);
      }
      return pomodoro;
    } catch (error) {
      console.error('Error retrieving pomodoro:', error.message);
      throw new InternalServerErrorException('Error retrieving pomodoro');
    }
  }

  // Handler for updating an existing pomodoro
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePomodoroDto: UpdatePomodoroDto,
  ): Promise<Pomodoro> {
    try {
      const pomodoroEntity = this.mapUpdateDtoToEntity(updatePomodoroDto);
      const updateResult = await this.pomodorosService.update(
        id,
        pomodoroEntity,
      );

      if (updateResult.affected === 0) {
        throw new NotFoundException(`Pomodoro with id ${id} not found`);
      }

      return await this.pomodorosService.findOne(id);
    } catch (error) {
      console.error('Error updating pomodoro:', error.message);
      throw new InternalServerErrorException('Error updating pomodoro');
    }
  }

  // Handler for deleting a pomodoro by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      const deleteResult = await this.pomodorosService.remove(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Pomodoro with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting pomodoro:', error.message);
      throw new InternalServerErrorException('Error deleting pomodoro');
    }
  }

  // Maps the CreatePomodoroDto to a Pomodoro entity
  private mapCreateDtoToEntity(dto: CreatePomodoroDto): Pomodoro {
    return {
      id: uuid(),
      description: dto.description,
      numberOfPomodoros: Number(dto.numberOfPomodoros),
      pomodoroTime: dto.pomodoroTime,
      pomodoroBreak: dto.pomodoroBreak,
      isStarted: dto.isStarted,
      isFinished: dto.isFinished,
      timeSpent: dto.timeSpent,
    } as Pomodoro;
  }

  // Maps the UpdatePomodoroDto to a Pomodoro entity
  private mapUpdateDtoToEntity(dto: UpdatePomodoroDto): Pomodoro {
    const pomodoro = new Pomodoro();
    if (dto.pomodoroTime !== undefined)
      pomodoro.pomodoroTime = dto.pomodoroTime;
    if (dto.pomodoroBreak !== undefined)
      pomodoro.pomodoroBreak = dto.pomodoroBreak;
    if (dto.description !== undefined) pomodoro.description = dto.description;
    if (dto.numberOfPomodoros !== undefined)
      pomodoro.numberOfPomodoros = Number(dto.numberOfPomodoros);
    if (dto.isStarted !== undefined) pomodoro.isStarted = dto.isStarted;
    if (dto.isFinished !== undefined) pomodoro.isFinished = dto.isFinished;
    if (dto.timeSpent !== undefined || dto.timeSpent === '')
      pomodoro.timeSpent = dto.timeSpent;
    return pomodoro;
  }

  // Maps a Pomodoro entity to a ListPomodoroDto
  private mapEntityToListDto(entity: Pomodoro): ListPomodoroDto {
    return {
      id: entity.id,
      description: entity.description,
      numberOfPomodoros: entity.numberOfPomodoros,
      isStarted: entity.isStarted,
      isFinished: entity.isFinished,
      timeSpent: entity.timeSpent,
    };
  }
}
