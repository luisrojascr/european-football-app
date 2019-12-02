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
    try {
      const response = await this.competitionsService.getCompetitions().toPromise();

      this.competitions = response.competitions;
    } catch (error) {
      // this.toastrService.danger(error);
      console.log('error: ', error);
    }
  }
}
