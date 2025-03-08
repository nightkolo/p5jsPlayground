let houseX = 200;
let houseY = 170;

let housePosX, housePosY;
let roofX, roofY;

let windowPos;

function setup() {
  myCanvas = createCanvas(700,500);
  myCanvas.parent("the-canvas");

  housePosY = (height/2)+2
  housePosX = width/2
  houseX = random(200, 250);
  roofX = random(1, 100);
  roofY = random(1, 100);
  windowPos = Math.sign(random()-0.5) * houseX/4;
}
function draw() {
  background(255/2,255/2,255);
  rectMode(CENTER);

  fill(255/8,255,255/8);
  ellipse(width/2, height, width*3, height/1.5);

  fill("white");
  rect(housePosX, housePosY, houseX, houseY);

  fill("brown");
  triangle(housePosX-(houseX/2)-roofX,
    housePosY-(houseY/2),
    housePosX,
    housePosY-houseY-roofY,
    housePosX+(houseX/2)+roofX,
    housePosY-(houseY/2));

  fill("silver")
  square(housePosX+(windowPos), housePosY, 50)

  // rectMode(BOTTOM);
  // rect(housePosX, housePosY+(houseY/2), 20, 40);
}