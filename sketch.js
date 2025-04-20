//dictating which 'stage' of the game we are in, changes the tilemaps and displayed assets
let currentGameState = 0;

//essential to centre all activity on the screen, regardless of screen size
let newMouseX;
let newMouseY;

//defining the tile map
//a 2D array containing each instance of the Tile Class we create
let BGtileMap = [];
//How many tiles there are in a row
let BGtilesX = 5;
//How many tiles there are in a column
let BGtilesY = 3;
//The pixel height and width of a single tile (they are the same as it is a square) - we have chosen a 16x16 tile style for our game
let BGtileSize = 256;
let tileImage;

let BGlivingRoomMap = [
  [0, 1, 2],
  [0, 1, 2],
  [0, 1, 2],
  [0, 1, 2],
  [0, 1, 2]
]

class backgroundTile {
  //defining the aspects that each instance of the class will contain
  constructor(tileX, tileY, tileSize, tileID, TileImage) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.tileSize = tileSize;
    this.tileID = tileID;
    this.xPos = this.tileX * this.tileSize;
    this.yPos = this.tileY * this.tileSize;
    this.tileImage = tileImage
  }

  displayTile() {
    image(this.tileImage, this.xPos, this.yPos, this.tileSize, this.tileSize)
  }
}


//preload assets here to speed up programe running
function preload() {

  //background tiles
  BGwallpaper = loadImage("assets/BG_Wallpaper.png")
  BGpanellingLower = loadImage("assets/BG_PanellingLower.png")
  BGpanellingUpper = loadImage("assets/BG_PanellingUpper.png")

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

  BGinside()

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black')
}

//anything to do with clicking the mouse - tracking it's position, recording interaction, playing noise etc
function mouseClicked() {

}

function BGinside() {


  let tileID = 0
  //iterate through each row of tiles
  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    //create a new array within the tileMap array, corresponding to each row in the on-screen tileMap
    BGtileMap[tileX] = []

    //iterate through each column of tiles within a row
    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      if (BGlivingRoomMap[tileX][tileY] == 0) {
        tileImage = BGwallpaper
      } else if (BGlivingRoomMap[tileX][tileY] == 1) {
        tileImage = BGpanellingUpper
      } else if (BGlivingRoomMap[tileX][tileY] == 2) {
        tileImage = BGpanellingLower
      }

      BGtileMap[tileX][tileY] = new backgroundTile(tileX, tileY, BGtileSize, tileID, tileImage)
      tileID++

    }
  }
}

function draw() {
  background('black')
  currentGameState = 2 //inside
  //Calculates new mouse coordinates based on center of screen instead of default top left corner, thus allowing coordinates to remain same regardless of window resizing - crucial when calculating mouse click position across different window sizes
  newMouseX = mouseX - (windowWidth/2)
  newMouseY = mouseY - (windowHeight/2)

  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      BGtileMap[tileX][tileY].displayTile()
    }
  }

  fill('white')
  text(newMouseX, mouseX+50, mouseY)
  text(newMouseY, mouseX+50, mouseY + 10)
}
