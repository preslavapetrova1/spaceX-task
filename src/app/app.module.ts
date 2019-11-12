import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PixiComponent } from './components/pixi/pixi.component';
import {RocketService} from "./services/rocket/rocket.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PixiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
