import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

import { Hero } from '../hero';
import { InformationService } from '../information.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-automation-page',
  templateUrl: './automation-page.component.html',
  styleUrls: ['./automation-page.component.css']
})
export class AutomationPageComponent implements OnInit {

devices = [];
miniactions = [];
minitasks = [];
settime;
selecteddevice;
selectedaction;
Sets = [];
hardcommands = [ "dim50%", "on-for-timer", "dim12%", "on-till"]

  constructor(private chat: ChatService, private informationService: InformationService){}
  
  ngOnInit() {
  
  this.chat.messages.subscribe(msg => {
		this.getHeroes(msg);
  })
  }

getHeroes(msg) {
	this.devices = this.informationService.getHeroes(msg);;
}
// -----------------------------------------------------------------------------------------------------------

deleteOne (event) {
	for (var i=0; i < this.miniactions.length; i++) {
		if(event === this.miniactions[i].key){
			this.miniactions.splice(i, 1)
			this.minitasks.splice(i, 1)
		}
	}
}

saveOne (action) {
	if (this.minitasks.length === 0) {
		this.minitasks.push(action)
	}
	else {
		if (!this.minitasks.includes(action)) {
			this.minitasks.push(action)
		}
	}
}

addaction () {
	var item = {
		key: Date.now()
	}
	this.miniactions.push(item);
}

devicesel () {
this.Sets = ["on", "off"];
	for (var i=0; i < this.devices.length; i++) {
		if(this.selecteddevice === this.devices[i].Name){
			if (this.devices[i].PossibleSets.length > 1) {
				var intermed = this.devices[i].PossibleSets.split(" ");
					for (var i = 0; i < intermed.length; i++) {
						for (var j = 0; j < this.hardcommands.length; j++) {
							if (this.hardcommands[j] === intermed[i]) {
								this.Sets.push(this.hardcommands[j]);
							}
						}
					}
			}
		}
	}
}

timer () {
	console.log(this.settime)
}

automate () {
	var complexorbasic = '';
	var atornotifyorempty = '';
	var finaltasks = '';
	var partcommand = '';
	
	var ifpart = " IF ([" + this.selecteddevice + "] eq " + '"' + this.selectedaction + '") '; // Complete!
	
	if (this.settime) {
			atornotifyorempty = " at " + this.settime;
		} else if (!this.settime) {
			atornotifyorempty = " notify " + this.selectedaction;
		}
		
		if (this.minitasks.length) {
			complexorbasic = "complex";
			finaltasks = "( " + this.minitasks + " )";
		} else if (!this.minitasks.length) {
			complexorbasic = "basic";
			ifpart = '';
			finaltasks = ' set ' + this.selecteddevice + " " + this.selectedaction;
		}
		
		if (!this.minitasks.length && !this.settime) {
			partcommand = finaltasks;
		} else {
			partcommand = "define " + complexorbasic + this.selecteddevice + atornotifyorempty + ifpart + finaltasks;
		}
		
		console.log(partcommand);
}

}
