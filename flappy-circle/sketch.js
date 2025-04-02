var grav = 0.7;
const spikeSize = 75;
var spikePercent = 0.25;
var spikes = [];
const spikesEas = new Array(
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 1, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 0, 1],
);
const spikesMed = new Array(
  [1, 2, 0, 2, 0, 2, 0, 0]  
  // [0, 1, 0, 1, 0, 0, 1, 0],
  // [1, 0, 1, 1, 1, 0, 0, 1],
  // [0, 1, 1, 0, 1, 0, 0, 1],
  // [1, 0, 0, 1, 0, 1, 1, 0],
  // [1, 0, 0, 1, 1, 0, 0, 1],
  // [0, 0, 1, 1, 1, 1, 0, 0],
  // [1, 1, 1, 0, 0, 1, 1, 1],
  // [1, 0, 0, 1, 0, 0, 1, 0],
  // [1, 1, 0, 1, 0, 1, 0, 0]
);
const spikesHar = new Array(
  [1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 1, 1, 1],
  [0, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 0]
);
let movingSpikes = [];

var score = 0;
var t = 14;
var difficulty = 1;

let p;
let spikeLength = 0;

const getCurrentSpikes = function(){
  switch (difficulty){
    case 1:
      return spikesEas;
      break;
    case 2:
      return spikesMed;
      break;
    case 3:
      return spikesHar;
      break;
  }
}

class Player {
  constructor() {
    this.size = 50;
    this.y = height/2;
    this.x = width/2;
    this.velY = 0;
    this.spdX = 5.5;
    this.dirX = 1;
    this.jumpHeight = -12.5;
    this.iniSpdX = this.spdX;
  }
  reset() {
    print(this.iniSpdX);
    this.spdX = this.iniSpdX;
  }
  hitWall() {
    return this.x > width-(this.size/2) || this.x < 0+(this.size/2);
  }
  increaseSpd(inc = 0.05){
    this.spdX += inc;
  }
  update() {
    this.velY += grav;
    this.y += this.velY;
    this.x += this.spdX * Math.sign(this.dirX);

    if (this.x > width-(this.size/2) || this.x < 0+(this.size/2)) {
      this.dirX = -this.dirX;
    }

    if (this.y > height-(this.size/2)) {
      this.y = height-(this.size/2);
      this.velY = 0;
    } else if (this.y < 0+(this.size/2)) {
      this.y = 0+(this.size/2);
      this.velY = 0;
    }
  }
  show() {
    circle(this.x, this.y, this.size);
  }
  jump() {
    this.velY = this.jumpHeight;
  }
}
class MovingSpike {
  constructor(pY, pX){
    this.y = pY;
    this.x = pX;
  }
  update(){
    this.y += 0.2;
  }
  show(){
    rectMode(CENTER);
    rect(this.x, this.y, spikeSize/2, spikeSize); 
  }
}
function setSpikes() {
  spikeLength = height/spikeSize;
  // for (let i = 0; i < spikeLength; i += 1) {
  //   spikes[i] = 0;
  // }
  newSpikes();
}

var areMovingSpikes = false;

function getSpikeDir(){
  return (width/2) + (p.dirX * (width/2));
}
function getSpikeY(index){
  return (spikeSize/2) + (index * spikeSize);
}

