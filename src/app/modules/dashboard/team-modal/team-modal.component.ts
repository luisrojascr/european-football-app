import { Component, OnInit, Input } from '@angular/core';
import { CompetitionsService } from 'src/app/core/services/competitions/competitions.service';
import { Store, select } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Favorite } from '../../../shared/models/favorite.model';
import { TeamPlayer } from 'src/app/shared/models/team-players.model';
import { Team } from 'src/app/shared/models/team.model';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {
  public team: Team[];
  public teamPlayers: TeamPlayer[];
  @Input()
  public teamId: number;
  public competitionId: number;
  public saveFavorite = true;
  public removeFavorite = false;
  public savedTeamsIds = [];
  private storeSub: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private readonly competitionsService: CompetitionsService,
    private readonly store: Store<any>
  ) {}

  ngOnInit() {
    this.getCompetitionTeams();
    this.getTeam();

    this.storeSub = this.store.pipe(select('competitions')).subscribe((teams) => {
      if (teams) {
        teams.favorites.forEach((favorite) => this.savedTeamsIds.push(favorite.id));
      }
    });
  }

  private async getCompetitionTeams(): Promise<void> {
    try {
      const response = await this.competitionsService
        .getCompetitionTeams(this.competitionId)
        .toPromise();

      this.team = response.teams.filter((team) => team.id === this.teamId)[0];
    } catch (error) {
      console.log('error: ', error);
    }
  }

  private async getTeam(): Promise<void> {
    try {
      const response = await this.competitionsService.getTeam(this.teamId).toPromise();

      this.teamPlayers = response.squad;
    } catch (error) {
      this.teamPlayers = [];
      console.log('error: ', error);
    }
  }

  /** Get age number from date value */
  public getAge(dateString: Date): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  /** Save a team as favorite in the store */
  public saveAsFavorite(teamId: number): void {
    this.saveFavorite = !this.saveFavorite;
    this.removeFavorite = !this.removeFavorite;

    const favoritePayload: Favorite[] = [
      {
        id: teamId,
        // tslint:disable-next-line:no-string-literal
        name: this.team['name'],
        // tslint:disable-next-line:no-string-literal
        crest: this.team['crestUrl'],
        // tslint:disable-next-line:no-string-literal
        competitionDetails: this.team['website']
      }
    ];

    this.store.dispatch({
      type: 'SAVE_AS_FAVORITE',
      payload: favoritePayload
    });
  }

  /** Remove team from favorites in the store */
  public removeAsFavorite(teamId: any): void {
    this.saveFavorite = !this.saveFavorite;
    this.removeFavorite = !this.removeFavorite;

    this.store.dispatch({
      type: 'REMOVE_FROM_FAVORITE',
      payload: teamId
    });
  }
}
