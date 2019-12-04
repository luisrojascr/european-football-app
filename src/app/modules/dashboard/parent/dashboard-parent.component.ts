import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dashboard-parent',
  template: `
    <router-outlet></router-outlet>
  `
})
export class DashboardParentComponent {
  @HostBinding('id')
  public readonly componentId = 'DashboardParent';
}
