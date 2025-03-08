let ballSize = 50;
let ballX = 0;
let ballY = 0;
let ballSpdX = 5;
let ballSpdY = 5;
let ballSpawn = 100;

let pWallX = 0;
let pWallY = 0;
let pWallSizeX = 100;
let pWallSizeY = 30;
let pHelp = 20;

let isOut = false;
let isGameOver = false

let playerSpd = 7.5;
let difficulty = 0.05;
let score = 0;

let roundTo = 2;

// function preload() {
//   font = loadFont("assets/Nunito-SemiBold.ttf");
// }
function setup() {
  const myCanvas = createCanvas(600,500);
  myCanvas.parent('the-canvas')

  newGame();
  pWallX = width/2
  pWallY = height-(pWallSizeY/2)
}
function draw() {
  background(15);
  fill(255);
  rectMode(CENTER);
  textSize(32);
  textAlign(LEFT, TOP);
  // textFont(font);
  text(`ballX: ${ballX.toFixed(roundTo)}`, 30, 30);
  text(`ballY: ${ballY.toFixed(roundTo)}`, 30, 30+30);
  text(`pWallX: ${pWallX.toFixed(roundTo)}`, 30, 30+60);
  text(`pWallY: ${pWallY.toFixed(roundTo)}`, 30, 30+90);
  text(`ballSpdX: ${ballSpdX.toFixed(roundTo)}`, 30, 30+120);
  text(`ballSpdY: ${ballSpdY.toFixed(roundTo)}`, 30, 30+150);
  
  textAlign(RIGHT, TOP);
  text(`Score: ${score}`, width-30, 30);

  ballX += ballSpdX;
  ballY += ballSpdY;

  // Hit X corners
  if (ballX > width-(ballSize/2) || ballX < 0+(ballSize/2)) {
    cornerHit("x")
  }
  // Hit Top
  if (ballY < 0+(ballSize/2)) {
    cornerHit("y");
  }
  // Hit Bottom
  if (ballY > height-(ballSize/2)-pWallSizeY && isOut == false) {
    // Hit Player wall
    if (ballX > pWallX-(pWallSizeX/2)-pHelp && ballX < pWallX+(pWallSizeX/2)+pHelp) {
      cornerHit("y")
    } else {
      gameOver();
    }
    isOut = true;
  }
  if (isOut) {
    if (ballY < height-100) {
      isOut = false;
    } else if (ballY > height+100) {
      ballSpdX = 0;
      ballSpdY = 0; 
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    pWallX += playerSpd;
  }
  if (keyIsDown(LEFT_ARROW)) {
    pWallX -= playerSpd;
  }
  if (pWallX > width) {
    pWallX = 0;
  } else if (pWallX < 0) {
    pWallX = width;
  }

  rect(pWallX,pWallY, pWallSizeX, pWallSizeY);
  circle(ballX, ballY, ballSize);
}
function cornerHit(whichCorner = "x") {
  addScore(1);

  if (whichCorner === "x") {
    ballSpdX = -1 * ballSpdX;
  } else if (whichCorner === "y") {
    ballSpdY = -1 * ballSpdY;
  }

  ballSpdX += difficulty * Math.sign(ballSpdX);
  ballSpdY += difficulty * Math.sign(ballSpdY);
}
function addScore(num = 1) {
  score += num;
}
function newGame() {
  score = 0;
  ballSpdX = 5 * Math.sign(Math.random() - 0.5);
  ballSpdY = 5;
  ballX = ballSpawn + ((width - (ballSpawn*2))*Math.random());
  ballY = height/8;
}
function gameOver() {
  isGameOver = true;
  console.log("Game over!");
  console.log("Press 'space' to play again");
}
function keyPressed(event) {
  if (event.key == " " && isGameOver) {
    newGame()
    isGameOver = false
  }
}