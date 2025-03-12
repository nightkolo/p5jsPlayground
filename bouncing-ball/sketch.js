let cirX, cirY;
let cirSize = 90;

let cirSpdX = 7;
let dir = 1;

let cirSpdY = 0.05;
let bounce = 250;
let upDown, upDownOld;
let t = 0;

function setup() {
  createCanvas(700,500);
  cirX = width/2;
  cirY = height/2;
  background(15);
}
function draw() {
  // bounce = Math.abs(mouseY-height);
  upDownOld = upDown;
  upDown = sin(t * cirSpdY) * bounce;

  if (cirX+(cirSize/2) > width || cirX-(cirSize/2) < 0) {
    dir = -1 * dir;
  }
  if (Math.sign(upDown) != Math.sign(upDownOld)) {
    console.log("switched");
  }

  cirX += cirSpdX * dir;
  t += 1;
  cirY = height-(cirSize/2) - Math.abs(upDown); 
  circle(cirX, cirY, cirSize);
}
function mousePressed() {
  fill(random(255),255,random(255));
}
function keyPressed(event) {
  if (event.key === " ") {
    background(15);
  }
}