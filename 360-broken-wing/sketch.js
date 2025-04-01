// A game about a bird with broken wings :(
// I mean... it works?
// If some functions look copilot-generated, that's because they are.
// It is only the functions with comments in them though, but the other parts of the code and the entire algorithm are my own work

const grav = 0.25;

const boundarySize = 550;
const boundaryGrd = 150;

var rounds = -1;
var ringsPassed = 0;
var crossline = 180;

var hasCrossed = false;
var hasJustPassedRing = false;
var blessedZones = [];

const cen = function(){
  return {
    x: width / 2,
    y: height / 2,
  };
}

let pMain;

class PoorBird {
  constructor() {
    this.slowness = 50;
    this.diameter = 500;
    this.x = 0;
    this.y = 0;
    this.size = 30;
    this.jumpVel = 4;
    this.fallVel = 0;
    this.t = 0;
  }
  getNormalizedPos() {
    return {
      x: sin(this.t / this.slowness),
      y: cos(this.t / this.slowness),
    };
  }
  getAngle(){
    const normal = this.getNormalizedPos();
    return 360 - findVector(normal.x, normal.y);
  }
  jump() {
    this.fallVel = -Math.abs(this.jumpVel);
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
    
    const normal = this.getNormalizedPos();
    this.y = normal.y * this.diameter;
    this.x = normal.x * this.diameter;
  }
  show() {
    stroke("Black");
    strokeWeight(this.size / 6);
    circle(cen().x + this.y, cen().y + this.x, this.size); 
  }
}
class Ring {
  constructor(pAngle, pPassThrough = 0, pRingH = 90){
    this.angle = pAngle;
    this.passThrough = pPassThrough;
    this.ringH = pRingH;
    this.ringX1 = 0;
    this.ringY1 = 0;
    this.ringX2 = 0;
    this.ringY2 = 0;
  }
  update() {
    const pos = findPos(this.angle); // Get the position based on the angle

    // Calculate the offset for the ring based on the angle
    const offsetX = pos.x * this.passThrough; // Offset in the x direction
    const offsetY = pos.y * this.passThrough; // Offset in the y direction
    
    // Calculate the start and end points of the ring
    this.ringX1 = (pos.x * (boundaryGrd / 2)) + cen().x + offsetX;
    this.ringY1 = (pos.y * (boundaryGrd / 2)) + cen().y + offsetY;
    this.ringX2 = this.ringX1 + (pos.x * this.ringH);
    this.ringY2 = this.ringY1 + (pos.y * this.ringH);
  }
  show() {
    strokeWeight(10);
    // Draw the ring (red line)
    stroke("red");
    line(this.ringX1, this.ringY1, this.ringX2, this.ringY2);
  }
}
// Math helpers
function findPos(angle){
  const rad = (angle + 90) * (Math.PI / 180);
  return {
    x: Math.cos(rad),
    y: Math.sin(rad),
  };
}
function findVector(x, y){
  let value = 0;

  const findQuadrant = function(x, y) {
    if (x > 0 && y > 0) {return 1; }
    else if (x < 0 && y > 0) {return 2; }
    else if (x < 0 && y < 0) {return 3; }
    else if (x > 0 && y < 0) {return 4; }
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
    switch (findQuadrant(x, y)) {
      case 1:
        value = Math.abs(Math.atan(y / x));
        break;
      case 2:
        value = Math.PI - Math.abs(Math.atan(y / x));
        break;
      case 3:
        value = Math.PI + Math.abs(Math.atan(y / x));
        break;
      case 4:
        value = (Math.PI * 2.0) - Math.abs(Math.atan(y / x));
        break;
      }
    }
    return value * (180.0 / Math.PI);
  }
