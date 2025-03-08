let squSize = 80;
let squX = 0;
let squY = 0;
let velX = 0;
let velY = 0;
let spd = 5;
let inputIdex = new Array(0, 1, 2, 3);
let cirX = 0;
let cirY = 0;
let cirScope = 30;

function setup() {
  const myCanvas = createCanvas(650, 550);
  myCanvas.parent('the-canvas');
  
  squX = width/2;
  squY = height/2;
  randCir();
}
function draw()
{
  rectMode(CENTER);
  background(255/2);
  loopAround();
  circle(cirX, cirY, squSize/2);

  let playerInput = new Array(
    keyIsDown(LEFT_ARROW),
    keyIsDown(RIGHT_ARROW),
    keyIsDown(UP_ARROW),
    keyIsDown(DOWN_ARROW)
  );

  if (playerInput[inputIdex[0]]) {
    squX -= spd;
  }
  if (playerInput[inputIdex[1]]) {
    squX += spd;
  }
  if (playerInput[inputIdex[2]]) {
    squY -= spd;
  }
  if (playerInput[inputIdex[3]]) {
    squY += spd;
  }
  square(squX,squY,squSize,squSize/6);

  if (squX < cirX+cirScope && squX > cirX-cirScope && squY < cirY+cirScope && squY > cirY-cirScope) {
    randCir();
    randControls();
  }
}
function randCir() {
  cirX = random()*width;
  cirY = random()*height;
}
function randControls() {
  inputIdex = shuffle(inputIdex);
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  console.log("Shuffled array:", array); // Debugging statement
  return array; // Return the shuffled array
}
function loopAround() {
  if (squX > width + (squSize/2)){
    squX = -squSize/2;
  } else if (squX < -squSize/2) {
    squX = width + (squSize/2);
  }
  if (squY > height + (squSize/2)){
    squY = -squSize/2;
  } else if (squY < -squSize/2) {
    squY = height + (squSize/2);
  }
}
// function keyPressed(event) {
//   if (event.key == " ") {
//     randControls();
//   }
//   if (event.key == "a") {
//     randCir();
//   }
// }