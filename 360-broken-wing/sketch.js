// A game about a bird with broken wings :(
// I mean... it works?

var grav = 0.25;

var boundarySize = 550;
var boundaryGrd = 150;

var rounds = -1;
var crossline = 180;
var hasCrossed = false;
var dangerZones = [];

let pMain;

class poorBird {
  #flapCount = 0;

  constructor() {
    this.slowness = 50;
    this.diameter = 500;
    this.x = 0;
    this.y = 0;
    this.size = 30;
    this.jumpVel = 4;
    this.fallVel = 0;
    this.t = 0;
    this.#flapCount = 0;
  }
  getFlapCount() {
    return this.#flapCount;
  }
  getNormalizedPosition() {
    return {
      x: sin(this.t / this.slowness),
      y: cos(this.t / this.slowness),
    };
  }
  getPosAngle(){
    const normalized = this.getNormalizedPosition();
    return 360 - findVector(normalized.x, normalized.y);
  }
  jump() {
    this.fallVel = -Math.abs(this.jumpVel);
    this.#flapCount++;
  }
  update() {
    this.fallVel += grav;
    this.diameter -= this.fallVel;
    this.diameter = Math.max((boundaryGrd/2) + (this.size/2), this.diameter);
    
    if (this.diameter > (boundarySize/2)-(this.size/2)) {
      this.fallVel = 0;
      this.diameter = (boundarySize/2)-(this.size/2);
    }
  
    this.t += 1;

    const normalized = this.getNormalizedPosition();
    this.y = normalized.y * this.diameter;
    this.x = normalized.x * this.diameter;
  }
  show() {
    stroke("Black");
    strokeWeight(this.size / 6);
    circle((width/2) + this.y, (height/2) + this.x, this.size); 
  }
}
class Pillar {
  constructor(angl, passThroug = 0, gahH=90, weigh=15){
    this.angle = angl;
    this.passThrough = passThroug;
    this.gapHeight = gahH;
    this.weight = weigh;
    this.gapStartX = 0;
    this.gapStartY = 0;
    this.gapEndX = 0;
    this.gapEndY = 0;
  }
  update() {
    const pos = findPos(this.angle); // Get the position based on the angle
    // this.gLine = generateCrossline(pos); // Generate the pillar line coordinates
  
    // Calculate the offset for the gap based on the angle
    const offsetX = pos.x * this.passThrough; // Offset in the x direction
    const offsetY = pos.y * this.passThrough; // Offset in the y direction
    
    // Calculate the start and end points of the gap
    this.gapStartX = (pos.x * (boundaryGrd / 2)) + (width / 2) + offsetX;
    this.gapStartY = (pos.y * (boundaryGrd / 2)) + (height / 2) + offsetY;
    this.gapEndX = this.gapStartX + (pos.x * this.gapHeight);
    this.gapEndY = this.gapStartY + (pos.y * this.gapHeight);
  }
  show(){
    // Draw the main pillar (red line)
    strokeWeight(this.weight);
    // stroke(255, 0, 0);
    // line(this.gLine[0], this.gLine[1], this.gLine[2], this.gLine[3]);
    // Draw the this.gap (white line)
    stroke("red");
    line(this.gapStartX, this.gapStartY, this.gapEndX, this.gapEndY);
  }
}
function findPos(angle){
  const radians = (angle + 90) * (Math.PI / 180); // Convert degrees to radians
  return {
    x: Math.cos(radians),
    y: Math.sin(radians),
  };
}
function findVector(x, y){
  let value;

  const findQuadrant =function(x, y) {
    if (x > 0 && y > 0) {
      return 1;
    } else if (x < 0 && y > 0) {
      return 2;
    } else if (x < 0 && y < 0) {
      return 3;
    } else if (x > 0 && y < 0) {
      return 4;
    }
  }
  
  if (x === 0 && y == 0) {
    return NaN;
  } else if (x === 0) {
    if (y > 0) {
      value = Math.PI / 2.0;
    } else if (y < 0) {
      value = Math.PI * 1.5;
    }
  } else if (y === 0) {
    if (x > 0) {
      value = Math.PI;
    } else if (x < 0) {
      value = 0;
    }
  } else {
    value = Math.atan(y / x);
    switch (findQuadrant(x, y)) {
      case 1:
        value = Math.abs(value);
        break;
      case 2:
        value = Math.PI - Math.abs(value);
        break;
      case 3:
        value = Math.PI + Math.abs(value);
        break;
      case 4:
        value = (Math.PI * 2.0) - Math.abs(value);
        break;
      }
    }
    return value * (180.0 / Math.PI);
  }
