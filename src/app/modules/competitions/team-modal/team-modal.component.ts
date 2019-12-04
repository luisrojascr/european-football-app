import { Component, OnInit, Input } from '@angular/core';
import { CompetitionsService } from 'src/app/core/services/competitions/competitions.service';
import { Store, select } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Favorite } from '../../../shared/models/favorite.model';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {
  public team: any;
  public teamPlayers: any;
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
        teams.savedTeam.forEach((savedTeam) => this.savedTeamsIds.push(savedTeam.id));
      }
    });
  }

  public async getCompetitionTeams(): Promise<void> {
    try {
      const response = await this.competitionsService
        .getCompetitionTeams(this.competitionId)
        .toPromise();

      this.team = response.teams.filter((team) => team.id === this.teamId)[0];
    } catch (error) {
      console.log('error: ', error);
    }
  }

  public async getTeam(): Promise<void> {
    try {
      const response = await this.competitionsService.getTeam(this.teamId).toPromise();

      this.teamPlayers = response.squad;
    } catch (error) {
      console.log('error: ', error);
    }
  }

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

  public saveAsFavorite(teamId: number): void {
    this.saveFavorite = !this.saveFavorite;
    this.removeFavorite = !this.removeFavorite;

    const favoritePayload: Favorite[] = [
      {
        id: teamId,
        name: this.team.name,
        crest: this.team.crestUrl,
        competitionDetails: this.team.website
      }
    ];

    this.store.dispatch({
      type: 'SAVE_AS_FAVORITE',
      payload: favoritePayload
    });
  }

  public removeAsFavorite(teamId: any): void {
    this.saveFavorite = !this.saveFavorite;
    this.removeFavorite = !this.removeFavorite;

    this.store.dispatch({
      type: 'REMOVE_FROM_FAVORITE',
      payload: teamId
    });
  }
}
