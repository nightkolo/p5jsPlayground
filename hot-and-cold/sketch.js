let r, g, b;
let inc = 0;

function setup() {
  createCanvas(600, 500);
  background(220);
}

function draw() {
  bg();

  circle(Math.abs(mouseX-width), Math.abs(mouseY-height), 40);
}

function bg() {
  r = map(mouseX, 0, width, 55, 175);
  g = map(mouseY, 0, height, 55, 175);
  inc += 0.01;
  b = 127.5 + (sin(inc)*127.5);
  
  background(r, g, b);

}