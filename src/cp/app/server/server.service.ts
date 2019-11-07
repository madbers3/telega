import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import environment from "../../environments/environment";
import {WsEvent} from "ws-client-events-decorators";

interface SystemInfo {
  cpu: {
    brand: string;
    cache: { l1d: number, l1i: number, l2: number, l3: number; }
    cores: number;
    family: string;
    manufacturer: string;
    model: string;
    physicalCores: number;
    processors: number;
    revision: string;
    socket: number;
    speed: string;
    speedmax: string;
    speedmin: string;
    stepping: string;
    vendor: string;
    voltage: string;
  }
  mem: {
    appUsed: number;
    free: number;
    percent: number;
    total: number;
  },
  currentLoad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private socket: Socket;
  public systemInfo: SystemInfo;

  @WsEvent({name: 'restart server', success: 'restart server', error: 'error restart server'})
  restartServer: () => Promise<void>;

  constructor() {
    this.socket = io(environment.serverUrl ? environment.serverUrl + '/server' : '/server');

    this.socket.on('system info', (info: SystemInfo) => {
      this.systemInfo =  info;
    });
  }
}
