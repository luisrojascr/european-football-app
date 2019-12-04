export class Team {
  public address: string;
  public area: {
    id: number;
    name: string;
  };
  public clubColors: string;
  public crestUrl: string;
  public email: string;
  public founded: number;
  public id: number;
  public lastUpdated: Date;
  public name: string;
  public phone: number;
  public shortName: string;
  public tla: string;
  public venue: string;
  public website: string;

  constructor(team: Partial<Team> = {}) {
    Object.assign(this, team);
  }
}
