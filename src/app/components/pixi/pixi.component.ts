import {Component, OnInit, ViewChild} from '@angular/core';
import {RocketService} from '../../services/rocket/rocket.service';
import {Application} from 'pixi.js';
import {Rocket} from './src/Rocket';

import * as createjs from 'createjs-module';

@Component({
  selector: 'app-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss']
})
export class PixiComponent implements OnInit {

  @ViewChild('pixiContainer', {static: true}) pixiHTMLDiv;

  app: Application;
  rockets: Array<Rocket>;
  counter: number;
  successText: PIXI.Text;

  constructor(private rs: RocketService) {
  }

  ngOnInit() {
    this.app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
    this.pixiHTMLDiv.nativeElement.appendChild(this.app.view);
    this.counter = 0;

    this.rockets = [];
    const bg = PIXI.Sprite.from('assets/bg.jpg');
    bg.position.set(0, 0);
    this.app.stage.addChild(bg);
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;



    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial Black',
      fontSize: 100,
      fill: ['#ffffff']
    });
    this.successText = new PIXI.Text('SUCCESS!', textStyle);
    this.successText.anchor.set(0.5, 0.5);
    this.successText.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.successText.alpha = 0;

    this.app.stage.addChild(this.successText);

    this.app.loader.add([
      'assets/rocket_bottom.png',
      'assets/rocket_top.png',
    ]).load(() => {
      for (let i = 0; i < this.rs.rockets.length; i++) {
        const rckt = this.rs.rockets[i];
        const rocket = new Rocket(rckt.rocketId, rckt.name, rckt.firstStageFuel, rckt.secondStageFuel, (i + 1) * window.innerWidth / 5);
        this.app.stage.addChild(rocket);
        this.rockets.push(rocket);

        rocket.on('destroyed', () => {
          this.counter++;
          console.log('rocket destroyed');
          if (this.counter === this.rs.rockets.length) {
            this.simulationOver();
          }
        });
      }
    });

    this.app.ticker.add((delta) => {
      this.rockets.forEach((rocket: Rocket) => {
        rocket.update();
      });
    });
  }

  private simulationOver() {
    this.successText.alpha = 1;
  }
}
