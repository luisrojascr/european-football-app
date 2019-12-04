import { NgModule } from '@angular/core';
import { FavoritesRoutingModule, routedComponents } from './favorites-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../state/competition.reducer';

@NgModule({
  imports: [SharedModule, FavoritesRoutingModule, StoreModule.forFeature('competitions', reducer)],
  declarations: [routedComponents]
})
export class FavoritesModule {}
