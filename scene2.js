class scene2 extends Phaser.Scene{
  constructor(){
super({key:"scene2"});



  }

  create(){

this.add.text(0,0, "  :(", {font: "40px Georgia, self"});

this.input.on("pointerdown", function(pointer){

 this.scene.start("scene1");
},this);

  }


}