// function generateCrossline(normalizedPos){
//   return [
//     (normalizedPos.x * (boundaryGrd/2)) + (cen().x),
//     (normalizedPos.y * (boundaryGrd/2)) + (cen().y),
//     (normalizedPos.x * (boundarySize/2)) + (cen().x),
//     (normalizedPos.y * (boundarySize/2)) + (cen().y)
//   ]
// }
// function showring(angle = 359, passThrough = 0, ringH = 100, weight = 15) {
//   const pos = findPos(angle);
//   const gLine = generateCrossline(pos); 

//   strokeWeight(weight);
//   stroke(255, 0, 0);
//   line(gLine[0], gLine[1], gLine[2], gLine[3]);

//   const offsetX = pos.x * passThrough; 
//   const offsetY = pos.y * passThrough;

//   const ringX1 = (pos.x * (boundaryGrd / 2)) + (cen().x) + offsetX;
//   const ringY1 = (pos.y * (boundaryGrd / 2)) + (cen().y) + offsetY;
//   const ringX2 = ringX1 + (pos.x * ringH);
//   const ringY2 = ringY1 + (pos.y * ringH);

//   stroke("white");
//   line(ringX1, ringY1, ringX2, ringY2);
// }

// Environment
function showCrossline(cross = crossline, weight = 15, opacity = 255/4){
  const pos = findPos(cross);
  // const gLine = generateCrossline(pos);

  strokeWeight(weight);
  stroke(0,0,0,opacity);

  line(
    (pos.x * (boundaryGrd/2)) + (cen().x),
    (pos.y * (boundaryGrd/2)) + (cen().y),
    (pos.x * (boundarySize/2)) + (cen().x),
    (pos.y * (boundarySize/2)) + (cen().y))
}
function showInfo() {
  fill("white");
  textSize(60);
  textAlign(CENTER);
  
  // TODO: maybe refactor this glue and butter stitched together code
  if (pMain.getAngle() > crossline && !hasCrossed){
    rounds++;
    hasCrossed = true;
  } else if (pMain.getAngle() < crossline){
    hasCrossed = false;
  }

  noStroke();
  text(`${rounds}`, cen().x, cen().y);
}

// p5.js
let pill;
let pill2;

function setup() {
  createCanvas(700, 600);
  frameRate(60);
  pMain = new PoorBird();

  pill = new Ring(90, 90, 30);
  pill2 = new Ring(270, 0);

  blessedZones.push(pill);
  blessedZones.push(pill2);
}
function draw() {
  background("blue");
  rectMode(CENTER);  
  noStroke();
  
  fill("white");
  circle(cen().x, cen().y, boundarySize);
  
  blessedZones.forEach(function(p){
    p.update();
    p.show();
    if (isBirdInRing(pMain, p)) {
      birdPassedRing(p);
    }
  });
  
  noStroke();
  fill("blue");
  circle(cen().x, cen().y, boundaryGrd);
  
  showInfo();
  showCrossline();
  
  pMain.update();
  pMain.show();
}
// Player input
function keyPressed(event){
  if (keyCode == 32){
    pMain.jump();
  }
}
// Game loop
function birdPassedRing(isRing){
  // print("A ring has been passed!");

  // TODO: add ringPassed timeout
  // if (!hasJustPassedRing){
  ringsPassed++;
  hasJustPassedRing = true;
  // }
  // } else if (hasJustPassedRing && Math.abs(pMain.getAngle() - isRing.angle) > 4.0){
  //   hasJustPassedRing = false;
  // }
  print(ringsPassed);
}
function isBirdInRing(bird, ring) {
  // Apparently, I've fucked up the way measurements are handled in the code so much that pMain.diameter =/= ring.passThrough
  // the variable offset troubleshoots this
  // ...Sigh
  const offset = 1.6;
  const threshold = 2.0;

  const withinRing = bird.diameter > ring.passThrough * offset && bird.diameter < (ring.passThrough + ring.ringH) * offset;

  const withinAngle = Math.abs(bird.getAngle() - ring.angle) < threshold;

  return withinRing && withinAngle;
}