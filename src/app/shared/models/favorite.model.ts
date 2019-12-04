export class Favorite {
  public competitionDetails: string;
  public crest: string;
  public id: number;
  public name: string;

  constructor(favorite: Partial<Favorite> = {}) {
    Object.assign(this, favorite);
  }
}
