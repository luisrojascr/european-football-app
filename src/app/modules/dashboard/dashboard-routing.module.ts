import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardParentComponent } from './parent/dashboard-parent.component';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';

export const routedComponents = [DashboardComponent];

const routes: Routes = [
  {
    path: '',
    component: DashboardParentComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'details/:competitionId', component: CompetitionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule {}
