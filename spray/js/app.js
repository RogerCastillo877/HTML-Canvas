window.onload = function(){
	init();
}

var canvas, context, color, radio;

function init(){
	var contenedor = document.getElementById("contenedor");

	if(Modernizr.canvas){
		canvas = document.createElement("canvas");
		canvas.width = 600;
		canvas.height = 300;
		contenedor.appendChild(canvas);

		context = canvas.getContext("2d");
		color = "rgba(0, 250, 0, 0.4)";
		radio = document.getElementById("maxValue").value;


		addListeners();
	}else{
		contenedor.innerHTML = "El navegador no soporta canvas";
	}

}

function dibujaforma(e){
	context.beginPath();
	context.fillStyle = color;
	
	var _radio = 1 + Math.ceil(Math.random() * radio);
	var _desvX = 1 + Math.ceil(Math.random() * radio);
	var _desvY = 1 + Math.ceil(Math.random() * radio);

	context.arc(e.layerX + _desvX, e.layerY + _desvY, _radio, 0, Math.PI * 2);
	context.fill();
}

function addListeners(){
	canvas.addEventListener("mousedown", mouseDown);

	canvas.addEventListener("touchstart", touchDown);
}


function mouseDown(e){
	canvas.addEventListener("mousemove", mouseMove);
	document.addEventListener("mouseup", mouseUp);

	dibujaforma(e);
}

function mouseMove(e){
	dibujaforma(e);
}

function mouseUp(e){
	canvas.removeEventListener("mousemove", mouseMove);
	document.removeEventListener("mouseup", mouseUp);
}


function touchDown(e){
	canvas.addEventListener("touchmove", touchMove);
	canvas.addEventListener("touchend", touchUp);
	document.addEventListener("touchcancel", touchUp);
}

function touchMove(e){
	dibujaforma(e);
}

function touchUp(e){
	canvas.removeEventListener("mousemove", mouseMove);
	document.removeEventListener("mouseup", mouseUp);
}