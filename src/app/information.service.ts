import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import * as io from 'socket.io-client';

@Injectable({
	providedIn: 'root',
})
export class InformationService {

  devices = [];
    
  constructor(public chat: ChatService) {
  
  }
  
	getHeroes(msg) {
		if (msg[0]) {
		//-------------------------------------------------
	  var re = /Bye.../gi;
	  var rawdevices = JSON.parse(msg.join("").replace(re, " "));
	  var elements = new Array();
//------------------------------------------------------------------------------------	  
		for (var i=0; i < rawdevices.Results.length; i++) {
		if(!/((new)|(fs20log)|(temp)|(telnet)|(WEB)|(autocreate)|(global)|(Logfile)|(initialUsb)|(eventTypes)|(CUL)|(HM)|(power)|(schedule)|(ActionDetector))/.test(rawdevices.Results[i].Name)){
			if (rawdevices.Results[i].PossibleSets.includes("dim")) {
				rawdevices.Results[i].rangeornot = true;
			}
			elements.push(rawdevices.Results[i]);
		  }
			this.devices = elements;
		  }
		  //-----------------------------------------------
		} else {
			this.listenchange(msg);
			}
			
		return(this.devices)
	}
  
listenchange(info) {
	for (var devnam in info) {
		for (var i=0; i < this.devices.length; i++) {
			if (this.devices[i].Name === devnam){
				this.devices[i].Internals.STATE = info[this.devices[i].Name];
			}
		}
	}
}

}
