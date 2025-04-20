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
//Image asset used for each tile (self-explanatory?)
let tileImage;

//Layout of different tile types for the background of the living room
//Oriented weirdly for some reason? Wasn't harming anyone so just left it lol
let BGlivingRoomMap = [
  [0, 1, 2],
  [0, 1, 2],
  [0, 1, 2],
  [0, 1, 2],
  [0, 1, 2]
]

//Used for background tiles of any given scene
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

  //overlay video
  VHSoverlay = createVideo("assets/vhsOverlay.mp4")

  //background tiles
  BGwallpaper = loadImage("assets/BG_Wallpaper.png")
  BGpanellingLower = loadImage("assets/BG_PanellingLower.png")
  BGpanellingUpper = loadImage("assets/BG_PanellingUpper.png")

}



//Extra VHS-style effects
function frameJitter() {
  translate(random(-0.5, 0.5), random(-0.5, 0.5)); // Minor movement like VHS instability
}

function applyVHSdistortion() {
  tint(255, 255 - random(0, 10), 255 - random(0, 10)); // Flickering blue & red hues
}

function drawFlicker() {
  let flicker = random(0.9, 1.1); // Small brightness variations
  tint(255 * flicker, 255 * flicker, 255 * flicker, 200); // Apply flicker to tint
}



//general set up
function setup() {
  //dynamically resizing window (see also windowResized())
  createCanvas(windowWidth, windowHeight, WEBGL);
  //working in degrees because, and I'll say it 100 times again, radians SUCK
  angleMode(DEGREES)
  //draw images and shapes from their center
  imageMode(CENTER)
  rectMode(CENTER)

  //managing VHS video overlay
  VHSoverlay.hide();
  VHSoverlay.loop();
  VHSoverlay.volume(0);
  VHSoverlay.play()

  BGtiles()

}

//Update if window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black')
}

//anything to do with clicking the mouse - tracking it's position, recording interaction, playing noise etc
function mouseClicked() {
//nothing here yet
}


function BGtiles() {
  let tileID = 0
  
  //resets existing tile map to clean/empty map for new environment to be added
  BGtileMap = []

  //iterate through each row of tiles
  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    //create a new array within the tileMap array, corresponding to each row in the on-screen tileMap
    //clears any previously stored array in that row
    BGtileMap[tileX] = []


    //iterate through each column of tiles within a row
    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      //changes the image asset to use for the tile based on its value in the graphics map declared at the beginning
      //each environment uses a different graphics map, dictated by the current game state
      if (BGlivingRoomMap[tileX][tileY] == 0) {
        tileImage = BGwallpaper
      } else if (BGlivingRoomMap[tileX][tileY] == 1) {
        tileImage = BGpanellingUpper
      } else if (BGlivingRoomMap[tileX][tileY] == 2) {
        tileImage = BGpanellingLower
      }

      //adds new tile to tile map!
      BGtileMap[tileX][tileY] = new backgroundTile(tileX, tileY, BGtileSize, tileID, tileImage)
      tileID++

    }
  }
}

function draw() {
  background('black')
  currentGameState = 2 //inside (testing only)

  //Calculates new mouse coordinates based on center of screen instead of default top left corner, thus allowing coordinates to remain same regardless of window resizing - crucial when calculating mouse click position across different window sizes
  newMouseX = mouseX - (windowWidth/2)
  newMouseY = mouseY - (windowHeight/2)

  
  push()

  //centre tile maps in window
  translate(-BGtilesX * BGtileSize/2 + BGtileSize/2, -BGtilesY * BGtileSize/2 + BGtileSize/2, 0);

  //apply VHS effects
  drawFlicker()
  frameJitter()
  applyVHSdistortion()

  //draw each tile in current tile map
  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      BGtileMap[tileX][tileY].displayTile()
    }
  }

  //reset translations (so they don't just accumulate with every run of the draw function)
  pop()

  //not currently working :(
  fill('white')
  text(newMouseX, mouseX+50, mouseY)
  text(newMouseY, mouseX+50, mouseY + 10)


  //semi-transparent VHS-style overlay
  tint(255, 150);
  image(VHSoverlay, 0, 0, 1280, 768);
  
}
