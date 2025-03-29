// A game about a bird with broken wings :(
// Very WIP

var grav = 0.25;

var boundarySize = 550;
var boundaryGrd = 150;

var rounds = 0;

let pMain;

class poorBird {
  #flapCount;

  constructor(){
    this.slowness = 50;
    this.diameter = 500;
    this.x = 0;
    this.y = 0;
    this.size = 30;
    this.jumpVel = 4;
    this.fallVel = 0;
    this.t = 0;
  }
  getFlapCount(){
    return this.#flapCount;
  }
  getXnormalized(){
    return sin(this.t / this.slowness);
  }
  getYnormalized(){
    return cos(this.t / this.slowness);
  }
  jump() {
    this.fallVel = -Math.abs(this.jumpVel);
    this.#flapCount++;
  }
  update(){
    this.fallVel += grav;
    this.diameter -= this.fallVel;
    this.diameter = Math.max(boundaryGrd/2 + (this.size/2), this.diameter);
    
    if (this.diameter > (boundarySize/2)-(this.size/2)) {
      this.fallVel = 0;
      this.diameter = (boundarySize/2)-(this.size/2);
    }
  
    this.t += 1;

    this.y = this.getYnormalized() * this.diameter;
    this.x = this.getXnormalized() * this.diameter;
  }
  show(){
    stroke("Black");
    strokeWeight(this.size / 6);
    circle((width/2) + this.y, (height/2) + this.x, this.size); 
  }
}

function generateEnvironment(){
  noStroke();
  
  fill("white");
  circle(width/2, height/2, boundarySize);
  
  fill("blue");
  circle(width/2, height/2, boundaryGrd);
  
  displayInfo();
}

function displayInfo(){
  fill("white");
  textSize(60);
  textAlign(CENTER);
  
  print(pMain.getXnormalized());
  // TODO: add rounds counter
  text(`${rounds}`, width/2, height/2);
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