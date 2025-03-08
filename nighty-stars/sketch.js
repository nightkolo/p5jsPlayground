let cirSize = 24;
let x, y, r, g, b;

function setup() {
  createCanvas(1920, 1080);
  background(15);
}

function draw() {
  r = random(255);
  g = 0;
  b = random(255);
  x = random(width);
  y = random(height);
  noStroke();
  fill(r, g, b, 100);
  circle(x, y, cirSize);
}
