class scene1 extends Phaser.Scene {

	constructor(){

		super({key: "scene1"});

		this.__sayilar_obj = [];
		this.__sayilar_hiz = [];
		this.__sayilar_back = [];
		this.__sayilar_col = [];
		this.__column_number = 3;
		this.__column_width_spar = 200;
		this.__sayilar_col_tmp_for = [];
		for (let i = 0; i<this.__column_number; i++){
			this.__sayilar_col[i] = [];
		}

		this.__sayilar_say = 0;
		this.__sayilar_say_i;

		this.__update_say = 0;

		// default level : 0

		this.__level = 0;
		this.__level_column_numbers = [3,4,7];
		this.__level_column_width_spars = [200,160,100];


		this.__point = 0;
		this.__point_text;

	}


	preload(){
				this.__point_text = this.add.text(0,0,"");
				this.__point_text.destroy();
				this.__point_text = this.add.text(0, 0, "Point: " + this.__point, {font: "bold 40px Georgia self", fill: "Yellow"});


		    this.canvas = this.sys.game.canvas;

	//			console.log(this.canvas);

				this._width = this.canvas.offsetWidth;
				this._height = this.canvas.offsetHeight;

				this.__column_number = this.__level_column_numbers[this.__level]; // 3;
				this.__column_width_spar = this.__level_column_width_spars[this.__level]; // 200;

				// def w,h: 800,600 in v1

				this.__sprite_w = 64;
				this.__sprite_h = 64;


				this.__gap = this._width/(this.__column_number + 1);
				this.__sprite_w_scale = this.__gap/(this._width*64/800);
				this.__sprite_h_scale = this.__gap/(this._height*64/600);


		this.__sayilar_obj = [];
		this.__sayilar_hiz = [];
		this.__sayilar_back = [];
		this.__sayilar_col = [];

		this.__sayilar_col_tmp_for = [];
		for (let i = 0; i<this.__column_number; i++){
			this.__sayilar_col[i] = [];
		}

		this.__sayilar_say = 0;
		this.__sayilar_say_i;

		this.__update_say = 0;


		// if update array items number is 0 then: up level



		this.__new_game = true; // is false when after add the first sprite

		var sheets = this.load.spritesheet("numbers", "assets/numbers.png", {frameWidth: 64, frameHeight: 64});
	//	console.log(sheets);

	// ##################### explotion ##################################

	this.load.spritesheet("explosion", "assets/explosion.png",{
	frameWidth: 64,
	frameHeight: 64
});



	}

	create(){

		// ############## explosion create ###################################

		this.anims.create({
	key: "explode",
	frames: this.anims.generateFrameNumbers("explosion"),
	frameRate: 40,
	repeat: 0,
	hideOnComplete: true
});

		for (let i = 0; i < this.__column_number; i++){

var random_1_5 = Phaser.Math.Between(3,4);

this.add_sprite(random_1_5, i);

}

/*
		this.add.text(0,0, "loaded");
		var sprite = this.add.sprite(100,100,"numbers");
	//	console.log(sprite);

		let config_ = {
			key: "numara1",
			frames: this.anims.generateFrameNumbers("numbers", {start: "5", end: "5"}),
			frameRate: 0,
			repeat: 0,

		}

		this.anims.create(config_);
		sprite.play("numara1");
		*/

		this.input.on('gameobjectdown', this.destroyObj, this);

	}

