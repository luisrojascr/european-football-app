export class Favorite {
  public id: number;
  public name: string;
  public crest: string;
  public competitionDetails: string;

  constructor(address: Partial<Favorite> = {}) {
    Object.assign(this, address);
  }
}
