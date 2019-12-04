import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from 'src/app/core/services/competitions/competitions.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamModalComponent } from '../team-modal/team-modal.component';
import { Competition } from 'src/app/shared/models/competitions.model';
import { StandingTable } from 'src/app/shared/models/standing-table.model';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.scss']
})
export class CompetitionDetailsComponent implements OnInit {
  public competitionsDetails: Competition;
  public competitionStandingsTotal: StandingTable[];
  private competitionId: number;

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

  private async getCompetitions(): Promise<void> {
    try {
      const response = await this.competitionsService
        .getCompetitions(this.competitionId)
        .toPromise();

      this.competitionsDetails = response;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  private async getCompetitionStandings(): Promise<void> {
    try {
      const response = await this.competitionsService
        .getCompetitionStandings(this.competitionId)
        .toPromise();

      this.competitionStandingsTotal = response.standings[0].table;
    } catch (error) {
      this.competitionStandingsTotal = [];
      console.log('error: ', error);
    }
  }

  /** Open modal in the template */
  public openTeamModal(id: number): void {
    const modalRef = this.modalService.open(TeamModalComponent);
    modalRef.componentInstance.teamId = id;
    modalRef.componentInstance.competitionId = this.competitionId;
  }
}
