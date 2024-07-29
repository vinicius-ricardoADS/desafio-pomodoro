import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePomodoroDto {
  @IsNotEmpty({ message: 'A descrição não pode ser vazio' })
  description: string;

  @IsNotEmpty()
  numberOfPomodoros: string;

  @IsNumber()
  pomodoroTime = 25;

  @IsNumber()
  pomodoroBreak = 5;
}
