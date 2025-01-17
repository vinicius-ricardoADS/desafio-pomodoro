import { Column, Entity } from 'typeorm';

@Entity()
export class Pomodoro {
  @Column({ primary: true })
  id: string;

  @Column()
  description: string;

  @Column()
  numberOfPomodoros: number;

  @Column({ default: 25 })
  pomodoroTime: number;

  @Column({ default: 5 })
  pomodoroBreak: number;

  @Column({ default: false })
  isStarted: boolean;

  @Column({ default: false })
  isFinished: boolean;

  @Column({ default: '' })
  timeSpent: string;
}
