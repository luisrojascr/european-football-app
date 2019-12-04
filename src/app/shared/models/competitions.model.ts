import { CurrentSeason } from './current-season.model';

export class Competition {
  public area: {
    id: number;
    name: string;
  };
  public code?: string;
  public currentSeason: CurrentSeason;
  public emblemUrl?: string;
  public id: number;
  public lastUpdated: string;
  public name: string;
  public numberOfAvailableSeasons: number;
  public plan: string;

  constructor(competition: Partial<Competition> = {}) {
    Object.assign(this, competition);
  }
}
