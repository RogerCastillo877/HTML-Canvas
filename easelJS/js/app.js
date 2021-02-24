window.onload = function(){
	init();
}

var canvas, stage, image, personaje, caminando = false, vX = 0;


function init(){
	var contenedor = document.getElementById("contenedor");

	if(Modernizr.canvas){
		canvas = document.createElement("canvas");
		canvas.width = 640;
		canvas.height = 426;
		contenedor.appendChild(canvas);

		context = canvas.getContext("2d");

		stage = new createjs.Stage(canvas);

		cargaAssets();

	}else{
		contenedor.innerHTML = "El navegador no soporta canvas";
	}

}

function cargaAssets(){
	var _self = this;
	image = new Image();
	image.onload = function(e){
		_self.imagenCargada();
	}
	image.src = "assets/personaje.png";
}

function imagenCargada(){

	var data = {
		images: [image],
		frames: {width: 33, height: 59, regX: 16, regY: 0},
		animations: {stop:[23, 23], run:[0, 13, "run"], jump:[24, 38, "jump"]}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	personaje = new createjs.BitmapAnimation(spriteSheet);
	personaje.x = 300;
	personaje.y = 300;
	para();
	stage.addChild(personaje);


	createjs.Ticker.setFPS(30);
	createjs.Ticker.addListener(tick);

	stage.addEventListener("stagemousedown", mouseDown);

	personaje.addEventListener("mousedown", salta);
}

function tick(){
	stage.update();

	if(caminando){
		personaje.x += vX;
	}

	if(personaje.currentFrame == 38){
		para();
	}
}

function mouseDown(e){
	stage.addEventListener("stagemouseup", mouseUp);
	camina(e);
}

function mouseUp(e){
	stage.removeEventListener("stagemouseup", mouseUp);
	para();
}

function para(){
	personaje.gotoAndPlay("stop");

	vX = 0;
	caminando = false;
}

function camina(e){
	personaje.gotoAndPlay("run");

	if(e.stageX > personaje.x){
		vX = 2;
		personaje.scaleX = 1;
	}else{
		vX = -2;
		personaje.scaleX = -1;
	}

	caminando = true;
}

function salta(){
	personaje.gotoAndPlay("jump");
	vX = 0;
}
