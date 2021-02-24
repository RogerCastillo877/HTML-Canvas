window.onload = function(){
	init();
}

var canvas, context;

function init(){
	var contenedor = document.getElementById("contenedor");

	if(Modernizr.canvas){
		canvas = document.createElement("canvas");
		canvas.width = 600;
		canvas.height = 600;
		contenedor.appendChild(canvas);

		context = canvas.getContext("2d");

		dibujaRecs();
		dibujaLineas();
		dibujaCircs();
	}else{
		contenedor.innerHTML = "El navegador no soporta canvas";
	}

}

function dibujaRecs(){
	context.strokeStyle = "white";
	context.lineWidth = 2;
	context.fillStyle = "rgb(0, 128, 128)";

	context.fillRect(240, 30, 80, 20);
	context.strokeRect(260, 20, 100, 40);

	context.fillStyle = "rgba(0, 0, 128, 0.8)";
	context.fillRect(300, 30, 80, 20);
}


function dibujaLineas(){
	context.strokeStyle = "#ff0000";
	context.lineWidth = 2;

	context.beginPath();
	for(var i=0; i<6; i++){
		context.moveTo(0, i*20 + canvas.height/3);
		context.lineTo(canvas.width, i*20 + canvas.height/3);
	}
	context.stroke();

	context.beginPath();
	context.moveTo(150, 100);
	context.lineTo(250, 200);
	context.lineTo(380, 100);
	context.lineTo(420, 250);
	context.lineTo(360, 150);
	context.lineTo(220, 220);
	context.fill();

	context.save();
	addEsquina();
	context.translate(30, 50);
	context.rotate(Math.PI / 8);
	context.lineCap = "round";
	context.lineJoin = "bevel";
	addEsquina();
	context.translate(30, 50);
	context.rotate(Math.PI / 8);
	context.lineCap = "square";
	context.lineJoin = "round";
	addEsquina();
	context.restore();
}

function addEsquina(){
	context.lineWidth = 10;
	context.beginPath();
	context.moveTo(20, 20);
	context.lineTo(120, 20);
	context.lineTo(120, 80);
	context.stroke();
}


function dibujaCircs(){
	context.strokeStyle = "#ff0000";
	context.lineWidth = 4;
	context.fillStyle = "rgb(0, 250, 128)";
	context.beginPath();
	context.arc(250, 170, 30, 0, Math.PI * 2);

	context.fill();
	context.stroke();
}
