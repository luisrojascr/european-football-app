import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CompetitionsService } from 'src/app/core/services/competitions/competitions.service';
import { Favorite } from 'src/app/shared/models/favorite.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Favorite[];
  storeSub: Subscription;
  competitionDetailsId: number;

  constructor(
    private store: Store<any>,
    private readonly competitionsService: CompetitionsService
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.pipe(select('competitions')).subscribe((teams) => {
      if (teams) {
        this.favorites = teams.favorites;
        this.favorites.forEach((element) => {
          this.getCompetitions(element.id);
        });
      }
    });
  }

  private async getCompetitions(param: number): Promise<void> {
    try {
      const response = await this.competitionsService.getTeamMatches(param).toPromise();

      this.competitionDetailsId = response.matches[0].competition.id;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
