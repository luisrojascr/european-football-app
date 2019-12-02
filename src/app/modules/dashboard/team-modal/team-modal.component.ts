import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompetitionsService } from 'src/app/core/services/competitions/competitions.service';

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

  constructor(
    public activeModal: NgbActiveModal,
    private readonly competitionsService: CompetitionsService
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

      console.log('teamList response: ', response);
      this.team = response.teams.filter((team) => team.id === this.teamId)[0];
      console.log('my team: ', this.team);
    } catch (error) {
      // this.toastrService.danger(error);
      console.log('error: ', error);
    }
  }

  public async getTeam(): Promise<void> {
    try {
      const response = await this.competitionsService.getTeam(this.teamId).toPromise();

      console.log('teamPlayers response: ', response);
      this.teamPlayers = response.squad;
    } catch (error) {
      // this.toastrService.danger(error);
      console.log('error: ', error);
    }
  }
}
