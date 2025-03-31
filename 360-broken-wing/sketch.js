// A game about a bird with broken wings :(
// Very WIP

var grav = 0.25;

var boundarySize = 550;
var boundaryGrd = 150;

var rounds = -1;
var crossline = 180;
var hasCrossed = false;

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

function findPos(angle){
  const radians = (angle + 90) * (Math.PI / 180); // Convert degrees to radians
  return {
    x: Math.cos(radians),
    y: Math.sin(radians),
  };
}

function findVector(x, y){
  let value;

  const findQuadrant = function(x, y) {
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
  
function showCrossline(cross = crossline, weight = 15, opacity = 255/4){
  const pos = findPos(cross);

  strokeWeight(weight);
  stroke(0,0,0,opacity);

  line(
    (pos.x * (boundaryGrd/2)) + (width/2),
    (pos.y * (boundaryGrd/2)) + (height/2),
    (pos.x * (boundarySize/2)) + (width/2),
    (pos.y * (boundarySize/2)) + (height/2)
  )
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

  text(`${rounds}`, width/2, height/2);
}

function generateEnvironment() {
  noStroke();
  
  
  fill("white");
  circle(width/2, height/2, boundarySize);
  
  fill("blue");
  circle(width/2, height/2, boundaryGrd);
  
  showInfo();
  showCrossline();
}


function setup() {
  createCanvas(700, 600);
  frameRate(60);
  pMain = new poorBird();
}

function draw() {
  background("blue");
  rectMode(CENTER);  
  generateEnvironment();
  
  pMain.update();
  pMain.show();
}

function keyPressed(event){
  if (keyCode == 32){
    pMain.jump();
  }
}