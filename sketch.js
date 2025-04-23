//dictating which 'stage' of the game we are in, changes the background tilemaps and any events
let currentGameState = 2;
//more specific, works within each game state i.e. may be in state 2 (inside), dictates whether in location 0 (bathroom) or location 1 (bedroom) etc.
let currentLocation = 1;
//even more specific, specifies which part of a location is the player's current focus i.e. left wall
let currentFocus = 1;

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
//containing all object highlight overlays
let OBJhighlightArray = [];
//containing all middle ground objects i.e. backgrounds of windows
let OBJsheetMGarray = [];

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


let interactID = 0;

let displayingDialogue = false;

let displayingChoice = false;

let currentChoices = [];

let dialogueBoxes = [];

let inputBlocked = false;

let currentDialogue = '';

let charTyped = 0;

let scanLineY = 0;

let dialogueToDisplay = 0;

let branchCodeArray = [
  ['SP_lend', null],
  ['SP_fdLock', null],
  ['SP_fdChain', null],
  ['SP_jacket', null],
  ['SP_shoes', null],
  ['SP_satchel', null],
  ['SP_hallDrawer', null],
  ['SP_phone', null],
  ['SP_lrWindow', null],
  ['SP_lrUpperDrawer', null],
  ['SP_lrLowerDrawer', null],
  ['SP_radio', null],
  ['SP_TV', null],
  ['SP_diningChair', null],
  ['SP_kitchenSink', null],
  ['SP_bath', null],
  ['SP_bathroomSink', null],
  ['SP_showerCurtain', null],
  ['SP_underBed', null],
  ['SP_bedroomWindow', null],
  ['SP_book', null],
  ['SP_wardrobe', null],
  ['SP_bedroomCabinet', null]
]


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
  [1, 1, 2],
  [1, 1, 2],
  [1, 1, 2],
  [1, 1, 2],
  [1, 1, 2]
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

let BGfrontDoorMap = [
  [0, 0, 0],
  [1, 1, 2],
  [1, 1, 2],
  [1, 1, 2],
  [0, 0, 0]
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
  constructor(INTtextSize, INTtextID, INTtextContent, isDisplayed) {
    this.INTtextSize = INTtextSize;
    this.INTtextID = INTtextID;
    this.INTtextContent = INTtextContent;
    this.isDisplayed = isDisplayed
  }

  displayText(textXpos, textYpos) {
    fill('white')
    textFont(VT323Font, this.INTtextSize)
    textAlign(LEFT, CENTER)
    text(this.INTtextContent, textXpos, textYpos)
  }
}

class dialogueBoxClass {
  constructor(dialogueID, dialogueContent, firstChoice, secondChoice) {
    this.dialogueID = dialogueID;
    this.dialogueContent = dialogueContent;
    this.firstChoice = firstChoice;
    this.secondChoice = secondChoice;
  }

