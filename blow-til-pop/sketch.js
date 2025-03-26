var canSize = 600;
var bubbleIsBlown = false;
var bubbles = [];

let currentBub;
let bubsScores;

class Bubble {
  // What does it MEAN to be a bubble?!?!?!
  constructor(x = 0, y = 0, size = 0, blow = true) {
    this.isBlown = blow;
    this.bubX = x
    this.bubY = y
    this.bubSpeedX = 0;
    this.bubSpeedY = 0;
    this.bubInc = 0.8;
    this.bubSize = size;
    this.dir = {
      x: Math.sign(Math.random()-0.5), y: Math.sign(Math.random()-0.5)
    };
    this.speedFactor = 90;
    this.isAlive = true;
  }
  burst() {
    console.log("I'm hitting somthing!");
    this.isAlive = false;
  }
  getScore() {
    return Math.round(this.bubSize / 10);
  }
  update(){
    if (this.isAlive) {
      this.bubSpeedX = this.speedFactor/this.bubSize;
      this.bubSpeedY = (this.speedFactor-10)/this.bubSize;
  
      if (this.isBlown) {
        this.bubSize += this.bubInc;
        this.bubX = mouseX;
        this.bubY = mouseY;
      } else {
        if (this.bubX > width - (this.bubSize/2) || this.bubX < this.bubSize/2){
          this.dir.x = -1 * this.dir.x;
        }
        if (this.bubY > height - (this.bubSize/2) || this.bubY < this.bubSize/2){
          this.dir.y = -1 * this.dir.y;
        }

        this.bubX += this.dir.x * this.bubSpeedX;
        this.bubY += this.dir.y * this.bubSpeedY;
      }
    }
  }
  show(){
    if (this.isAlive) {
      circle(this.bubX, this.bubY, this.bubSize);
      textAlign(CENTER);
      textSize(5 + (this.bubSize/4));
      text(`${this.getScore()}`, this.bubX, this.bubY+1);
    }
  }
}
function getBubsScores(bubs){
  let res = 0;
  bubs.forEach(function(b) {
    res += b.getScore();
  })
  return res;
}
function bubbleHasBursted(bursted_bub){
  bubbles = bubbles.filter(bubble => bubble !== bursted_bub);
}
function setup() {
  createCanvas(canSize, canSize);
  frameRate(60);
  firstBubble = new Bubble(width/2, height/2, 30, false);
  bubbles.push(firstBubble)
}
function draw() {
  background(220);
  
  bubbles.forEach(function(bub) {
    bub.update();
    bub.show();
  })

  if (bubbleIsBlown){
    bubbles.forEach(function(bub){
      if (currentBub !== bub) {
        if (borderCollision(currentBub.bubSize, currentBub.bubX, currentBub.bubY)) {
          bubbleHasBursted(currentBub);
          currentBub.burst();
        }
        if (circleCollision(currentBub.bubX, currentBub.bubY, currentBub.bubSize, bub.bubX, bub.bubY, bub.bubSize)) {
          bubbleHasBursted(currentBub);
          currentBub.burst();
        }
      }
    })
  }
}
function circleCollision(x1, y1, d1, x2, y2, d2) {
  let distance = dist(x1, y1, x2, y2);
  return distance <= (d1 / 2) + (d2 / 2);
}
function borderCollision(bubSize, bubX, bubY) {
  let radius = bubSize / 2;
  return (
    bubX - radius <= 0 ||  // Left border
    bubX + radius >= width ||  // Right border
    bubY - radius <= 0 ||  // Top border
    bubY + radius >= height  // Bottom border
  );
}
function mousePressed(){
  bubbleIsBlown = true;
  var newBubble = new Bubble();
  currentBub = newBubble;  
  bubbles.push(newBubble);
}
function mouseReleased(){
  bubbleIsBlown = false;
  currentBub.isBlown = false;
  bubsScores = getBubsScores(bubbles);
  console.log(bubsScores);
  console.log(bubbles);
}