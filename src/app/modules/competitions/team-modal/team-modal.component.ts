import { Component, OnInit, Input } from '@angular/core';
import { CompetitionsService } from 'src/app/core/services/competitions/competitions.service';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    public activeModal: NgbActiveModal,
    private readonly competitionsService: CompetitionsService,
    private readonly store: Store<any>
  ) {}

  ngOnInit() {
    this.getCompetitionTeams();
    this.getTeam();
  }

  public async getCompetitionTeams(): Promise<void> {
    try {
      const response = await this.competitionsService
        .getCompetitionTeams(this.competitionId)
        .toPromise();

      // console.log('teamList response: ', response);
      this.team = response.teams.filter((team) => team.id === this.teamId)[0];
      // console.log('my team: ', this.team);
    } catch (error) {
      // this.toastrService.danger(error);
      console.log('error: ', error);
    }
  }

  public async getTeam(): Promise<void> {
    try {
      const response = await this.competitionsService.getTeam(this.teamId).toPromise();

      // console.log('teamPlayers response: ', response);
      this.teamPlayers = response.squad;
    } catch (error) {
      // this.toastrService.danger(error);
      console.log('error: ', error);
    }
  }

  public saveAsFavorite(teamId: any): void {
    this.saveFavorite = !this.saveFavorite;
    this.removeFavorite = !this.removeFavorite;

    const favoritePayload = [
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
}
