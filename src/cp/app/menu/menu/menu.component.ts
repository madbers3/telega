import { Component, OnInit } from '@angular/core';
import {faComments, faServer, faSlidersH, faUsers} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  icons = {
    users: faUsers,
    comments: faComments,
    sliders: faSlidersH,
    server: faServer
  };

  constructor() { }

  ngOnInit() {
  }

}
