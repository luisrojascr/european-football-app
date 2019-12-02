import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    HeaderComponent,
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [],
})
export class CoreModule { }
