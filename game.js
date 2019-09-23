var config = {
width:800,
height:600,


  scale: {
    mode:Phaser.FIT,
    autoCenter:Phaser.Scale.CENTER_BOTH,
    width:800,
    height: 600


  },
  scene: [ scene1, scene2 ]


};

var game = new Phaser.Game(config);
