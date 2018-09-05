import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';



@Injectable()

export class DeviceService {

 messages: string[] = [];
 
  constructor() { }

}
