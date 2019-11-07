import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import {MatButtonModule, MatCardModule, MatRippleModule} from "@angular/material";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    MatRippleModule
  ]
})
export class MenuModule { }
