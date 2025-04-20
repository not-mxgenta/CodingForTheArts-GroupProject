//dictating which 'stage' of the game we are in, changes the background tilemaps and any events
let currentGameState = 0;
//more specific, works within each game state i.e. may be in state 2 (inside), dictates whether in location 0 (bathroom) or location 1 (bedroom) etc.
let currentLocation = 0;
//even more specific, specifies which part of a location is the player's current focus i.e. left wall
let currentFocus = 0;

//essential to centre all activity on the screen, regardless of screen size
let newMouseX;
let newMouseY;


//defining the tile map
//2D arrays containing each instance of the Tile Class we create
let BGtileMap = [];
let NAVtileMap = [];
let OBJtileMapLayer1 = [];
let OBJtileMapLayer2 = [];
let OBJtileMapLayer3 = [];
let OBJhighlightMap = [];

//How many BG tiles there are in a row
let BGtilesX = 5;
//How many BG tiles there are in a column
let BGtilesY = 3;
//The pixel height and width of a single BG tile (they are the same as it is a square) - we have chosen a 16x16 tile style for our game
let BGtileSize = 256;
//How many overlay tiles there are in a row
let OVERLAYtilesX = 10;
//How many overlay tiles there are in a column
let OVERLAYtilesY = 6;
//The pixel height and width of a single overlay tile
let NAVtileSize = 128;
//Objects use the same amount of X and Y tiles as the BG, so reuse those variables
//Objects don't all have uniform size, so need separate variables for X and Y
let OBJsizeX;
let OBJsizeY;
//Image asset used for each tile (self-explanatory?)
let tileImage;

//initialises arrays to store objects for each room
let OBJlivingRoomArray = [];
let OBJkitchenArray = [];
let OBJhallArray = [];
let OBJbedroomArray = [];
let OBJbathroomArray = [];


//Graphics maps for each environment, dictating placement of tiles for background
//Oriented weirdly for some reason? Wasn't harming anyone so just left it lol

//Layout of different tile types for the background of the living room
let BGlivingRoomMap = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3]
]

//Layout of different tile types for the background of the kitchen
let BGkitchenMap = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
]

//Layout of different tile types for the background of the bedroom
let BGbedroomMap = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
]

//Layout of different tile types for the background of the bathroom
let BGbathroomMap = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
]

//Layout of different tile types for the background of the hallway
let BGhallwayMap = [
  [1, 1, 2],
  [1, 1, 2],
  [1, 1, 2],
  [1, 1, 2],
  [1, 1, 2]
]

//potential positions and orientations for navigation arrows
let navPosMap1 = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, -1, 0, 0]
]

