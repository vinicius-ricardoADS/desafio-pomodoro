import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePomodoroDto {
  @IsNotEmpty({ message: 'A descrição não pode ser vazio' })
  description: string;

  @IsNotEmpty()
  numberOfPomodoros: string;

  @IsNumber()
  pomodoroTime: number;

  @IsNumber()
  pomodoroBreak: number;

  @IsBoolean()
  isStarted?: boolean; // Opcional

  @IsBoolean()
  isFinished?: boolean; // Opcional

  @IsString()
  timeSpent?: string; // Opcional
}
