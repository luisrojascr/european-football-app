import { NgModule } from '@angular/core';
import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';
import { DashboardParentComponent } from './parent/dashboard-parent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamModalComponent } from './team-modal/team-modal.component';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [
    routedComponents,
    DashboardParentComponent,
    DashboardComponent,
    CompetitionDetailsComponent,
    TeamModalComponent
  ],
  entryComponents: [TeamModalComponent]
})
export class DashboardModule {}
