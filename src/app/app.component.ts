import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'FHEM home';
  devices;
  
	constructor(private chat: ChatService){}
  
  ngOnInit(){

	this.chat.messages.subscribe(msg => {
	if (msg[0]) {
	  var re = /Bye.../gi;
	  var rawdevices = JSON.parse(msg.join("").replace(re, " "));
	  var devices = new Array();
	  
		for (var i=0; i < rawdevices.Results.length; i++) {
		if(!/((new)|(fs20log)|(temp)|(telnet)|(WEB)|(autocreate)|(global)|(Logfile)|(initialUsb)|(eventTypes)|(CUL)|(HM)|(power)|(schedule)|(ActionDetector))/.test(rawdevices.Results[i].Name)){
			if (rawdevices.Results[i].PossibleSets.includes("dim")) {
				rawdevices.Results[i].rangeornot = true;
			}
			devices.push(rawdevices.Results[i]);
		  }
			this.devices = devices;
		  }
	} else {
			this.listenchange(msg);
			}
    })
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

// -------------------------------------------------------------------------------------

switcher(name, event){
if (event.target.checked) {
	this.chat.sendMsg("set " + name + " on");
} else {
	this.chat.sendMsg("set " + name + " off");
}
}

rangeCommand(innn, event: any) {
this.chat.sendMsg("set " + innn + " dim" + event.target.value + "%");
}

}