function generateCrossline(normalizedPos){
  return [
    (normalizedPos.x * (boundaryGrd/2)) + (width/2),
    (normalizedPos.y * (boundaryGrd/2)) + (height/2),
    (normalizedPos.x * (boundarySize/2)) + (width/2),
    (normalizedPos.y * (boundarySize/2)) + (height/2)
  ]
}
function showPillar(angle = 359, passThrough = 0, gapHeight = 100, weight = 15) {
  const pos = findPos(angle); // Get the position based on the angle
  const gLine = generateCrossline(pos); // Generate the pillar line coordinates

  // Draw the main pillar (red line)
  strokeWeight(weight);
  stroke(255, 0, 0);
  line(gLine[0], gLine[1], gLine[2], gLine[3]);

  // Calculate the offset for the gap based on the angle
  const offsetX = pos.x * passThrough; // Offset in the x direction
  const offsetY = pos.y * passThrough; // Offset in the y direction

  // Calculate the start and end points of the gap
  const gapStartX = (pos.x * (boundaryGrd / 2)) + (width / 2) + offsetX;
  const gapStartY = (pos.y * (boundaryGrd / 2)) + (height / 2) + offsetY;
  const gapEndX = gapStartX + (pos.x * gapHeight);
  const gapEndY = gapStartY + (pos.y * gapHeight);

  // Draw the gap (white line)
  stroke("white");
  line(gapStartX, gapStartY, gapEndX, gapEndY);
}
function showCrossline(cross = crossline, weight = 15, opacity = 255/4){
  const pos = findPos(cross);
  const gLine = generateCrossline(pos);

  strokeWeight(weight);
  stroke(0,0,0,opacity);

  line(gLine[0],gLine[1],gLine[2],gLine[3])
}
function showInfo() {
  fill("white");
  textSize(60);
  textAlign(CENTER);
  
  if (pMain.getPosAngle() > crossline && !hasCrossed){
    rounds++;
    hasCrossed = true;
  } else if (pMain.getPosAngle() < crossline){
    hasCrossed = false;
  }

  noStroke();
  text(`${rounds}`, width/2, height/2);
}

let pill;

function setup() {
  createCanvas(700, 600);
  frameRate(60);
  pMain = new poorBird();

  pill = new Pillar(90, 90);
  dangerZones.push(pill);
}

function draw() {
  background("blue");
  rectMode(CENTER);  
  noStroke();
  
  fill("white");
  circle(width/2, height/2, boundarySize);
  
  dangerZones.forEach(function(p){
    p.update();
    p.show();
    if (isBirdInGap(pMain, p)) {
      isHit();
    }
  });
  
  noStroke();
  fill("blue");
  circle(width/2, height/2, boundaryGrd);
  
  showInfo();
  showCrossline();
  
  pMain.update();
  pMain.show();
}
function isHit(){
  print("I'm hit!")
}
function isBirdInGap(bird, pillar) {
  // Normalize the bird's position relative to the center
  const birdDistance = bird.diameter;

  var offset = 1.5;
  // Check if the bird's distance is within the pillar's gap
  const withinGap =
    birdDistance > pillar.passThrough*offset &&
    birdDistance < (pillar.passThrough + pillar.gapHeight)*offset;

  // Check if the bird's angle is approximately equal to the pillar's angle
  const withinAngle = Math.abs(bird.getPosAngle() - pillar.angle) < 2.0;

  // Return true if both conditions are met
  return withinGap && withinAngle;
}
function keyPressed(event){
  if (keyCode == 32){
    pMain.jump();
  }
}