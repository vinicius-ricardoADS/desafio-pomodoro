import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pomodoro } from 'src/entities/pomodoro.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PomodorosService {
  constructor(
    @InjectRepository(Pomodoro)
    private readonly pomodoroRepository: Repository<Pomodoro>,
  ) {}

  async create(pomodoro: Pomodoro): Promise<Pomodoro> {
    try {
      return await this.pomodoroRepository.save(pomodoro);
    } catch (error) {
      console.error('Failed to create Pomodoro:', error.message);
      throw new InternalServerErrorException('Failed to create Pomodoro');
    }
  }

  async findAll(): Promise<Pomodoro[]> {
    try {
      return await this.pomodoroRepository.find();
    } catch (error) {
      console.error('Failed to retrieve Pomodoros:', error.message);
      throw new InternalServerErrorException('Failed to retrieve Pomodoros');
    }
  }

  async findOne(id: string): Promise<Pomodoro | null> {
    try {
      const pomodoro = await this.pomodoroRepository.findOneBy({ id });
      if (!pomodoro) {
        throw new NotFoundException(`Pomodoro with id ${id} not found`);
      }
      return pomodoro;
    } catch (error) {
      console.error('Failed to retrieve Pomodoro:', error.message);
      throw new InternalServerErrorException('Failed to retrieve Pomodoro');
    }
  }

  async update(id: string, pomodoro: Pomodoro): Promise<UpdateResult> {
    try {
      const updateResult = await this.pomodoroRepository.update(id, pomodoro);
      if (updateResult.affected === 0) {
        throw new NotFoundException(`Pomodoro with id ${id} not found`);
      }
      return updateResult;
    } catch (error) {
      console.error('Failed to update Pomodoro:', error.message);
      throw new InternalServerErrorException('Failed to update Pomodoro');
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const deleteResult = await this.pomodoroRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Pomodoro with id ${id} not found`);
      }
      return deleteResult;
    } catch (error) {
      console.error('Failed to delete Pomodoro:', error.message);
      throw new InternalServerErrorException('Failed to delete Pomodoro');
    }
  }
}
