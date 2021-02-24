window.onload = function(){
	init();
}

var canvas, dibujaQuad, imageObj, imageData;

function init(){
	var contenedor = document.getElementById("contenedor");

	if(Modernizr.canvas){
		canvas = document.createElement("canvas");
		canvas.width = 640;
		canvas.height = 426;
		contenedor.appendChild(canvas);

		context = canvas.getContext("2d");

		initVideo();
	}else{
		contenedor.innerHTML = "El navegador no soporta canvas";
	}

}

function initVideo(){
    vid = document.getElementById("vid");

    //vidState = document.querySelector("video");
	angle = -1
	topOffset = 72
	leftOffset = 22
    imageWidth = 480
    imageHeight = 270
   

    tWide = imageWidth / 2;
	tHigh = imageHeight / 2;

    xOffset = imageWidth / -4;
	yOffset = imageHeight / -4;

    vid.play();

    animate();
}

function animate() {


    var dispAngle = Math.max(0,angle);
    context.clearRect(0,0,canvas.width,canvas.height);




	context.save();
	context.translate(tWide / 2 + leftOffset, tHigh / 2 + topOffset);
	context.rotate(dispAngle);
	context.drawImage(vid,0,0,tWide,tHigh,xOffset,yOffset,tWide,tHigh);
	context.restore();


	context.save();
	context.translate(tWide * 3 / 2 + leftOffset, tHigh / 2 + topOffset);
	 context.rotate(dispAngle);
	context.drawImage(vid,tWide,0,tWide,tHigh,xOffset,yOffset,tWide,tHigh);
	context.restore();


	 context.save();
	 context.translate(tWide / 2 + leftOffset, tHigh * 3 / 2 + topOffset);
	context.rotate(dispAngle);
	context.drawImage(vid,0,tHigh,tWide,tHigh,xOffset,yOffset,tWide,tHigh);
	 context.restore();


	context.save();
	context.translate(tWide * 3 / 2 + leftOffset, tHigh * 3 / 2 + topOffset);
	context.rotate(dispAngle);
	 context.drawImage(vid,tWide,tHigh,tWide,tHigh,xOffset,yOffset,tWide,tHigh);
	context.restore();
	

     angle += 0.02;
	 if (angle > Math.PI * 2){
		angle = -1;
	}

     vidTimer = setTimeout(animate, 50);


}