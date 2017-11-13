/*---------------------------------------;  
*  Project        : Test task
*  Program name   : One-armed bandit
*  Author         : www.otrisovano.ru
*  Date           : 01.11.2017 
*  Purpose        : Test main animation  
*----------------------------------------;  
*/
 
/*---------------------------------------; 
*  Constructor Cylinders
*----------------------------------------; 
*/

var Cylinder = function(px, img){
	this.statusMove = "none"; 	 
	var count = 0; 
	var imgIcons = img;
	var pX = ( px * Cylinder.size *1.045 ) + Cylinder.size*0.4;
	var pY = Math.floor(Math.random()*16)*Cylinder.size;
	var size = Cylinder.size;
	var speed = 0;
	var sprite1 = Cylinder.createSp( 1.1, imgIcons, pX, pY, size );
	var sprite2 = Cylinder.createSp( 0.1, imgIcons, pX, pY, size );	

	this.start = function(){
		speed = Math.floor( Math.random()*40+5 );	
		this.statusMove = "rotate"; 
		count = 0;		  
	}
	  
	this.update = function(){	  
		sprite1.y < Cylinder.size*16 ? sprite1.y += speed : sprite1.y = speed;		   
		sprite2.y < Cylinder.size*16 ? sprite2.y += speed : sprite2.y = speed;
		count++;
		if ( count > 100 ){
			speed >0 ? speed -=0.02 : this.stop(); 			
		}   
	}

	this.stop = function(){
		var c = Math.round(Math.abs(sprite1.y/Cylinder.size));
		sprite1.y  = sprite2.y =  c * Cylinder.size; 
		this.statusMove = "none"; 		  
		speed = 0;		  
	}		    
};
 
Cylinder.createSp = function(anchY, img, pX, pY, size){
	var objSpr = game.add.sprite( pX, pY, img );
	objSpr.anchor.setTo(0, anchY); 
	objSpr.width = size;  		   
	objSpr.height = size*16;            		   
	return objSpr; 		 
}; 
 
Cylinder.arr = [];
Cylinder.size;
Cylinder.state = "none";

/*---------------------------------------; 
*  Interface vars, functions                       
*----------------------------------------; 
*/

//main interface variables
var stepWindowW, windowW, windowH;
var canvas, knob;

//resize window function
window.onresize = function(){ windowResize(); };
windowResize();  

function windowResize(){
	knob = document.getElementById("push");   
	canvas = document.getElementById("canvas");   
	windowW = document.documentElement.clientWidth;
	windowH = document.documentElement.clientHeight;
	windowW/windowH < 1.5 ?  
		(function(){  
			windowW < 900 ? stepWindowW = windowW/6 : stepWindowW = windowW/10;
			canvas.style.left = "50%";  
			canvas.style.marginLeft = - canvas.width/2 +"px";					
			knob.style.top = stepWindowW*3.83;
			knob.style.marginLeft = -50000/windowW/2;
			knob.style.width = 50000/windowW;
			knob.style.fontSize = stepWindowW*0.15; 

			knob.style.webkitTransform = 'rotate('+0+'deg)'; 
			knob.style.mozTransform    = 'rotate('+0+'deg)'; 
			knob.style.msTransform     = 'rotate('+0+'deg)'; 
			knob.style.oTransform      = 'rotate('+0+'deg)'; 
			knob.style.transform       = 'rotate('+0+'deg)'; 					
			knob.style.transform  = 'rotate('+ 0 +'deg)'; 					
		})() :
		(function(){  
			windowH < 500 ? stepWindowW = windowH/4 : stepWindowW = windowH/5 ; 
			canvas.style.marginLeft = - canvas.width - stepWindowW  + "px";					
			knob.style.top = windowH/2;
			knob.style.marginLeft = stepWindowW*2.6;
			knob.style.width = 2500/windowH + stepWindowW; 
			knob.style.fontSize = stepWindowW*0.15;
					
			knob.style.webkitTransform = 'rotate('+270+'deg)'; 
			knob.style.mozTransform    = 'rotate('+270+'deg)'; 
			knob.style.msTransform     = 'rotate('+270+'deg)'; 
			knob.style.oTransform      = 'rotate('+270+'deg)'; 
			knob.style.transform       = 'rotate('+270+'deg)'; 					
			knob.style.transform  = 'rotate('+ 270 +'deg)'; 									
		})();
	if ( game ) {
		game.width = stepWindowW*6;
		game.height = stepWindowW*4; 
	}       	   
}
 
Cylinder.size = stepWindowW;
   
/*---------------------------------------; 
*  Game variables                      
*----------------------------------------; 
*/
  
var animationTimer;   
              
var game = new Phaser.Game(
	stepWindowW*6,
	stepWindowW*4,
	Phaser.AUTO,
	'game',
	{
		preload: preload,
		create: create,
		update: update
	}
);
   
/*----------------------------------------; 
*  Preloader game assets
*----------------------------------------; 
*/
  
function preload() {
	game.load.image('icons', 'assets/icons.jpg');	
	game.load.image('imgTop', 'assets/top.png');	 
}

/*---------------------------------------; 
*  Create Elements
*----------------------------------------; 
*/  
 
function create() {
	  
	// create 5 cylinders and top img
	for (var i = 0; i < 5; i++ ){
		Cylinder.arr.push( new Cylinder(i, 'icons', stepWindowW) );
	}	 
	var imgTop = game.add.sprite( 0, 0, 'imgTop' ); 
	imgTop.width =  stepWindowW*6; 
	imgTop.height =  stepWindowW*4;

	// prepair interface to play
	var md = document.getElementById( "startLoadingDesk" );
	md.parentNode.removeChild( md ); 
	knob.style.display = "block";	  
}

/*---------------------------------------; 
*  Update Elements
*----------------------------------------; 
*/ 
 
//rotate cylinders 
function update() { 
	if ( Cylinder.state == "move" ){
		var n=0;
		Cylinder.arr.forEach( 
			function(elem){
				if ( elem.statusMove == "rotate" ){
					n++;
					elem.update();
				}						
			});     		  
		if ( n==0 ){ Cylinder.state = "none"; }  		  
	}  
}
  
//start rotation cylinders 
knob.onclick = function(){	   
	if ( Cylinder.state == "none" ){     
		Cylinder.arr.forEach( function(elem) { elem.start(); } ); 
		Cylinder.state = "move";
		animationTimer = setTimeout(stopCylinder, Math.random()*1000+2000 ); 		   
	}		      
};  
  
//stop rotation cylinders   
function stopCylinder(){
	for ( var nn = 0 ; nn< Cylinder.arr.length; nn++) {
		if ( Cylinder.arr[nn].statusMove == "rotate" ){
			Cylinder.arr[nn].stop();
			if ( Cylinder.arr[nn+1] ){ 
				animationTimer = setTimeout(stopCylinder, Math.random()*2000); 		         
			}
			break;		  
		}			
	}		 
}
	