import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgbModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, NgbModule],
  declarations: []
})
export class SharedModule {}
