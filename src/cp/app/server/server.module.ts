import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule } from './server-routing.module';
import { ServerComponent } from './server/server.component';
import {MatButtonModule, MatCardModule, MatInputModule} from "@angular/material";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgScrollbarModule} from "ngx-scrollbar";


@NgModule({
  declarations: [ServerComponent],
  imports: [
    CommonModule,
    ServerRoutingModule,
    MatCardModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    NgScrollbarModule
  ]
})
export class ServerModule { }
