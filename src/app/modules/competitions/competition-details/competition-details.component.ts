import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from 'src/app/core/services/competitions/competitions.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamModalComponent } from '../team-modal/team-modal.component';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.scss']
})
export class CompetitionDetailsComponent implements OnInit {
  public competitionsDetails: any;
  public competitionStandingsTotal: any;
  public competitionStandingsHome: any;
  public competitionStandingsAway: any;
  public competitionId: number;

  constructor(
    private readonly competitionsService: CompetitionsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.competitionId = this.activatedRoute.snapshot.params.competitionId;

    this.getCompetitions();
    this.getCompetitionStandings();
  }

  public async getCompetitions(): Promise<void> {
    try {
      const response = await this.competitionsService
        .getCompetitions(this.competitionId)
        .toPromise();

      this.competitionsDetails = response;
    } catch (error) {
      // this.toastrService.danger(error);
      console.log('error: ', error);
    }
  }

  public async getCompetitionStandings(): Promise<void> {
    try {
      const response = await this.competitionsService
        .getCompetitionStandings(this.competitionId)
        .toPromise();

      // console.log('standings response: ', response.standings[0].table);
      this.competitionStandingsTotal = response.standings[0].table;
      this.competitionStandingsHome = response.standings[1].table;
      this.competitionStandingsAway = response.standings[2].table;
    } catch (error) {
      // this.toastrService.danger(error);
      console.log('error: ', error);
    }
  }

  public openTeamModal(id: number): void {
    const modalRef = this.modalService.open(TeamModalComponent);
    modalRef.componentInstance.teamId = id;
    modalRef.componentInstance.competitionId = this.competitionId;
  }
}
