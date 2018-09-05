import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket;
  public information = '';

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
		this.socket = io(environment.ws_url);
		this.socket.emit('getAllValuesOnChange');
		this.socket.emit('getAllDevicesOnChange');
		this.socket.emit('getReadingOnChange');
		this.socket.emit('command', 'jsonlist2', (data) => {
			//console.log(data);
		})

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
        this.socket.on('value', (data) => {
          //console.log(data)
          observer.next(data);
        })
		this.socket.emit('command', 'jsonlist2', (data) => {
			observer.next(data);
		})
		
        return () => {
          this.socket.disconnect();
        }
    });
    
    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
			if (typeof data === 'string') {
				console.log("It is a command" + data)
				this.socket.emit('command', data);
			}
            //
        },
    };
	
	//Mini subscriber down here
/*	let subscr = observable.subscribe({
	next(info) {console.log('Something happened: ' + info);}
	});
*/	

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }
  
  
  
}