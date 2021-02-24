window.onload = function(){
	init();
}

var canvas, context, preLastX, preLastY, lastX, lastY;
var BpreLastX, BpreLastY, BlastX, BlastY;

function init(){
	var contenedor = document.getElementById("contenedor");

	if(Modernizr.canvas){
		canvas = document.createElement("canvas");
		canvas.width = 600;
		canvas.height = 300;
		contenedor.appendChild(canvas);

		context = canvas.getContext("2d");
		
		context.lineWidth = 2;

		addListeners();
	}else{
		contenedor.innerHTML = "El navegador no soporta canvas";
	}

}

function dibujaQuad(e){

	if(lastX != null && preLastX != null){
		context.strokeStyle = "#f0FF00";
		context.beginPath();
		context.moveTo(preLastX, preLastY);
		context.quadraticCurveTo(lastX, lastY, e.layerX, e.layerY);
		context.stroke();

		preLastX = null;
		preLastY = null;

	}else if(lastX != null){
		preLastX = lastX;
		preLastY = lastY;
	}

	

	lastX = e.layerX;
	lastY = e.layerY;
}

function dibujaBez(e){

	if(BlastX != null && BpreLastX != null){
		context.strokeStyle = "#ff0000";
		context.beginPath();
		context.bezierCurveTo(BpreLastX, BpreLastY, BlastX, BlastY, e.layerX, e.layerY);
		context.stroke();

		BpreLastX = null;
		BpreLastY = null;

	}else if(BlastX != null){
		BpreLastX = BlastX;
		BpreLastY = BlastY;
	}

	

	BlastX = e.layerX;
	BlastY = e.layerY;
}

function addListeners(){
	canvas.addEventListener("mousedown", mouseDown);
	
	canvas.addEventListener("touchstart", touchDown);
	
	
	
}

function mouseDown(e){
	dibujaQuad(e);
	dibujaBez(e);
}


function touchDown(e){
	dibujaQuad(e);
	dibujaBez(e);
}