	update(){

//		console.log(this.__sayilar_obj.length);

this.__update_say++;


		if (this.__new_game === false && this.__sayilar_obj.length === 0){


			// level grows
			this.__level += 1;

			if( this.__level >= this.__level_column_numbers.length)   this.__level = this.__level_column_numbers.length - 1;

			this.scene.start("scene1");
		}

		for (let i = 0; i < this.__sayilar_obj.length; i++){


			if (this.__sayilar_obj[i]["object"].visible === false){
		//		console.log(i);
			//	console.log("vis");
			//	console.log(this.__sayilar_obj[i]["object"]);
				this.kill_visible(this.__sayilar_obj[i]["object"], i);
			}



	  //  console.log(i);
	//		console.log("iii");
	if (this.__sayilar_obj[i] !== undefined){
			this.__sayilar_obj[i]["object"].y += this.__sayilar_obj[i]["hiz"];
		}
if (this.__sayilar_obj[i] !== undefined){
			if (this.__sayilar_obj[i]["object"].y >= 200 && this.__sayilar_obj[i]["object"].y <= 300 && this.__sayilar_obj[i]["back"] == true){this.createOnTheBack(this.__sayilar_obj[i]["object"]);this.__sayilar_obj[i]["back"] = false;}
}
if (this.__sayilar_obj[i] !== undefined){
			this.touchNumbers(this.__sayilar_obj[i]["object"], i);
		}
if (this.__sayilar_obj[i] !== undefined){
			if (this.__sayilar_obj[i]["object"].y >= config.height){
				this.spriteDestroy(this.__sayilar_obj[i]["object"], i);
		//		console.log(i);
			//	console.log("tou");
			//	console.log(this.__sayilar_obj[i]);
			if (this.__sayilar_obj[i] !== undefined){
				this.touchTheEnd(this.__sayilar_obj[i]["object"]);
			}
			else {
				touchTheEnd();
			}

			}

		}


// spriteDestroy();


		//	console.log(this.__sayilar_hiz[i]);



		}


	}

	add_sprite(number, column_order, y_cor = null){

this.__sayilar_say++;
this.__sayilar_say_i = this.__sayilar_say - 1;


this.__sayilar_back[this.__sayilar_say_i] = true;

if (y_cor == null) y_cor = 100; // belki 200

let obj_tmp = this.add.sprite(this.__column_width_spar*(column_order + 1),100,"numbers");
this.__new_game = false;
let w_100 = 150/64;
obj_tmp.setScale(this.__sprite_w_scale,this.__sprite_h_scale);

//console.log(obj_tmp);
//console.log(yok);


this.__sayilar_obj.push({number: this.__sayilar_say_i, object: obj_tmp,
column: column_order,
back: true,
hiz: number});
this.__sayilar_hiz.push({number: number});
this.__sayilar_col[column_order].push(obj_tmp);
//console.log(this.__sayilar_col[column_order]);

let config_ = {
	key: "sayilar" + this.__sayilar_say_i, //"numbers1",
	frames: this.anims.generateFrameNumbers("numbers", {start: number, end: number}),
	frameRate: 0,
	repeat: 0,

};

this.anims.remove("sayilar" + this.__sayilar_say_i);
this.anims.create(config_);
obj_tmp.play("sayilar" + this.__sayilar_say_i); // "numbers1");

obj_tmp.setInteractive();

	}

	spriteDestroy(sprite_object, i_order=null){

		const column_calc = (sprite_object.x/this.__column_width_spar)-1;

	//	console.log(this.__sayilar_col[column_calc].length);

	if (i_order === null){

	i_order =	this.__sayilar_obj[this.__sayilar_obj.findIndex(s => s.object == sprite_object)]["number"];

	}

	this.__point += this.__sayilar_obj.find(s=>s.object === sprite_object).hiz;
	this.pointRe_Writer();

		this.__sayilar_col[column_calc].splice(this.__sayilar_col[column_calc].indexOf(sprite_object),1);


		this.__sayilar_obj.splice(i_order,1);



		sprite_object.destroy();


	}

	createOnTheBack(sprite_object){

		const column_calc = (sprite_object.x/this.__column_width_spar)-1;

		var random_1_5 = Phaser.Math.Between(1,3);

		let obj_tmp = this.add_sprite(random_1_5, column_calc);




	}

