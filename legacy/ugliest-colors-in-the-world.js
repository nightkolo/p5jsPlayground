const canSize = 600;
let cirSize = 100;
let squSize = 150;
let fontSize = 36;

let bgFills = new Array(255,255/2,255/2);
let objFills = new Array(255,255/2,255/2);

function setup() {
  const myCanvas = createCanvas(canSize,canSize);
  myCanvas.parent('the-canvas')
  fill(255,255/2,255/2);
  stroke(GRAY);
  strokeWeight(5);
}
function draw() {
  background(bgFills[0],bgFills[1],bgFills[2]);
  
  rectMode(CENTER);
  
  fill(objFills[0],objFills[1],objFills[2])
  circle(width/2, height/4, cirSize);
  circle(width/2, (height/4)*3, cirSize);
  circle(width/4, height/2, cirSize);
  circle((width/4)*3, height/2, cirSize);
  
  square(width/2,height/2,squSize);
  fill(objFills[2],objFills[1],objFills[0]);
  
  ellipse(width/2,height+40,1000,200);
  
  fill(bgFills[0]/2,bgFills[1]/2,bgFills[2]/2);
  textSize(fontSize);
  textAlign(CENTER);
  text("Click to randomize!", width/2,height/8,width,fontSize);
}

function mousePressed() {
  randomize();
}

function randomize()
{
  // const getRandCol = () => {
  //   return Math.random()*255;
  // }
  
  let randCol = new Array(
    Math.random()*255,
    Math.random()*255,
    Math.random()*255
  );
  
  for (let i = 0; i < randCol.length; i++)
  {
    objFills[i] = randCol[i];
    bgFills[i] = randCol[i];
  }
  
  strokeWeight((Math.random()*10)+2);
}