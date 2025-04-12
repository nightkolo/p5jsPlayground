// A game about a bird with broken wings :(

// TODO: needs refactoring

const grav = 0.25;

const boundarySize = 550;
const boundaryGrd = 150;

var rounds = -1;
var ringsPassed = 0;
var crossline = 180;
var crosslineSpd = 1;

var hasCrossed = false;
var hasJustPassedRing = false;

let pMain;
let blessedZones = [];

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
  getAngle() {
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
  constructor(pAngle, pPassThrough = 0, pRingH = 90) {
    this.angle = pAngle;
    this.passThrough = pPassThrough;
    this.ringH = pRingH;
    this.ringX1 = 0;
    this.ringY1 = 0;
    this.ringX2 = 0;
    this.ringY2 = 0;
  }
  update() {
    // God bless, trigonometry
    
    // Gets ring's position based on the angle
    const pos = findPos(this.angle);

    // Calculates an offset for the ring based on the position
    const offsetX = pos.x * this.passThrough;
    const offsetY = pos.y * this.passThrough;
    
    // Calculate the start and end points of the ring line
    this.ringX1 = (pos.x * (boundaryGrd / 2)) + cen().x + offsetX;
    this.ringY1 = (pos.y * (boundaryGrd / 2)) + cen().y + offsetY;
    this.ringX2 = this.ringX1 + (pos.x * this.ringH);
    this.ringY2 = this.ringY1 + (pos.y * this.ringH);
  }
  show() {
    strokeWeight(10);
    stroke("red");
    line(this.ringX1, this.ringY1, this.ringX2, this.ringY2);
  }
}

// Environment
function showCrossline(cross = crossline, weight = 15, opacity = 255/4) {
  const pos = findPos(cross);

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
  
  if (pMain.getAngle() > crossline && !hasCrossed) {
    birdPassedCrossline();
  } else if (pMain.getAngle() < crossline) {
    hasCrossed = false;
  }

  noStroke();
  text(`${rounds}`, cen().x, cen().y-10);
  text(`${ringsPassed}`, cen().x, cen().y+60);
}

// p5.js
function setup() {
  createCanvas(700, 600);
  frameRate(60);
  pMain = new PoorBird();

  generateRings();
}
function draw() {
  background("blue");
  rectMode(CENTER);  
  noStroke();
  
  crossline -= crosslineSpd/10;
  if (crossline < 0) {
    crossline = 360;
  }

  fill("white");
  circle(cen().x, cen().y, boundarySize);
  
  blessedZones.forEach(function(p) {
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
function keyPressed() {
  if (keyCode == 32) {
    pMain.jump();
  }
}
function mousePressed() {
  pMain.jump();
}

// Game loop
function generateRings() {
  blessedZones = [];

  // Generates a random number of rings
  const numRings = Math.floor(random(3, 7));

  for (let i = 0; i < numRings; i++) {
    // Positions the rings evenly.
    const angle = (360/numRings) * i;

    // Randomizes the passThrough distance
    const passThrough = random(boundarySize/16, boundarySize / 4);

    // Randomizes the ring height
    const ringHeight = random(40, 100);

    const newRing = new Ring(angle, passThrough, ringHeight);
    blessedZones.push(newRing);
  }
}
function birdPassedCrossline() {
  rounds++;
  hasCrossed = true;
  generateRings();
}
function birdPassedRing(isRing) {
  if (!hasJustPassedRing) {
    ringsPassed++;
    hasJustPassedRing = true;

    setTimeout(() => {
      hasJustPassedRing = false;
    }, 500);
  }
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
