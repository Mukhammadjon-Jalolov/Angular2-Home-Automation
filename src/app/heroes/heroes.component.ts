import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  inputs: ['devices', 'action']
})
export class HeroesComponent implements OnInit {

@Output() doDelete = new EventEmitter<string>();
@Output() doSave = new EventEmitter<string>();

selecteddevice;
selectedaction;
Sets = [];
hardcommands = [ "dim50%", "on-for-timer", "dim12%", "on-till"];

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

sendDelete (key) {
	this.doDelete.emit(key);
}

sendSave (device, event) {
	this.doSave.emit("set " + device + " " + event)
}

  constructor() { }

  ngOnInit() {
  }

}
