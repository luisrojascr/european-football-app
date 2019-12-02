import { NgModule } from '@angular/core';
import { FavoritesRoutingModule, routedComponents } from './favorites-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule, FavoritesRoutingModule],
  declarations: [routedComponents],
})
export class FavoritesModule { }
