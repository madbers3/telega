import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class UsersModule { }