  displayDialogue () {

    push()
    translate(0, 465)
    fill('black')
    rect(0, 0, 1200, 200)
    fill(255, 255, 255, 200)
    rect(0, 0, 1180, 185)
    fill('black')
    rect(0, 0, 1160, 170)

    for (let scanLines = 0; scanLines < 16; scanLines++) {

      push()

      translate(0, -97)
      fill(255, 255, 255, 20)
      
      let scanLinePosition = (scanLineY + (25 * scanLines) - 100) % 197

      if (scanLinePosition < 0) {
        scanLinePosition += 197
      }

      rect(0, scanLinePosition, 1180, 6)

      pop()
    }

    pop()

    currentDialogue = this.dialogueContent;
    currentChoices = [this.firstChoice, this.secondChoice]

    if (this.firstChoice != null) {
      displayingChoice = true
    } else {
      displayingChoice = false
    }
    
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
  OBJbedroom2 = loadImage("assets/OBJsheet_Bedroom2.png")
  OBJstudy1 = loadImage("assets/OBJsheet_Study1.png")
  OBJkitchen1 = loadImage("assets/OBJsheet_Kitchen1.png")
  OBJkitchen2 = loadImage("assets/OBJsheet_Kitchen2.png")
  OBJdining1 = loadImage("assets/OBJsheet_DiningTable.png")
  OBJhallway1 = loadImage("assets/OBJsheet_Hallway1.png")
  OBJhallway2 = loadImage("assets/OBJsheet_Hallway2.png")
  OBJfrontDoor = loadImage("assets/OBJsheet_FrontDoor.png")
  OBJbathroom1 = loadImage("assets/OBJsheet_Bathroom1.png")
  OBJbathroom2 = loadImage("assets/OBJsheet_Bathroom2.png")
  OBJlivingroom1 = loadImage("assets/OBJsheet_LivingRoom1.png")
  OBJlivingroom2 = loadImage("assets/OBJsheet_LivingRoom2.png")
  OBJlivingroom3 = loadImage("assets/OBJsheet_LivingRoom3.png")

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

  buildDialogueBox()

}


//Update if window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black')
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
        if (currentFocus == 1) {
          if (BGfrontDoorMap[tileX][tileY] == 1) {
            tileImage = BGhallwayWallpaper
          } else if (BGfrontDoorMap[tileX][tileY] == 2) {
            tileImage = BGhallwayPanelling
          } else {
            tileImage = BLANKtile
          }
        } else {
          if (BGhallwayMap[tileX][tileY] == 1) {
            tileImage = BGhallwayWallpaper
          } else if (BGhallwayMap[tileX][tileY] == 2) {
            tileImage = BGhallwayPanelling
          } else {
            tileImage = BLANKtile
          }
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

function buildDialogueBox() {
 

  let dialogueToAdd = [
    ["---", null, null],
    ["---", null, null],
    ["Better lock this.", 'lock the door', 'leave it'],
    ["Double locked. No one's getting in here!", null, null],
    ["---", null, null],
    [null],
    ["I shouldn't leave my shoes lying around like this, they're a tripping hazard", 'tuck them under the bench', 'leave them'],
    ["Did I leave my phone in here?", 'look for the phone', 'leave it'],
    [null],
    [null],
    ["---", 'take it', 'leave it'],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    [null],
    [null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    [null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    [null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    ["---", null, null],
    [null],
    ["---", null, null],
    ["---", null, null],

  ]
  
  //empty list ready to contain all dialogue box instances
  dialogueBoxes = []

  //iterate through each dialogue
  for (let dialogueAdded = 0; dialogueAdded < dialogueToAdd.length; dialogueAdded++) {

    if (dialogueToAdd[dialogueAdded][0] != null) {
      //adds next dialogue instance to array
      dialogueBoxes[dialogueAdded] = new dialogueBoxClass(dialogueAdded, dialogueToAdd[dialogueAdded][0], dialogueToAdd[dialogueAdded][1], dialogueToAdd[dialogueAdded][2])
    }


  }
}


function displayInteractText(interactIDinput) {

  fill('white')
  textFont(VT323Font, 50)
  textAlign(LEFT, CENTER)

  text(interactIDinput, newMouseX + 50, newMouseY)

}

function placeObjectsInside () {
  let currentObjectArrangement = BLANKtile

  if (currentLocation == 1) {
    if (currentFocus == 1) {
      currentObjectArrangement = OBJfrontDoor
    } else if (currentFocus == 2) {
      currentObjectArrangement = OBJhallway1
    } else if (currentFocus == 3) {
      currentObjectArrangement = OBJhallway2
    }
  } else if (currentLocation == 2) {
    if (currentFocus == 1) {
      currentObjectArrangement = OBJlivingroom3
    } else if (currentFocus == 2) {
      currentObjectArrangement = OBJlivingroom1
    } else {
      currentObjectArrangement = OBJlivingroom2
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
    }
  } else if (currentLocation == 5) {
    if (currentFocus == 1) {
      currentObjectArrangement = OBJbedroom1
    } else if (currentFocus == 2) {
      currentObjectArrangement = OBJstudy1
    } else {
      currentObjectArrangement = OBJbedroom2
    }
  }

  image(currentObjectArrangement, 0, 0, 1280, 768)
}

function leftNavClicked() {
  if (currentLocation == 1) {
    if (currentFocus == 1) {
      currentFocus = 3
    } else if (currentFocus == 2) {
      currentFocus = 1
    } else if (currentFocus == 3) {
      currentFocus = 2
    }
  } else if (currentLocation == 2) {
    if (currentFocus == 1) {
      currentFocus = 2
    } else if (currentFocus == 2) {
      currentFocus = 3
    } else if (currentFocus == 3) {
      currentFocus = 1
    }
  } else if (currentLocation == 3) {
    if (currentFocus == 1) {
      currentFocus = 3
    } else if (currentFocus == 2) {
      currentFocus = 1
    } else if (currentFocus == 3) {
      currentFocus = 2
    }
  } else if (currentLocation == 4) {
    if (currentFocus == 1) {
      currentFocus = 2
    } else if (currentFocus == 2) {
      currentFocus = 1
    }
  } else if (currentLocation == 5) {
    if (currentFocus == 1) {
      currentFocus = 3
    } else if (currentFocus == 2) {
      currentFocus = 1
    } else if (currentFocus == 3) {
      currentFocus = 2
    }
  }
}

function rightNavClicked() {
  if (currentLocation == 1) {
    if (currentFocus == 1) {
      currentFocus = 2
    } else if (currentFocus == 2) {
      currentFocus = 3
    } else if (currentFocus == 3) {
      currentFocus = 1
    }
  } else if (currentLocation == 2) {
    if (currentFocus == 1) {
      currentFocus = 3
    } else if (currentFocus == 2) {
      currentFocus = 1
    } else if (currentFocus == 3) {
      currentFocus = 2
    }
  } else if (currentLocation == 3) {
    if (currentFocus == 1) {
      currentFocus = 2
    } else if (currentFocus == 2) {
      currentFocus = 3
    } else if (currentFocus == 3) {
      currentFocus = 1
    }
  } else if (currentLocation == 4) {
    if (currentFocus == 1) {
      currentFocus = 2
    } else if (currentFocus == 2) {
      currentFocus = 1
    }
  } else if (currentLocation == 5) {
    if (currentFocus == 1) {
      currentFocus = 2
    } else if (currentFocus == 2) {
      currentFocus = 3
    } else if (currentFocus == 3) {
      currentFocus = 1
    }
  }
}


function checkMouseHover() {

  interactID = 0

  if (inputBlocked == false) {
    if (displayingDialogue == true) {

      if (displayingChoice == true) {
        push()
        fill('white')
        rectMode(CENTER, CENTER)
        //let underlineWidth = 0
        if (170 < newMouseX && newMouseX < 600 && 370 < newMouseY && newMouseY < 420) {
          //underlineWidth = textWidth(currentChoices[0])*1.75
          rect(520, 440, 100, 4)
        } else if (170 < newMouseX && newMouseX < 600 && 490 < newMouseY && newMouseY < 540) {
          //underlineWidth = textWidth(currentChoices[1])*1.75
          rect(520, 490, 100, 4)
        }
        pop()
      }

    } else {
      
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

        if (currentLocation == 1 && currentFocus == 1) {
          if (-370 < newMouseX && newMouseX < -195 && 240 < newMouseY && newMouseY < 380) {
            interactID = 1
          } else if (46 < newMouseX && newMouseX < 112 && 75 < newMouseY && newMouseY < 112) {
            interactID = 2
          } else if (95 < newMouseX && newMouseX < 112 && 125 < newMouseY && newMouseY < 160) {
            interactID = 3
          } else if (80 < newMouseX && newMouseX < 180 && -80 < newMouseY && newMouseY < -30) {
            interactID = 4
          } else if (-340 < newMouseX && newMouseX < -210 && -160 < newMouseY && newMouseY < 190) {
            interactID = 5
          }
        } else if (currentLocation == 1 && currentFocus == 2) {
          if (-580 < newMouseX && newMouseX < -320 && -112 < newMouseY && newMouseY < 380) {
            interactID = 6
          } else if (6 < newMouseX && newMouseX < 150 && 290 < newMouseY && newMouseY < 380) {
            interactID = 7
          } else if (375 < newMouseX && newMouseX < 450 && 240 < newMouseY && newMouseY < 380) {
            interactID = 8
          }
        } else if (currentLocation == 1 && currentFocus == 3) {
          if (-630 < newMouseX && newMouseX < -370 && -112 < newMouseY && newMouseY < 380) {
            interactID = 9
          } else if (370 < newMouseX && newMouseX < 630 && -112 < newMouseY && newMouseY < 380) {
            interactID = 10
          } else if (140 < newMouseX && newMouseX < 300 && 120 < newMouseY && newMouseY < 200) {
            interactID = 11
          } else if (100 < newMouseX && newMouseX < 330 && -80 < newMouseY && newMouseY < 80) {
            interactID = 12
          }
        } else if (currentLocation == 2 && currentFocus == 1) {
          if (-311 < newMouseX && newMouseX < 311 && -340 < newMouseY && newMouseY < 75) {
            interactID = 13
          }
        } else if (currentLocation == 2 && currentFocus == 2) {
          if (-80 < newMouseX && newMouseX < 310 && 90 < newMouseY && newMouseY < 190) {
            interactID = 14
          } else if (-80 < newMouseX && newMouseX < 310 && 200 < newMouseY && newMouseY < 330) {
            interactID = 15
          } else if (-65 < newMouseX && newMouseX < 95 && -120 < newMouseY && newMouseY < 30) {
            interactID = 16
          } else if (370 < newMouseX && newMouseX < 630 && -120 < newMouseY && newMouseY < 380) {
            interactID = 17
          }
        } else if (currentLocation == 2 && currentFocus == 3) {
          if (-150 < newMouseX && newMouseX < 100 && -110 < newMouseY && newMouseY < 390) {
            interactID = 18
          } else if (-120 < newMouseX && newMouseX < 70 && -320 < newMouseY && newMouseY < -130) {
            interactID = 19
          } else if (-500 < newMouseX && newMouseX < -280 && -5 < newMouseY && newMouseY < 210) {
            interactID = 20
          }
        } else if (currentLocation == 3 && currentFocus == 1) {
          if (-600 < newMouseX && newMouseX < -380 && 190 < newMouseY && newMouseY < 240) {
            interactID = 21
          }
        } else if (currentLocation == 3 && currentFocus == 2) {
          if (280 < newMouseX && newMouseX < 340 && -70 < newMouseY && newMouseY < 80) {
            interactID = 22
          } else if (400 < newMouseX && newMouseX < 610 && 140 < newMouseY && newMouseY < 340) {
            interactID = 23
          } else if (-620 < newMouseX && newMouseX < -380 && -112 < newMouseY && newMouseY < 380) {
            interactID = 24
          }
        } else if (currentLocation == 3 && currentFocus == 3) {
          if (-390 < newMouseX && newMouseX < -130 && -260 < newMouseY && newMouseY < 390) {
            interactID = 25
          } else if (30 < newMouseX && newMouseX < 220 && 0 < newMouseY && newMouseY < 100) {
            interactID = 26
          }
        } else if (currentLocation == 4 && currentFocus == 1) {
          if (-300 < newMouseX && newMouseX < -75 && 110 < newMouseY && newMouseY < 240) {
            interactID = 27
          } else if (-400 < newMouseX && newMouseX < 20 && -170 < newMouseY && newMouseY < 55) {
            interactID = 28
          } else if (400 < newMouseX && newMouseX < 590 && 190 < newMouseY && newMouseY < 335) {
            interactID = 29
          } else if (65 < newMouseX && newMouseX < 320 && -112 < newMouseY && newMouseY < 380) {
            interactID = 30
          }
        } else if (currentLocation == 4 && currentFocus == 2) {
          if (-130 < newMouseX && newMouseX < 380 && 170 < newMouseY && newMouseY < 350) {
            interactID = 31
          } else if (140 < newMouseX && newMouseX < 370 && -80 < newMouseY && newMouseY < 175) {
            interactID = 32
          } else if (-340 < newMouseX && newMouseX < -165 && 120 < newMouseY && newMouseY < 330) {
            interactID = 33
          }
        } else if (currentLocation == 5 && currentFocus == 1) {
          if (140 < newMouseX && newMouseX < 630 && 190 < newMouseY && newMouseY < 330) {
            interactID = 34
          } else if (190 < newMouseX && newMouseX < 600 && 330 < newMouseY && newMouseY < 380) {
            interactID = 35
          } else if (-115 < newMouseX && newMouseX < 360 && -160 < newMouseY && newMouseY < 60) {
            interactID = 36
          }
        } else if (currentLocation == 5 && currentFocus == 2) {
          if (-115 < newMouseX && newMouseX < 110 && -70 < newMouseY && newMouseY < 130) {
            interactID = 37
          }
        } else if (currentLocation == 5 && currentFocus == 3) {
          if (-255 < newMouseX && newMouseX < -130 && 80 < newMouseY && newMouseY < 130) {
            interactID = 38
          } else if (110 < newMouseX && newMouseX < 350 && -250 < newMouseY && newMouseY < 330) {
            interactID = 39
          } else if (380 < newMouseX && newMouseX < 640 && -112 < newMouseY && newMouseY < 380) {
            interactID = 40
          } else if (-240 < newMouseX && newMouseX < -35 && 190 < newMouseY && newMouseY < 340) {
            interactID = 41
          } else if (-580 < newMouseX && newMouseX < -180 && -370 < newMouseY && newMouseY < 65) {
            interactID = 42
          }
        } else {
          interactID = 0
        }
      }
    
  }
}

if (interactID != 0) {
  displayInteractText(interactID)
}

}



function choiceMade(inputChoice) {

}



//anything to do with clicking the mouse - tracking it's position, recording interaction, playing noise etc
function mouseClicked() {

  if (inputBlocked == false) {
    if (displayingDialogue == true) {
      if (displayingChoice == true) {
        if (170 < newMouseX && newMouseX < 600 && 370 < newMouseY && newMouseY < 420) {
          choiceMade(currentChoices[0])
          displayingDialogue = false
          displayingChoice = false
        } else if (170 < newMouseX && newMouseX < 600 && 490 < newMouseY && newMouseY < 540) {
          choiceMade(currentChoices[1])
          displayingDialogue = false
          displayingChoice = false
        }
      } else {
        displayingDialogue = false
      }

    } else {
      if (-740 < newMouseX && newMouseX < -670 && -80 < newMouseY && newMouseY < 10) {
        leftNavClicked()
      } else if (670 < newMouseX && newMouseX < 740 && -80 < newMouseY && newMouseY < 10) {
        rightNavClicked()
      } else {
        if (interactID == 6) {
          currentLocation = 2
          currentFocus = 2
        } else if (interactID == 9) {
          currentLocation = 4
          currentFocus = 1
        } else if (interactID == 10) {
          currentLocation = 3
          currentFocus = 2
        } else if (interactID == 17) {
          currentLocation = 1
          currentFocus = 2
        } else if (interactID == 18) {
          currentLocation = 5
          currentFocus = 3
        } else if (interactID == 24) {
          currentLocation = 1
          currentFocus = 3
        } else if (interactID == 30) {
          currentLocation = 1
          currentFocus = 3
        } else if (interactID == 40) {
          currentLocation = 2
          currentFocus = 3
        } else if (interactID != 0) {
          displayingDialogue = true
          dialogueToDisplay = interactID - 1
        }
      }
    }
  }
}


function draw() {
  background('black')
  
  frameRate(24)

  //Calculates new mouse coordinates based on center of screen instead of default top left corner, thus allowing coordinates to remain same regardless of window resizing - crucial when calculating mouse click position across different window sizes
  newMouseX = mouseX - (windowWidth/2)
  newMouseY = mouseY - (windowHeight/2)

  BGtilesInside()
  NAVtiles()

  //apply VHS effects
  drawFlicker()
  frameJitter()
  applyVHSdistortion()


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

  push()

  if (displayingDialogue == true) {

    if (scanLineY > 197) {
      scanLineY = 0
    } else {
      scanLineY = scanLineY + 2
    }


    textWrap(WORD)

    inputBlocked = true
    dialogueBoxes[dialogueToDisplay].displayDialogue()

    if (charTyped < currentDialogue.length) {
      let toType = currentDialogue.substring(0, charTyped)

      fill('white')
      textFont(VT323Font, 40)
      textAlign(LEFT, CENTER)
      text(toType, -195, 465, 750)

      charTyped++ 
      
    } else if (charTyped == currentDialogue.length) {

      inputBlocked = false
      fill('white')
      textFont(VT323Font, 40)
      textAlign(LEFT, CENTER)
      text(currentDialogue, -195, 465, 750)

    }

    if (displayingChoice == true) {

      textAlign(RIGHT, CENTER)

      if (currentChoices[0] != null) {
        text(currentChoices[0], 570, 410)
      }
      if (currentChoices[0] != null && currentChoices[1] != null) {
        text(currentChoices[1], 570, 510)
      }

    } else {

      textSize(30)
      textAlign(RIGHT, CENTER)
      text('click to continue...', 470, 525)

    }


  } else {

    charTyped = 0
    scanlineY = 0

  }

  pop()

  //check whether the mouse is hovering over anything interactable
  checkMouseHover()


  
}
