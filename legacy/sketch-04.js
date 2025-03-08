function setup(){
  const myCanvas = createCanvas(600,600);
  myCanvas.parent('the-canvas');
}
function draw() {
  background(220);

  fill("yellow");
  circle(width/2, 150, 100);


  fill("red");
  circle(width/2, 300, 100);
}