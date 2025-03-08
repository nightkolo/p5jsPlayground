
const canSize = 600;
const cirSize = 100;

let velocity_x = 0;
let velocity_y = 0;
let speed = 5;
let dir = 1;

let no_move = false;

const mainSpeed = speed;

function setup() {
  const myCanvas = createCanvas(canSize, canSize);
  myCanvas.parent('the-canvas');

  velocity_y = height/2;
}

function draw() {
  background(255/2);
  circle(velocity_x, velocity_y, cirSize);

  if (!no_move) {
    velocity_x += speed * Math.sign(dir);
  }
 
  if (velocity_x > width + (cirSize/2)){
    velocity_x = -cirSize/2;
  } else if (velocity_x < -cirSize/2) {
    velocity_x = width + (cirSize/2);
  }
}

function keyPressed(event) {
  console.log(event.key);
  
  if (!no_move)
  {
    if (event.key == " ")
    {
      dir *= -1;
    }
    if (event.key == "a")
    {
      speed = mainSpeed * 3;
    }
  }

  if (event.key == "Escape") {
    no_move = !no_move;
  }
}

function keyReleased(event) {
  if (event.key == "a")
  {
    speed = mainSpeed;
  }
}