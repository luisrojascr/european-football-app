import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from 'src/app/core/services/competitions/competitions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public competitions: any;

  constructor(private readonly competitionsService: CompetitionsService) {}

  ngOnInit() {
    this.getCompetitions();
  }

  public async getCompetitions(): Promise<void> {
    const availableCompetitionsIds = [
      2013,
      2016,
      2021,
      2001,
      2018,
      2015,
      2002,
      2019,
      2003,
      2017,
      2014,
      2000
    ];

    try {
      const response = await this.competitionsService.getCompetitions().toPromise();

      // TODO: add reduce method
      availableCompetitionsIds.forEach((availableCompetitionId) => {
        this.competitions = response.competitions.filter((competition) => {
          return competition.id === availableCompetitionId;
        });
      });
    } catch (error) {
      // this.toastrService.danger(error);
      console.log('error: ', error);
    }
  }
}
