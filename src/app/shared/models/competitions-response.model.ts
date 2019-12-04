import { Competition } from './competitions.model';

export class CompetitionResponse {
  public competitions: Competition[];
  public count: number;
  public filter: any;

  constructor(competitionResponse: Partial<CompetitionResponse> = {}) {
    Object.assign(this, competitionResponse);
  }
}
