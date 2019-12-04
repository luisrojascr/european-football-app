export class StandingTable {
  public draw: number;
  public goalDifference: number;
  public goalsAgainst: number;
  public goalsFor: number;
  public lost: number;
  public playedGames: number;
  public points: number;
  public position: number;
  public team: {
    crestUrl: '';
    id: number;
    name: string;
  };
  public won: number;

  constructor(standingTable: Partial<StandingTable> = {}) {
    Object.assign(this, standingTable);
  }
}
