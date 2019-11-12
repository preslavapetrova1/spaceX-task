import {Component, OnInit, ViewChild} from '@angular/core';
import {RocketService} from "../../services/rocket/rocket.service";

declare var PIXI: any;

@Component({
  selector: 'app-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss']
})
export class PixiComponent implements OnInit {


  @ViewChild('pixiContainer', {static: true}) pixiContainer;
  app: any;

  constructor(private rs: RocketService) {
  }

  ngOnInit() {
    this.app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
    this.pixiContainer.nativeElement.appendChild(this.app.view);
    this.app.PIXI.loader
      .add([
        "assets/bg.jpg",
        "assets/rocket.png",
        "assets/rocket_bottom.png",
        "assets/rocket_top.png",
        "assets/thrust.png"
      ])
      .load(()=>{
        let sprite = new PIXI.Sprite(
          PIXI.loader.resources["assets/bg.jpg"].texture);
        this.app.stage.addChild(sprite);
      });


  }
}
