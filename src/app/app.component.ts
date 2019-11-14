import {Component} from '@angular/core';
import {RocketService} from './services/rocket/rocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spaceX-task';

  constructor(public rs: RocketService) {

  }
}
