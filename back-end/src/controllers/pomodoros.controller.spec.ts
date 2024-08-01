import { Test, TestingModule } from '@nestjs/testing';
import { PomodorosController } from './pomodoros.controller';
import { PomodorosService } from './pomodoros.service';
import { CreatePomodoroDto } from '../dto/create-pomodoro.dto';
import { UpdatePomodoroDto } from '../dto/update-pomodoro.dto';

describe('PomodorosController', () => {
  let controller: PomodorosController;
  let service: PomodorosService;

  const mockPomodorosService = {
    create: jest.fn((dto) => ({
      id: 'uuid',
      ...dto,
    })),
    findAll: jest.fn(() => [
      {
        id: 'uuid',
        description: 'Test task',
        numberOfPomodoros: 4,
        pomodoroTime: 25,
        pomodoroBreak: 5,
        isStarted: false,
        isFinished: false,
        timeSpent: '',
      },
    ]),
    findOne: jest.fn((id: string) => ({
      id,
      description: 'Test task',
      numberOfPomodoros: 4,
      pomodoroTime: 25,
      pomodoroBreak: 5,
      isStarted: false,
      isFinished: false,
      timeSpent: '',
    })),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PomodorosController],
      providers: [
        {
          provide: PomodorosService,
          useValue: mockPomodorosService,
        },
      ],
    }).compile();

    controller = module.get<PomodorosController>(PomodorosController);
    service = module.get<PomodorosService>(PomodorosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a pomodoro', async () => {
    const dto: CreatePomodoroDto = {
      description: 'Test task',
      numberOfPomodoros: '4',
      pomodoroTime: 25,
      pomodoroBreak: 5,
      isStarted: false,
      isFinished: false,
      timeSpent: '',
    };

    expect(await controller.create(dto)).toEqual({
      id: expect.any(String),
      description: dto.description,
      pomodoroTime: dto.pomodoroTime,
      pomodoroBreak: dto.pomodoroBreak,
      isStarted: dto.isStarted,
      isFinished: dto.isFinished,
      timeSpent: dto.timeSpent,
      numberOfPomodoros: +dto.numberOfPomodoros,
    });

    expect(service.create).toHaveBeenCalledWith({
      id: expect.any(String),
      description: dto.description,
      pomodoroTime: dto.pomodoroTime,
      pomodoroBreak: dto.pomodoroBreak,
      isStarted: dto.isStarted,
      isFinished: dto.isFinished,
      timeSpent: dto.timeSpent,
      numberOfPomodoros: +dto.numberOfPomodoros,
    });
  });

  it('should return an array of pomodoros', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: expect.any(String),
        description: 'Test task',
        numberOfPomodoros: 4,
        pomodoroTime: 25,
        pomodoroBreak: 5,
        isStarted: false,
        isFinished: false,
        timeSpent: '',
      },
    ]);
  });

  it('should return a single pomodoro', async () => {
    const id = 'uuid';
    expect(await controller.findOne(id)).toEqual({
      id,
      description: 'Test task',
      numberOfPomodoros: 4,
      pomodoroTime: 25,
      pomodoroBreak: 5,
      isStarted: false,
      isFinished: false,
      timeSpent: '',
    });

    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a pomodoro', async () => {
    const id = 'uuid';
    const dto: UpdatePomodoroDto = {
      description: 'Updated task',
      numberOfPomodoros: '5',
      pomodoroTime: 30,
      pomodoroBreak: 10,
      isStarted: true,
      isFinished: true,
      timeSpent: '25:00',
    };
    mockPomodorosService.update.mockReturnValue({
      affected: 1,
    });

    expect(await controller.update(id, dto)).toEqual({
      id,
      description: dto.description,
      pomodoroTime: dto.pomodoroTime,
      pomodoroBreak: dto.pomodoroBreak,
      isStarted: dto.isStarted,
      isFinished: dto.isFinished,
      timeSpent: dto.timeSpent,
      numberOfPomodoros: +dto.numberOfPomodoros,
    });

    expect(service.update).toHaveBeenCalledWith(id, {
      description: dto.description,
      pomodoroTime: dto.pomodoroTime,
      pomodoroBreak: dto.pomodoroBreak,
      isStarted: dto.isStarted,
      isFinished: dto.isFinished,
      timeSpent: dto.timeSpent,
      numberOfPomodoros: +dto.numberOfPomodoros,
    });
  });

  it('should delete a pomodoro', async () => {
    const id = 'uuid';
    mockPomodorosService.remove.mockReturnValue({
      affected: 1,
    });
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
