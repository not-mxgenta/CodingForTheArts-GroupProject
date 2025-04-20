//dictating which 'stage' of the game we are in, changes the tilemaps and displayed assets
let currentGameState = 0;

//essential to centre all activity on the screen, regardless of screen size
let newMouseX;
let newMouseY;

//preload assets here to speed up programe running
function preload() {

}

//general set up
function setup() {
  //dynamically resizing window (see also windowResized())
  createCanvas(windowWidth, windowHeight);
  //working in degrees because, and I'll say it 100 times again, radians SUCK
  angleMode(DEGREES)
  //draw images and shapes from their center
  imageMode(CENTER)
  rectMode(CENTER)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black')
}

//anything to do with clicking the mouse - tracking it's position, recording interaction, playing noise etc
function mouseClicked() {

}

function draw() {
  background('black')
  //Calculates new mouse coordinates based on center of screen instead of default top left corner, thus allowing coordinates to remain same regardless of window resizing - crucial when calculating mouse click position across different window sizes
  NewmouseX = mouseX - (windowWidth/2)
  NewmouseY = mouseY - (windowHeight/2)
  fill('white')
  text(NewmouseX, mouseX+50, mouseY)
  text(NewmouseY, mouseX+50, mouseY + 10)
}
