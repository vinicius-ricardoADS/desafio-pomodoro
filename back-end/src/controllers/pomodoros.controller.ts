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

  @Post()
  async create(
    @Body() createPomodoroDto: CreatePomodoroDto,
  ): Promise<Pomodoro> {
    try {
      const pomodoroEntity = this.mapCreateDtoToEntity(createPomodoroDto);
      const pomodoro = await this.pomodorosService.create(pomodoroEntity);
      return pomodoro;
    } catch (error) {
      console.error('Error creating pomodoro:', error.message);
      throw new InternalServerErrorException('Error creating pomodoro');
    }
  }

  @Get()
  async findAll(): Promise<ListPomodoroDto[]> {
    try {
      const pomodoros = await this.pomodorosService.findAll();
      return pomodoros.map((pomodoro) => this.mapEntityToListDto(pomodoro));
    } catch (error) {
      console.error('Error retrieving pomodoros:', error.message);
      throw new InternalServerErrorException('Error retrieving pomodoros');
    }
  }

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

      const updatedPomodoro = await this.pomodorosService.findOne(id);
      return updatedPomodoro;
    } catch (error) {
      console.error('Error updating pomodoro:', error.message);
      throw new InternalServerErrorException('Error updating pomodoro');
    }
  }

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

  private mapCreateDtoToEntity(dto: CreatePomodoroDto): Pomodoro {
    const pomodoro = new Pomodoro();
    pomodoro.id = uuid();
    pomodoro.description = dto.description;
    pomodoro.numberOfPomodoros = Number(dto.numberOfPomodoros);
    pomodoro.pomodoroTime = dto.pomodoroTime;
    pomodoro.pomodoroBreak = dto.pomodoroBreak;
    return pomodoro;
  }

  private mapUpdateDtoToEntity(dto: UpdatePomodoroDto): Pomodoro {
    const pomodoro = new Pomodoro();
    pomodoro.description = dto.description;
    pomodoro.numberOfPomodoros = Number(dto.numberOfPomodoros);
    if (dto.pomodoroTime !== undefined) {
      pomodoro.pomodoroTime = dto.pomodoroTime;
    }
    if (dto.pomodoroBreak !== undefined) {
      pomodoro.pomodoroBreak = dto.pomodoroBreak;
    }
    return pomodoro;
  }

  private mapEntityToListDto(entity: Pomodoro): ListPomodoroDto {
    return new ListPomodoroDto(
      entity.id,
      entity.description,
      entity.numberOfPomodoros,
    );
  }
}
