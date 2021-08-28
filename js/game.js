let prize_config = {
  count: 8,
  prize_name: [
    "react js",
    "css",
    "mysql",
    "javascript",
    "Bootstrap",
    "php",
    "html",
    "mongodb",
  ],
};

let config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  backgroundColor: 0xffcc00,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);

function preload() {
  console.log("I am in the preload fun");

  // load images

  this.load.image("background", "../assets/back.png");
  this.load.image("wheel", "../assets/wheel1.png");
  this.load.image("pin", "../assets/pin.png");
  //   this.load.image("stand", "");
}
function create() {
  console.log("I am create Func");

  // create the background image

  let W = game.config.width;
  let H = game.config.height;

  let background = this.add.sprite(0, 0, "background");
  background.setPosition(W / 2, H / 2);
  background.setScale(0.21);

  // lets create a wheel

  this.wheel = this.add.sprite(W / 2, H / 2 - 50, "wheel");
  this.wheel.setScale(0.76);

  // lets create a pin

  let pin = this.add.sprite(W / 2 + 30, H / 2 - 200, "pin");
  pin.setScale(0.12);

  // event listener
  this.input.on("pointerdown", spinwheel, this);

  //add text

  fontStyle = {
    color: "red",
    font: "bold 30px Arial",
    align: "center",
  };

  this.game_text = this.add.text(
    10,
    10,
    "Welcome to the spin and win",
    fontStyle
  );
}

// game loop
function update() {
  console.log("inside update fun");

  // this.wheel.angle += 1;
}

function spinwheel() {
  // console.log("You Clicked the mouse");

  // this.game_text.setText("You Clicked the mouse");

  let rounds = Phaser.Math.Between(2, 4);
  let degrees = Phaser.Math.Between(0, 7) * 27;

  let totalAngle = rounds * 360 + degrees;

  let idx =
    prize_config.count - 1 - Math.floor(degrees / (360 / prize_config.count));
  tween = this.tweens.add({
    targets: this.wheel,
    angle: totalAngle,
    ease: "Cubic.easeOut",
    duration: 6000,
    callbackScope: this,
    onComplete: function () {
      this.game_text.setText(
        "you won something : " + prize_config.prize_name[idx]
      );
    },
  });
}
