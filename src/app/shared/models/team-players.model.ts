export class TeamPlayer {
  public countryOfBirth: string;
  public dateOfBirth: string;
  public id: string;
  public name: string;
  public nationality: number;
  public position: number;
  public role: Date;
  public shirtNumber: string;

  constructor(teamPlayer: Partial<TeamPlayer> = {}) {
    Object.assign(this, teamPlayer);
  }
}