//Layout of different objects in the living room
let LR_OBJarrangement_L1_1 = [
  [0, 0, 1],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

let LR_OBJarrangement_L2_1 = [
  [0, 0, 2],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

let LR_OBJarrangement_L3_1 = [
  [0, 0, 3],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]



//Used for background tiles of any given scene
class BGtileClass {
  //defining the aspects that each instance of the class will contain
  constructor(tileX, tileY, tileSize, tileID, tileImage) {
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

class OBJtileClass {
  //defining the aspects that each instance of the class will contain
  constructor(tileX, tileY, tileSizeX, tileSizeY, tileID, tileImage) {
    this.tileX = tileX;
    this.tileY = tileY;
    this.tileSizeX = tileSizeX;
    this.tileSizeY = tileSizeY;
    this.tileID = tileID;
    this.xPos = this.tileX * 256 + this.tileSizeX/4;
    this.yPos = (this.tileY - 1) * 256 + this.tileSizeY/4;
    this.tileImage = tileImage
  }

  displayTile() {
    image(this.tileImage, this.xPos, this.yPos, this.tileSizeX, this.tileSizeY)
  }
}


//preload assets here to speed up programe running
function preload() {

  //overlay video
  VHSoverlay = createVideo("assets/vhsOverlay.mp4")

  //font
  VT323Font = loadFont("assets/fonts/VT323-Regular.ttf")

  //background tiles (inside)
  //living room
  BGwallpaper = loadImage("assets/BG_Wallpaper.png")
  BGpanellingLower = loadImage("assets/BG_PanellingLower.png")
  BGpanellingUpper = loadImage("assets/BG_PanellingUpper.png")
  //kitchen
  BGkitchen = loadImage("assets/BG_KitchenTiles.png")
  //bedroom
  BGbedroom = loadImage("assets/BG_BedroomWall.png")
  //hallway
  BGhallwayWallpaper = loadImage("assets/BG_HallWallpaper.png")
  BGhallwayPanelling = loadImage("assets/BG_HallPanelling.png")
  //bathroom
  BGbathroom = loadImage("assets/BG_BathroomTiles.png")

  //objects
  OBJcabinet = loadImage("assets/OBJ_Cabinet.png")
  OBJdrawers = loadImage("assets/OBJ_Drawers.png")
  OBJradio = loadImage("assets/OBJ_Radio.png")

  //icons
  ICONnavigation = loadImage("assets/ICON_NavigationArrow.png")

  //other
  BLANKtile = loadImage("assets/BLANKtile.png")

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

  //object arrays populated only once, at setup
  populateOBJarrays();

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

//store details of each object in their respective arrays (based on room)
function populateOBJarrays() {

  OBJlivingRoomArray = [
    [1, OBJcabinet, 512, 512],
    [2, OBJdrawers, 512, 512],
    [3, OBJradio, 512, 512]
  ];
  OBJkitchenArray = [];
  OBJhallArray = [];
  OBJbedroomArray = [];
  OBJbathroomArray = [];


}


function BGtilesInside() {

  let BGtileID = 0
  
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
      //each environment uses a different graphics map, dictated by the current game state and location
      if (currentLocation == 1) {
        if (BGhallwayMap[tileX][tileY] == 1) {
          tileImage = BGhallwayWallpaper
        } else if (BGhallwayMap[tileX][tileY] == 2) {
          tileImage = BGhallwayPanelling
        }
      } else if (currentLocation == 2) {
        if (BGlivingRoomMap[tileX][tileY] == 1) {
          tileImage = BGwallpaper
        } else if (BGlivingRoomMap[tileX][tileY] == 2) {
          tileImage = BGpanellingUpper
        } else if (BGlivingRoomMap[tileX][tileY] == 3) {
          tileImage = BGpanellingLower
        }
      } else if (currentLocation == 3) {
        if (BGkitchenMap[tileX][tileY] == 1) {
          tileImage = BGkitchen
        }
      } else if (currentLocation == 4) {
        if (BGbathroomMap[tileX][tileY] == 1) {
          tileImage = BGbathroom
        }
      } else if (currentLocation == 5) {
        if (BGbedroomMap[tileX][tileY] == 1) {
          tileImage = BGbedroom
        }
      }

      //adds new tile to tile map!
      BGtileMap[tileX][tileY] = new BGtileClass(tileX, tileY, BGtileSize, BGtileID, tileImage)
      BGtileID++

    }
  }
}

function NAVtiles() {
 
  let NAVtileID = 0
  
  //resets existing tile map to clean/empty map for new environment to be added
  NAVtileMap = []

  //iterate through each row of tiles
  for (let tileX = 0; tileX < OVERLAYtilesX; tileX++) {

    //create a new array within the tileMap array, corresponding to each row in the on-screen tileMap
    //clears any previously stored array in that row
    NAVtileMap[tileX] = []


    //iterate through each column of tiles within a row
    for (let tileY = 0; tileY < OVERLAYtilesY; tileY++) {

      //dictates whether the tile is displayed
      if (navPosMap1[tileX][tileY] == 1) {
        tileImage = ICONnavigation
      } else if (navPosMap1[tileX][tileY] == -1) {
        tileImage = ICONnavigation
      } else {
        tileImage = BLANKtile
      }

      //adds new tile to tile map!
      NAVtileMap[tileX][tileY] = new BGtileClass(tileX, tileY, NAVtileSize, NAVtileID, tileImage)
      NAVtileID++

    }
  }
}

function OBJtiles() {
 
  let OBJtileID = 0
  let OBJindex = 0
  
  //resets existing tile map to clean/empty map for new environment to be added
  OBJtileMapLayer1 = []
  OBJtileMapLayer2 = []
  OBJtileMapLayer3 = []
  OBJhighlightMap = []

  LR_OBJarrangement_L1_1

  //Fill object map for each layer of objects

  //iterate through each row of tiles
  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    //create a new array within the tileMap array, corresponding to each row in the on-screen tileMap
    //clears any previously stored array in that row
    OBJtileMapLayer1[tileX] = []

    //iterate through each column of tiles within a row
    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      //which object is displayed and where
      if (currentLocation == 2) {
        OBJindex = (LR_OBJarrangement_L1_1[tileX][tileY]) - 1
      }

        if (OBJindex < 0) {
          tileImage = BLANKtile
          OBJsizeX = BGtileSize
          OBJsizeY = BGtileSize
        } else {
          tileImage = OBJlivingRoomArray[OBJindex][1]
          OBJsizeX = OBJlivingRoomArray[OBJindex][2]
          OBJsizeY = OBJlivingRoomArray[OBJindex][3]
        }


      //adds new tile to tile map!
      OBJtileMapLayer1[tileX][tileY] = new OBJtileClass(tileX, tileY, OBJsizeX, OBJsizeY, OBJtileID, tileImage)
      OBJtileID++

    }
  }

  //iterate through each row of tiles
  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    //create a new array within the tileMap array, corresponding to each row in the on-screen tileMap
    //clears any previously stored array in that row
    OBJtileMapLayer2[tileX] = []

    //iterate through each column of tiles within a row
    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      //which object is displayed and where
      if (currentLocation == 2) {
        OBJindex = (LR_OBJarrangement_L2_1[tileX][tileY]) - 1
      }

        if (OBJindex < 0) {
          tileImage = BLANKtile
          OBJsizeX = BGtileSize
          OBJsizeY = BGtileSize
        } else {
          tileImage = OBJlivingRoomArray[OBJindex][1]
          OBJsizeX = OBJlivingRoomArray[OBJindex][2]
          OBJsizeY = OBJlivingRoomArray[OBJindex][3]
        }


      //adds new tile to tile map!
      OBJtileMapLayer2[tileX][tileY] = new OBJtileClass(tileX, tileY, OBJsizeX, OBJsizeY, OBJtileID, tileImage)
      OBJtileID++

    }
  }

  //iterate through each row of tiles
  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    //create a new array within the tileMap array, corresponding to each row in the on-screen tileMap
    //clears any previously stored array in that row
    OBJtileMapLayer3[tileX] = []

    //iterate through each column of tiles within a row
    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      //which object is displayed and where
      if (currentLocation == 2) {
        OBJindex = (LR_OBJarrangement_L3_1[tileX][tileY]) - 1
      }

        if (OBJindex < 0) {
          tileImage = BLANKtile
          OBJsizeX = BGtileSize
          OBJsizeY = BGtileSize
        } else {
          tileImage = OBJlivingRoomArray[OBJindex][1]
          OBJsizeX = OBJlivingRoomArray[OBJindex][2]
          OBJsizeY = OBJlivingRoomArray[OBJindex][3]
        }


      //adds new tile to tile map!
      OBJtileMapLayer3[tileX][tileY] = new OBJtileClass(tileX, tileY, OBJsizeX, OBJsizeY, OBJtileID, tileImage)
      OBJtileID++

    }
  }


}


