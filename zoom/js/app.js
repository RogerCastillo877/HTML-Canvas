window.onload = function(){
	init();
}

var canvas, context, imageObj, imageData;

function init(){
	var contenedor = document.getElementById("contenedor");

	if(Modernizr.canvas){
		canvas = document.createElement("canvas");
		canvas.width = 640;
		canvas.height = 426;
		contenedor.appendChild(canvas);

		context = canvas.getContext("2d");

		creaImagen();
	}else{
		contenedor.innerHTML = "El navegador no soporta canvas";
	}

}

function creaImagen(){
	/*var sprite = document.getElementById("fondo");
	context.drawImage(sprite, 0, 0);*/
	var _self = this;
	imageObj = new Image();
	imageObj.onload = function(){
		_self.dibujaImagen();

		_self.canvas.addEventListener("mousedown", _self.mousedown);
	}
	imageObj.src = "assets/fondo.jpg";
}

function dibujaImagen(){
	context.save();
	context.scale(0.8, 0.8);
	context.drawImage(imageObj, 0, 0);
	//context.drawImage(imageObj, 0, 0, 100, 400, 100, 0, 100, 100);


	context.restore();

	if(imageData != null){
		context.putImageData(imageData, 0, 0);
	}
}

function dibujaZoom(e){
	dibujaImagen();

	context.save();
	context.beginPath();
	context.arc(e.layerX, e.layerY, 50, 0, Math.PI*2);

	context.shadowColor = "#000";
	context.shadowBlur = 15;
	context.shadowOffsetX = 4;
	context.shadowOffsetY = 4;
	context.fill();


	context.closePath();
	context.clip();

	context.drawImage(imageObj, -((e.layerX * 1.25) - e.layerX), -((e.layerY * 1.25) - e.layerY));

	context.restore();
}

function mousedown(e){
	canvas.addEventListener("mousemove", mouseMove);
	document.addEventListener("mouseup", mouseUp);

	procesaImagen();
	dibujaZoom(e);
}

function mouseMove(e){
	dibujaZoom(e);
}

function mouseUp(e){
	canvas.removeEventListener("mousemove", mouseMove);
	document.removeEventListener("mouseup", mouseUp);

	dibujaImagen();
}

function procesaImagen(){
	imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	var pixelArray = imageData.data;
	for(var i = 0; i<pixelArray.length; i+=4){
		var red = pixelArray[i];
		var green = pixelArray[i + 1];
		var blue = pixelArray[i + 2];
		var alpha = pixelArray[i + 3];

		pixelArray[i] = green;
		pixelArray[i + 1] = blue;
		pixelArray[i + 2] = red;
	}
}