function generateSpikes(){
  // areMovingSpikes = false;
  // movingSpikes = [];

  for (let i = 0; i < spikeLength; i++) {
    rectMode(CENTER);
  
    let dir = getSpikeDir();
    let posY = getSpikeY(i);
    
    // areMovingSpikes = spikes.includes(2);

    if (spikes[i] == 1){
      rect(dir, posY, spikeSize/2, spikeSize); 
    }
    // else if (spikes[i] == 2) {
    //   print("Spike two detected")
    //   movingSpikes.push({
    //     x: dir,
    //     y: posY
    //   });
    // }
    
    // if (areMovingSpikes){
    //   // areMovingSpikes = spikes[i] == 2
    // }
  }
}
function areMenerateMovingSpikes(){

}
function newSpikes() {
  let entry = [];
  movingSpikes = [];

  if (t < 15){
    entry = spikesEas[floor(random() * spikesEas.length)];
    difficulty = 1;
  } else if (t < 40){
    entry = spikesMed[floor(random() * spikesMed.length)];
    difficulty = 2;
    // print("selected")
  } else {
    entry = spikesHar[floor(random() * spikesHar.length)];
    difficulty = 3;
  }
  
  if (random() > 1/2){
    spikes = Array.from(entry.reverse());
  } else {
    spikes = Array.from(entry);
  }
  
  areMovingSpikes = spikes.includes(2);

  if (areMovingSpikes){
    for (let i = 0; i < spikeLength; i++) {
      if (spikes[i] == 2) {
        print("Spike two detected");
        
        let dir = getSpikeDir();
        let posY = getSpikeY(i);

        let movingSpike = new MovingSpike(posY, dir);

        movingSpikes.push(movingSpike);
        // movingSpikes.push({
        //   x: dir,
        //   y: posY
        // });
      }
    }
  }
}
function gameLoop(){
  t += 1/60;
  textAlign(CENTER);
  fill(0,0,0,0.5*255);
  textSize(60);
  text(`${score}`, width/2, height/2);
  text(`${Math.floor(t)}`, width/2, (height/2)+100)
}
function setup() {
  createCanvas(700, 600);
  frameRate(60);
  p = new Player();
  setSpikes();
}



function draw() {
  background(127, 127, 55);
  rectMode(CENTER);
  gameLoop();
  fill("white");
  generateSpikes();

  if (areMovingSpikes){
    movingSpikes.forEach((spike) => {
      spike.update();
      spike.show();
    });
  }

    // spikes.forEach(function(spike){
    //   // let currentSpikes = getCurrentSpikes();

    //   for (let i = 0; i < spikes.length; i++){
    //     if (spikes[i] == 2){
    //       let dir = getSpikeDir();
    //       let posY = getSpikeY(i);

    //       posY += 100;

    //       rect(dir, posY, spikeSize/2, spikeSize); 
    //     }
    //   }
    // })

  p.update();
  p.show();
  if (p.hitWall()) {
    wallHit();
  }
}
function checkHitSpikes(atPosY) {
  if (spikeLength > 0) {
    for (let i = 0; i < spikeLength; i++) {
      // Check for static spikes
      if (spikes[i] == 1 &&
        atPosY > i * spikeSize &&
        atPosY < (i * spikeSize) + spikeSize
      ) {
        return true;
      }

      // Check for moving spikes
      if (spikes[i] == 2) {
        for (let spike of movingSpikes) {
          // print(spike.y, atPosY, spike.y + spikeSize, atPosY > spike.y && atPosY < spike.y + spikeSize);

          if (
            atPosY > spike.y &&
            atPosY < spike.y + spikeSize
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
}
// function checkHitSpikes(pos){
//   if (spikeLength > 0){
//     for (let i = 0; i < spikeLength; i++){
//       if (spikes[i] == 1 && pos > i * spikeSize && pos < (i * spikeSize)+spikeSize){
//         return true;
//       }
//       if (spikes[i] == 2){
//         movingSpikes.forEach(function(spike){
//           if (pos > spike.y && pos < spike.y + spikeSize){
//             return true;
//           }
//         })
//       }
//     }
//     return false;
//   }
// }
function wallHit() {
  if (!checkHitSpikes(p.y)){
    p.increaseSpd();
    addScore();
  } else {
    gameOver();
  }
  newSpikes();
}
function addScore(num = 1) {
  score += num;
  // print(score);
}
function gameOver(){
  t = 0;
  score = 0;
  p.reset();
}
function mousePressed() {
  p.jump();
}
function keyPressed() {
  if (keyCode == 32){
    p.jump();
  }
}
