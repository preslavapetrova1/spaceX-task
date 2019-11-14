import * as createjs from 'createjs-module';

enum ROCKET_STAGE {
  IGNITION,
  FIRST,
  SEPARATION,
  SECOND,
  FINAL
}

const FUEL_BURN_SPEED = 1 / 5;

export class Rocket extends PIXI.Container {
  rocketId: number;
  name: string;
  firstStageFuel: number;
  secondStageFuel: number;

  currentStage: ROCKET_STAGE;

  rocketTop: PIXI.Sprite;
  rocketBottom: PIXI.Sprite;
  flame: PIXI.Sprite;
  text: PIXI.Text;
  rocketSpeed: number;

  constructor(rocketId: number, name: string, firstStageFuel: number, secondStageFuel: number, x: number) {
    super();
    this.currentStage = ROCKET_STAGE.IGNITION;

    this.rocketId = rocketId;
    this.name = name;
    this.firstStageFuel = firstStageFuel;
    this.secondStageFuel = secondStageFuel;

    this.rocketSpeed = (window.innerHeight - 200) / (this.firstStageFuel + this.secondStageFuel) * FUEL_BURN_SPEED;

    this.position.set(x, window.innerHeight - 200);

    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 15,
      fill: ['#ffffff']
    });
    this.text = new PIXI.Text(this.firstStageFuel.toString(), textStyle);
    this.text.position.set(15,0);

    this.rocketTop = PIXI.Sprite.from('assets/rocket_top.png');
    this.rocketTop.position.set(0, this.text.height);

    this.rocketBottom = PIXI.Sprite.from('assets/rocket_bottom.png');
    this.rocketBottom.position.set(0, this.text.height + this.rocketTop.height - 2);

    this.flame = PIXI.Sprite.from('assets/thrust.png');
    this.flame.position.set(11, this.text.height + this.rocketTop.height + this.rocketBottom.height - 6);
    this.flame.alpha = 0;



    createjs.Tween.get(this.flame, {})
      .to({alpha: 0.4}, 500, createjs.Ease.linear)
      .to({alpha: 0.1}, 400, createjs.Ease.linear)
      .to({alpha: 0.5}, 500, createjs.Ease.linear)
      .to({alpha: 0.2}, 300, createjs.Ease.linear)
      .to({alpha: 0.6}, 400, createjs.Ease.linear)
      .call(() => {
        this.flame.alpha = 1;
        this.currentStage = ROCKET_STAGE.FIRST;
      });

    this.addChild(this.rocketTop, this.rocketBottom, this.flame);
    this.addChild(this.text);
  }

  update() {
    if (this.currentStage === ROCKET_STAGE.FIRST) {
      this.firstStageUpdate();
    } else if (this.currentStage === ROCKET_STAGE.SECOND) {
      this.secondStageUpdate();
    }
  }

  private firstStageUpdate() {
    this.y -= this.rocketSpeed;
    this.firstStageFuel -= FUEL_BURN_SPEED;
    this.firstStageFuel = Math.round(this.firstStageFuel * 100) / 100;
    this.text.text = this.firstStageFuel.toString();
    if (this.firstStageFuel <= 0) {
      this.flame.y -= this.rocketBottom.height;
      this.currentStage = ROCKET_STAGE.SEPARATION;
      this.rocketBottom.anchor.set(0.5, 0.5);
      const randomXDirection = Math.random() < 0.5 ? -1 : 1;
      this.flame.alpha = 0;
      this.text.text = "0";
      createjs.Tween.get(this.rocketBottom, {})
        .to({
          y: window.innerHeight / 2,
          x: this.x + randomXDirection * Math.random() * 100,
          alpha: 0,
          rotation: Math.PI * 4
        }, 5000, createjs.Ease.linear)
        .call(() => {
          this.rocketBottom.destroy();
        });

      setTimeout(() => {
        this.currentStage = ROCKET_STAGE.SECOND;
        this.flame.alpha = 1;
      }, 600);

    }
  }

  private secondStageUpdate() {
    this.y -= this.rocketSpeed;
    this.secondStageFuel -= FUEL_BURN_SPEED;
    this.secondStageFuel = Math.round(this.secondStageFuel * 100) / 100;
    this.text.text = this.secondStageFuel.toString();
    if (this.secondStageFuel <= 0) {
      this.flame.destroy();
      this.rocketTop.destroy();
      this.text.destroy();
      this.emit('destroyed');
      this.currentStage = ROCKET_STAGE.FINAL;
    }
  }
}


