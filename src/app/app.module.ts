import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';
import { DeviceService } from './device.service';
import { RouterModule, Routes } from '@angular/router';
import { InformationService } from './information.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { AutomationPageComponent } from './automation-page/automation-page.component';

const appRoutes: Routes = [
  { path: 'automation', component: AutomationPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    AutomationPageComponent
  ],
  imports: [
	RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
	FormsModule
  ],
  providers: [ChatService, WebsocketService, DeviceService, InformationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
