export class ListPomodoroDto {
  constructor(
    readonly id: string,
    readonly description: string,
    readonly numberOfPomodoros: number,
  ) {}
}
