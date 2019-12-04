export class CurrentSeason {
  public currentMatchday: number;
  public endDate: Date;
  public id: number;
  public startDate: Date;
  public winner: string;

  constructor(currentSeason: Partial<CurrentSeason> = {}) {
    Object.assign(this, currentSeason);
  }
}
