const large_circle_size = 20;
const small_circle_size = 40;

let cenX;
let cenY;

let cirSize = 100;
let amp = 100;
let speed = 5;
let val = 0;

function setup() {
  const myCanvas = createCanvas(400, 400);
  myCanvas.parent('the-canvas');

  console.log("Kolo was here...");
  cenX = width/2;
  cenY = height/2;
}

function draw() {
  background(255,255/2,255/2);
  
  val += 0.01;
  
  circle((sin(val*speed)*amp)+cenX, (cos(val*speed)*amp)+cenX, cirSize);
  
//   rectMode(CENTER);
  
//   circle(cenX,cenY,max(min(mouseY-(height/2), height/2), 0));
//   rect(cenX, cenY, min((mouseY-height)+(height/2), 0));
  
//   ellipse(mouseX,mouseY,large_circle_size,large_circle_size);
//   ellipse(mouseX,0,small_circle_size,small_circle_size);
//   ellipse(0,mouseY,small_circle_size,small_circle_size);
  
//   line(width/2,height/2,mouseX,mouseY);
//   line(width/2,height/2,width/2,mouseY);
//   line(width/2,height/2,mouseX,height/2);
  
  
}