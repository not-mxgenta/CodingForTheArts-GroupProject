//dictating which 'stage' of the game we are in, changes the background tilemaps and any events
let currentGameState = 0;
//more specific, works within each game state i.e. may be in state 2 (inside), dictates whether in location 0 (bathroom) or location 1 (bedroom) etc.
let currentLocation = 0;
//even more specific, specifies which part of a location is the player's current focus i.e. left wall
let currentFocus = 0;

//essential to centre all activity on the screen, regardless of screen size
let newMouseX;
let newMouseY;

//tracking whether nav buttons are hovered
let leftNavHovered = false;
let rightNavHovered = true;


//defining the tile map
//2D arrays containing each instance of the Tile Class we create
let BGtileMap = [];
let NAVtileMap = [];

//containing all base object sheet images
let OBJsheetArray = [];

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
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3]
]

//Layout of different tile types for the background of the bedroom
let BGbedroomMap = [
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1]
]

//slimmer section of bedroom - 0s equal 'blank' tile
let BGbedroomStudyMap = [
  [0, 0, 0],
  [3, 2, 1],
  [3, 2, 1],
  [3, 2, 1],
  [0, 0, 0]
]

//Layout of different tile types for the background of the bathroom
let BGbathroomMap = [
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3]
]

//Layout of different tile types for the background of the bathroom
let BGbathroomCubbyMap = [
  [0, 0, 0],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [0, 0, 0]
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

class interactTextClass {
  constructor(xPos, yPos, INTtextSize, INTtextID, INTtextContent, isDisplayed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.INTtextSize = INTtextSize;
    this.INTtextID = INTtextID;
    this.INTtextContent = INTtextContent;
    this.isDisplayed = isDisplayed
  }

  displayText() {
    fill('white')
    textFont(VT323Font, this.INTtextSize)
    textAlign(CENTER, CENTER)
    text(this.INTtextContent, this.xPos, this.yPos)
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
  BGkitchenUpper = loadImage("assets/BG_KitchenTiles.png")
  BGkitchenLower = loadImage("assets/BG_KitchenTilesLower.png")
  BGkitchenWall = loadImage("assets/BG_KitchenWall.png")
  //bedroom
  BGbedroomLower = loadImage("assets/BG_BedroomWall.png")
  BGbedroomMiddle = loadImage("assets/BG_BedroomWallMid.png")
  BGbedroomUpper = loadImage("assets/BG_BedroomWallUpper.png")
  //hallway
  BGhallwayWallpaper = loadImage("assets/BG_HallWallpaper.png")
  BGhallwayPanelling = loadImage("assets/BG_HallPanelling.png")
  //bathroom
  BGbathroom = loadImage("assets/BG_BathroomTiles.png")
  BGbathroomLower = loadImage("assets/BG_BathroomTilesLower.png")
  BGbathroomWall = loadImage("assets/BG_BathroomWall.png")

  //objects
  OBJbedroom1 = loadImage("assets/OBJsheet_Bedroom1.png")
  OBJstudy1 = loadImage("assets/OBJsheet_Study1.png")
  OBJkitchen1 = loadImage("assets/OBJsheet_Kitchen1.png")
  OBJkitchen2 = loadImage("assets/OBJsheet_Kitchen2.png")
  OBJdining1 = loadImage("assets/OBJsheet_DiningTable.png")
  OBJhallway1 = loadImage("assets/OBJsheet_Hallway1.png")
  OBJbathroom1 = loadImage("assets/OBJsheet_Bathroom1.png")
  OBJbathroom2 = loadImage("assets/OBJsheet_Bathroom2.png")
  OBJlivingroom1 = loadImage("assets/OBJsheet_LivingRoom1.png")

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

  OBJsheetArray = [OBJbedroom1, OBJbathroom1, OBJhallway1, OBJkitchen1, OBJkitchen2, OBJdining1]

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
        } else {
          tileImage = BLANKtile
        }
      } else if (currentLocation == 2) {
        if (BGlivingRoomMap[tileX][tileY] == 1) {
          tileImage = BGwallpaper
        } else if (BGlivingRoomMap[tileX][tileY] == 2) {
          tileImage = BGpanellingUpper
        } else if (BGlivingRoomMap[tileX][tileY] == 3) {
          tileImage = BGpanellingLower
        } else {
          tileImage = BLANKtile
        }
      } else if (currentLocation == 3) {
        if (BGkitchenMap[tileX][tileY] == 1) {
          tileImage = BGkitchenUpper
        } else if (BGkitchenMap[tileX][tileY] == 2) {
          tileImage = BGkitchenLower
        } else if (BGkitchenMap[tileX][tileY] == 3) {
          tileImage = BGkitchenWall
        } else {
          tileImage = BLANKtile
        }
      } else if (currentLocation == 4) {
        if (currentFocus == 2) {
          if (BGbathroomCubbyMap[tileX][tileY] == 1) {
            tileImage = BGbathroom
          } else if (BGbathroomCubbyMap[tileX][tileY] == 2) {
            tileImage = BGbathroomLower
          } else  if (BGbathroomCubbyMap[tileX][tileY] == 3) {
            tileImage = BGbathroomWall
          } else {
            tileImage = BLANKtile
          }
        } else {
          if (BGbathroomMap[tileX][tileY] == 1) {
            tileImage = BGbathroom
          } else if (BGbathroomMap[tileX][tileY] == 2) {
            tileImage = BGbathroomLower
          } else  if (BGbathroomMap[tileX][tileY] == 3) {
            tileImage = BGbathroomWall
          } else {
            tileImage = BLANKtile
          }
        }
      } else if (currentLocation == 5) {
        if (currentFocus == 2) {
          if (BGbedroomStudyMap[tileX][tileY] == 1) {
            tileImage = BGbedroomLower
          } else if (BGbedroomStudyMap[tileX][tileY] == 2) {
            tileImage = BGbedroomMiddle
          } else if (BGbedroomStudyMap[tileX][tileY] == 3) {
            tileImage = BGbedroomUpper
          } else {
            tileImage = BLANKtile
          }
        } else {
          if (BGbedroomMap[tileX][tileY] == 1) {
            tileImage = BGbedroomLower
          } else if (BGbedroomMap[tileX][tileY] == 2) {
            tileImage = BGbedroomMiddle
          } else if (BGbedroomMap[tileX][tileY] == 3) {
            tileImage = BGbedroomUpper
          } else {
            tileImage = BLANKtile
          }
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

function placeObjectsInside () {
  let currentObjectArrangement = BLANKtile

  if (currentLocation == 1) {
    if (currentFocus == 1) {
      currentObjectArrangement = OBJhallway1
    } else if (currentFocus == 2) {
      currentObjectArrangement = BLANKtile
    } else {
      currentObjectArrangement = BLANKtile
    }
  } else if (currentLocation == 2) {
    if (currentFocus == 1) {
      currentObjectArrangement = OBJlivingroom1
    } else if (currentFocus == 2) {
      currentObjectArrangement = BLANKtile
    } else {
      currentObjectArrangement = BLANKtile
    }
  } else if (currentLocation == 3) {
    if (currentFocus == 1) {
      currentObjectArrangement = OBJdining1
    } else if (currentFocus == 2) {
      currentObjectArrangement = OBJkitchen2
    } else {
      currentObjectArrangement = OBJkitchen1
    }
  } else if (currentLocation == 4) {
    if (currentFocus == 1) {
      currentObjectArrangement = OBJbathroom1
    } else if (currentFocus == 2) {
      currentObjectArrangement = OBJbathroom2
    } else {
      currentObjectArrangement = BLANKtile
    }
  } else if (currentLocation == 5) {
    if (currentFocus == 1) {
      currentObjectArrangement = OBJbedroom1
    } else if (currentFocus == 2) {
      currentObjectArrangement = OBJstudy1
    } else {
      currentObjectArrangement = BLANKtile
    }
  }

  image(currentObjectArrangement, 0, 0, 1280, 768)

}

function checkMouseHover() {

//check, based on current mouse position, whether the player is hovering over the left or right nav arrows
if (-740 < newMouseX && newMouseX < -670 && -80 < newMouseY && newMouseY < 10) {
  leftNavHovered = true;
  rightNavHovered = false;
} else if (670 < newMouseX && newMouseX < 740 && -80 < newMouseY && newMouseY < 10) {
  rightNavHovered = true;
  leftNavHovered = false;
} else {
  rightNavHovered = false;
  leftNavHovered = false;
}

}


function draw() {
  background('black')
  
  //for debug only
  currentGameState = 2
  currentLocation = 4
  currentFocus = 1

  //Calculates new mouse coordinates based on center of screen instead of default top left corner, thus allowing coordinates to remain same regardless of window resizing - crucial when calculating mouse click position across different window sizes
  newMouseX = mouseX - (windowWidth/2)
  newMouseY = mouseY - (windowHeight/2)

  BGtilesInside()
  NAVtiles()

  //apply VHS effects
  drawFlicker()
  frameJitter()
  applyVHSdistortion()

  //check whether the mouse is hovering over anything interactable before drawing
  checkMouseHover()

  push()
  
  fill(0, 0, 0,)
  strokeWeight(30)
  stroke(50, 50, 50)
  rect(0, 256/4, 1550, 1024)
  strokeWeight(20)
  stroke(100, 100, 100)
  rect(0, 256/4, 1550, 1024)
  strokeWeight(10)
  stroke(150, 150, 150)
  rect(0, 256/4, 1550, 1024)

  pop()


  push()

  //centre tile maps in window
  translate(-BGtilesX * BGtileSize/2 + BGtileSize/2, -BGtilesY * BGtileSize/2 + BGtileSize/2, 0);


  //draw each tile in current tile map
  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      BGtileMap[tileX][tileY].displayTile()
    }
  }


  //sorts the orientation and position of navigation arrows
  for (let tileX = 0; tileX < OVERLAYtilesX; tileX++) {

    for (let tileY = 0; tileY < OVERLAYtilesY; tileY++) {

      if (navPosMap1[tileX][tileY] == 1) {
        push()
        translate(-NAVtileSize - 30, -30)
        if (leftNavHovered == true) {
          translate(10, 10)
        }
        NAVtileMap[tileX][tileY].displayTile()
        pop()
      } else if (navPosMap1[tileX][tileY] == -1) {
        push()
        translate((NAVtileSize * 18 + 30), -30)
        scale(-1, 1)
        if (rightNavHovered == true) {
          translate(10, 10)
        }
        NAVtileMap[tileX][tileY].displayTile()
        pop()
      }

    }
  }

  //reset translations (so they don't just accumulate with every run of the draw function)
  pop()


  push()
  //draw objects based on current location and focus
  placeObjectsInside()
  pop()


  push()
  translate(0, 256/4)
  //semi-transparent VHS-style overlay
  tint(255, 100);
  image(VHSoverlay, 0, 0, 1550, 1024);
  pop()

  //track mouse coordinates on screen (useful for tracking click position later, remove when submitting final game)
  fill('white')
  textFont(VT323Font, 30)
  textAlign(CENTER, CENTER)
  text(newMouseX, newMouseX+50, newMouseY)
  text(newMouseY, newMouseX+50, newMouseY + 30)

}