	touchNumbers(sprite_object, i_order=null){

		const column_calc = (sprite_object.x/this.__column_width_spar)-1;

	//	console.log(this.__sayilar_col[column_calc]);
//		console.log(yok);

		this.__sayilar_col_tmp_for = [];

		for (let i = 0; i < this.__sayilar_col[column_calc].length; i++){

			this.__sayilar_col_tmp_for[i] = this.__sayilar_col[column_calc][i];

		}

	let 	this__sayilar_col_tmp_for = this.__sayilar_col_tmp_for.sort(function (a,b){
			return a.y - b.y;
		});

// console.log(this.__sayilar_col_tmp_for.length);

		for (let k = 0; k < this.__sayilar_col_tmp_for.length; k++){

			if (k > 0){

		//	console.log(k + "   " + this.__sayilar_col_tmp_for.length);
//console.log(this.__sayilar_col_tmp_for);
//console.log(this__sayilar_col_tmp_for.length);
//console.log(yok);

let aaa = this.__sayilar_col_tmp_for[k].y;

			//			console.log(this.__sayilar_col_tmp_for[k].y-this.__sayilar_col_tmp_for[k-1].y);

			if (this.__sayilar_col_tmp_for[k].y-this.__sayilar_col_tmp_for[k-1].y <= 20){ // daha yukarida bosluklar kaliyor.

				let k_hiz = this.__sayilar_obj[i_order]["hiz"];
				k_hiz = this.__sayilar_obj.find(s => s["object"] === this.__sayilar_col_tmp_for[k-1]).hiz;

				this.reanim(this.__sayilar_col_tmp_for[k], k_hiz, i_order);

				this.spriteDestroy(this.__sayilar_col_tmp_for[k-1], i_order);




		//		if (this.__sayilar_col_tmp_for[k-1].y <= 200 && this.__sayilar_obj[k]["back"] == true){this.createOnTheBack(this.__sayilar_obj[k]["object"]);this.__sayilar_obj[k]["back"] = false;}
		//		console.log(this.__sayilar_col_tmp_for[k]);
			//	console.log(i_order);
			}

			}
		}


/*
		for (let i = 0; i <= this.__sayilar_col_tmp_for.length; i++){


			if (i !== this.__sayilar_col_tmp_for.length && this.__sayilar_col_tmp_for.length > 1){
			for (let j = i+1; j <= this.__sayilar_col_tmp_for.length; j++){



let i_obj = this.__sayilar_col_tmp_for[i];
let j_obj = this.__sayilar_col_tmp_for[j];

if (typeof i_obj != "undefined" && typeof j_obj != "undefined"){

if (i_obj.y+32 >= j_obj-32 && i_obj.y+32 <= j_obj){

	let dsdsd = 22;

	console.log(i_obj.y);
	this.spriteDestroy(i_obj);

}

}



	// burasi /yildiz

				if (this.__sayilar_col_tmp_for[i].y+32 >= this.__sayilar_col_tmp_for[j].y-32 && this.__sayilar_col_tmp_for[i].y+32 <= this.__sayilar_col_tmp_for[j].y){

					console.log("logged");

				}

			// burasi yidiz/


			}
		}

	} // for (let i = 0; i <= this.__sayilar_col_tmp_for.length; i++)

	*/




	}

	reanim(sprite_object, add_speed, i_order){

	//	console.log(sprite_object);
	//	const k_speed = this.__sayilar_obj.find(s => s.object === sprite_object).hiz;

		const k_speed = this.__sayilar_obj.find(s=>s["object"] === sprite_object).hiz;

		const k_number = this.__sayilar_obj.find(s => s.object === sprite_object)["number"];

		const news_speed = k_speed + add_speed;

		this.__sayilar_obj.find(s => s.object === sprite_object)["hiz"] = news_speed;

		//console.log(this.__sayilar_obj[this.__sayilar_obj.findIndex(s => s.object == sprite_object)]["hiz"])
	//	console.log(add_speed);
//

// console.log(k_number);
// console.log(k_speed);
// console.log(add_speed);
// console.log(news_speed);
// console.log(yok);


		let config_ = {
			key: "n_sayilar" + k_number, //"numbers1",
			frames: this.anims.generateFrameNumbers("numbers", {start: news_speed, end: news_speed}),
			frameRate: 0,
			repeat: 0,

		}

		this.anims.remove("n_sayilar" + k_number);
		this.anims.create(config_);
		sprite_object.play("n_sayilar" + k_number);





	//	sprite_object.play("sayilar" + k_number); // "numbers1");

//	console.log(this.__sayilar_obj[this.__sayilar_obj.findIndex(s => s.object == sprite_object)]);
//	console.log(yok);





	}

	destroyObj(pointer, gameObject) {
	gameObject.setTexture("explosion");
	gameObject.play("explode");

	// #################### delete obj #######################################



}

touchTheEnd(sprite_object){


this.__level -= 1;
if (this.__level < 0) this.__level = 0;
 this.__point = 0;
this.scene.start("scene2");

}

kill_visible(sprite_object, i_order){

this.spriteDestroy(sprite_object, i_order);

}

pointRe_Writer(){


	this.__point_text.destroy();
	this.__point_text = this.add.text(0, 0, "Point: " + this.__point, {font: "bold 40px Georgia self", fill: "Yellow"});

}



}