function draw() {
  background('black')
  
  //for debug only
  currentGameState = 2
  currentLocation = 2

  //Calculates new mouse coordinates based on center of screen instead of default top left corner, thus allowing coordinates to remain same regardless of window resizing - crucial when calculating mouse click position across different window sizes
  newMouseX = mouseX - (windowWidth/2)
  newMouseY = mouseY - (windowHeight/2)


  BGtilesInside()
  NAVtiles()
  OBJtiles()
 

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


   //draw each object stored in OBJ map
   for (let tileX = 0; tileX < BGtilesX; tileX++) {

    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      OBJtileMapLayer1[tileX][tileY].displayTile()
      OBJtileMapLayer2[tileX][tileY].displayTile()
      OBJtileMapLayer3[tileX][tileY].displayTile()
    }
  }

  //sorts the orientation and position of navigation arrows
  for (let tileX = 0; tileX < OVERLAYtilesX; tileX++) {

    for (let tileY = 0; tileY < OVERLAYtilesY; tileY++) {

      if (navPosMap1[tileX][tileY] == 1) {
        push()
        translate(-30, -30)
        NAVtileMap[tileX][tileY].displayTile()
        pop()
      } else if (navPosMap1[tileX][tileY] == -1) {
        push()
        translate((NAVtileSize * 17 + 30), -30)
        scale(-1, 1)
        NAVtileMap[tileX][tileY].displayTile()
        pop()
      }

    }
  }


  //reset translations (so they don't just accumulate with every run of the draw function)
  pop()

  //semi-transparent VHS-style overlay
  tint(255, 100);
  image(VHSoverlay, 0, 0, 1280, 768);

  //track mouse coordinates (useful for tracking click position later)
  fill('white')
  textFont(VT323Font, 30)
  textAlign(CENTER, CENTER)
  text(newMouseX, newMouseX+50, newMouseY)
  text(newMouseY, newMouseX+50, newMouseY + 30)
  
}
