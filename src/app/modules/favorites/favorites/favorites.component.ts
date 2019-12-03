import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: any = [];
  storeSub: Subscription;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.storeSub = this.store.pipe(select('competitions')).subscribe((competitions) => {
      if (competitions) {
        console.log('competitions.savedCompetition: ', competitions.savedCompetition);
        this.favorites = competitions.savedCompetition;
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
