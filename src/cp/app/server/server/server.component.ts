import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {faComments, faMemory, faMicrochip, faServer, faSlidersH, faUsers} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  icons = {
    memory: faMemory,
    cpu: faMicrochip
  };

  restartServerLoad: boolean = false;

  messages = [
    {
      timestamp: new Date().getTime(),
      text: 'Alice is start'
    },
  ];

  constructor(public serverService: ServerService) { }

  ngOnInit() {
  }

  async restartServer() {
    this.restartServerLoad = true;

    try {
      await this.serverService.restartServer();
    } catch (e) {
    }

    setTimeout(() => {
      this.restartServerLoad = false;
    }, 1000);
  }
}
