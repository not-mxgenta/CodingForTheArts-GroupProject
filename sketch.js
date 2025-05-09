//dictating which 'stage' of the game we are in, changes the background tilemaps and any events
let currentGameState = 0;
//more specific, works within each game state i.e. may be in state 2 (inside), dictates whether in location 0 (bathroom) or location 1 (bedroom) etc.
let currentLocation = 1;
//even more specific, specifies which part of a location is the player's current focus i.e. left wall
let currentFocus = 1;

let currentPlayStage = 0;

let playBegin = false;

let fadeOpacity = 0;
let fadeStage = 48;
let fadingInit = true;
let fadingForward = false;
let fadeHold = 0;
let intermediateGameState = null;
let intermediateLocation = null;
let intermediateFocus = null;
let fadeSpeed = 1;
let postFadeDialogue = false;
let postFadeDialogueIndex = null;

//essential to centre all activity on the screen, regardless of screen size
let newMouseX;
let newMouseY;

let driftX = 0;
let driftY = 0;
let instabilityX = 0;
let instabilityY = 0;
let useGroggyMouse = false;

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

let interactDialogueBoxes = [];

let storyDialogueBoxes = [];

let inputBlocked = false;

let currentDialogue = '';

let charTyped = 0;

let scanLineY = 0;

let dialogueToDisplay = 0;
let followUpDialogue = [null, null];

let noInteractDialogue = false;

let branchCodeArray = [
  ['SP_lend', null, 0, null],
  ['SP_fdLock', null, 0, null],
  ['SP_fdChain', null, 0,  null],
  ['SP_shoes', null, 0, null],
  ['SP_satchel', null, 0, null],
  ['SP_hallDrawer', null, 0, null],
  ['SP_phone', null, 0, null],
  ['SP_lrWindow', null, 0, null],
  ['SP_lrUpperDrawer', null, 0, null],
  ['SP_lrLowerDrawer', null, 0, null],
  ['SP_radio', null, 0, null],
  ['SP_TV', null, 0, null],
  ['SP_diningChair', null, 0, null],
  ['SP_kitchenSink', null, 0, null],
  ['SP_bath', null, 0, null],
  ['SP_bathroomCabinet', null, 0, null],
  ['SP_showerCurtain', null, 0, null],
  ['SP_bedroomWindow', null, 0, null],
  ['SP_book', null, 0, null],
  ['SP_bedroomCabinet', null, 0, null],
  ['SP_weapon', null, 0, null]
]

let actionOrder = 0;

let pickingRewind = false;

let selectedRewindID = null;

let SP_hidingArray = [];

let branchDiagramUnlocks = [];

let ENDanimationFrames = [];
let ENDanimationTick = 0;
let ENDdisplayingUnlock = false;

let unlockCount = 0;

let currentUnlockEnd = null;

let lockPinPositions = [0, 0, 0, 0, 0];
let lockPinDirections = [1, 1, 1, 1, 1];

let lockCharacterPositionX = 113;
let lockCharacterPositionY = -312;
let chainArrowPosition = 0

let minigameStartTime = 0;
let minigame1Duration = 45000;
let minigame1success = 0;
let minigame2Duration = 45000;
let minigame2success = 0;
let minigame2Progress = 0;
let minigame2Active = false;
let minigame2ArrowDirection = 1
let minigame2ArrowSpeed = 1;
let minigame2FinishTime = 0;

let interactionCounts = [];
let holdInteractCount = 0;
let alternativeInteractText = null;

let dialogueType = null;


let outsideIntTextPositionX = 0;
let outsideIntID = 0;

let outsideStoryPoint = false;

let playStageInteractCounter = 0;

let pickingPlayerData = false;
let playerDataChoice = null;
let playerNameInput;
let enteringNewPlayer = false;
let selectingExistingPlayer = false;
let existingPlayerHover = null;
let currentPlayerData = null;
let beginningMenu = true;

//variables for Quinn's Walking Animation
let SPR_quinnWalkAnimArray = [];
let currentQuinnWalkFrame = 0;
let quinnMovable = false;
let SPRrightAmount = 620;
let SPRleftAmount = 0;
let quinnFacing = -1;
let walkingXpos = 0;
let BGscrollAmount = 0;

let MIRanimTick = 0;
let MIRdisplay = false;

let ITMcollectAnimTick = 0;
let ITMcollectedType = null;

let ITMarray = [];

// ===== JSON DIALOGUE SYSTEM: Add variable to store loaded JSON data =====
let dialogueData;

let cutScenes = [false, false]
let appearStage = 0
let appearBlend = 1

let objectiveArray = ['walk home', 'cook dinner', 'wait for food', 'get dinner', 'eat dinner', 'get ready for bed', 'go to bed', 'investigate noise', 'HIDE!', 'ESCAPE!', 'unlock, QUICK!'];
let currentObjective = null;
let objectiveBoxes = [];
let displayObjective = false;

let showHUD = false;

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

//Layout of different tile types for the background of outside

let BGoutside1 = [
  [11, 7, 3],
  [13, 7, 4],
  [11, 6, 4],
  [12, 9, 1],
  [10, 7, 4],
  [13, 5, 2],
  [12, 8, 4],
  [11, 7, 3],
  [13, 9, 1],
  [12, 5, 4],
  [14, 8, 2]
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

class objectiveBoxClass {
  constructor(objectiveID, objective) {
    this.objectiveID = objectiveID;
    this.objective = objective;
  }

  displayObjective () {

    push()

    translate(-590, -330)

    push()
    fill('black')
    rect(0, 0, 330, 200)
    fill(255, 255, 255, 200)
    rect(0, 0, 315, 185)
    fill('black')
    rect(0, 0, 300, 170)

    for (let scanLines = 0; scanLines < 16; scanLines++) {

      push()

      translate(0, -97)
      fill(255, 255, 255, 20)
      
      let scanLinePosition = (scanLineY + (25 * scanLines) - 100) % 197

      if (scanLinePosition < 0) {
        scanLinePosition += 197
      }

      rect(0, scanLinePosition, 315, 6)

      pop()
    }

    pop()

    push()
    fill('white')
    textFont(VT323Font, 50)
    textAlign(CENTER, CENTER)
    text("OBJECTIVE:", 0, -55)
    text(this.objective, 0, 10)
    pop()

    pop()
    
  }
}

class spriteQuinnClass {
  constructor(sprite, animArray, spriteXpos, spriteYpos) {
    this.sprite = sprite;
    this.animArray = animArray;
    this.spriteXpos = spriteXpos;
    this.spriteYpos = spriteYpos;
  }

  displayStaticSprite() {
    walkingXpos = 0
    push()
    scale(quinnFacing, 1)

    if (quinnFacing == 1) {
      walkingXpos = this.spriteXpos + SPRrightAmount - SPRleftAmount
    } else {
      walkingXpos = -(this.spriteXpos + SPRrightAmount - SPRleftAmount - 64)
    }

    image(this.sprite, -walkingXpos, this.spriteYpos, 128, 128)
    pop()

    outsideIntTextPositionX = walkingXpos
  }

  displayWalkingSprite() {
    walkingXpos = 0

    push()
    scale(quinnFacing, 1)

    if (quinnFacing == 1) {
      walkingXpos = this.spriteXpos + SPRrightAmount - SPRleftAmount
    } else {
      walkingXpos = -(this.spriteXpos + SPRrightAmount - SPRleftAmount - 64)
    }

    image(this.animArray[currentQuinnWalkFrame], -walkingXpos, this.spriteYpos, 128, 128)

    outsideIntTextPositionX = walkingXpos
    pop()
  }

}

//preload assets here to speed up programe running
function preload() {

  //menu assets
  STALKlogo = loadImage("assets/STALKlogo.png")

  //overlay videos
  VHSoverlay = createVideo("assets/vhsOverlay.mp4")
  groggyOverlay = createVideo("assets/groggyOverlay.mp4")

  //font
  VT323Font = loadFont("assets/fonts/VT323-Regular.ttf")

  //background tiles (outside)
  OSfloor1 = loadImage("assets/OSFloor1.png")
  OSfloor2 = loadImage("assets/OSFloor2.png")
  OSfloor3 = loadImage("assets/OSFloor3.png")
  OSfloor4 = loadImage("assets/OSFloor4.png")
  OSwall1 = loadImage("assets/OSWall1.png")
  OSwall2 = loadImage("assets/OSWall2.png")
  OSwall3 = loadImage("assets/OSWall3.png")
  OSwall4 = loadImage("assets/OSWall4.png")
  OSwall5 = loadImage("assets/OSWall5.png")
  OSsky1 = loadImage("assets/OSSky1.png")
  OSsky2 = loadImage("assets/OSSky2.png")
  OSsky3 = loadImage("assets/OSSky3.png")
  OSsky4 = loadImage("assets/OSSky4.png")
  OSskyMan = loadImage("assets/OSSkyMan.png")

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
  MIRleft = loadImage("assets/MIR_left.png")
  MIRright = loadImage("assets/MIR_right.png")


  //JSONs
  dialogueData = loadJSON("dialogueData.json")
  playerData = loadJSON("playerData.json")

  //character sprites
  SPRquinnStanding = loadImage("assets/SPRITE_quinnStanding.png")
  SCNmanFigure = loadImage("assets/SCN_ManFigure.png")
  SCNmanRevealed = loadImage("assets/SCN_ManRevealed.png")
  SCNmanHappy = loadImage("assets/SCN_manHappy.png")
  SCNmanAngry = loadImage("assets/SCN_manAngry.png")
  MIRquinnLookForward = loadImage("assets/MIR_quinnLookForward.png")
  MIRquinnLookSide = loadImage("assets/MIR_quinnLookSide.png")

  //Quinn's walking animation
  SPRquinnWalk1 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim1.png")
  SPRquinnWalk2 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim2.png")
  SPRquinnWalk3 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim3.png")
  SPRquinnWalk4 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim4.png")
  SPRquinnWalk5 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim5.png")
  SPRquinnWalk6 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim6.png")
  SPRquinnWalk7 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim7.png")
  SPRquinnWalk8 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim8.png")
  SPRquinnWalk9 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim9.png")
  SPRquinnWalk10 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim10.png")
  SPRquinnWalk11 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim11.png")
  SPRquinnWalk12 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim12.png")
  SPRquinnWalk13 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim13.png")
  SPRquinnWalk14 = loadImage("assets/quinn_walking_animation/SPRITE_quinnWalkingAnim14.png")

  //mini map
  MMbath1 = loadImage("assets/minimap/MM_bath1.png")
  MMbath2 = loadImage("assets/minimap/MM_bath2.png")
  MMbed1 = loadImage("assets/minimap/MM_bed1.png")
  MMbed2 = loadImage("assets/minimap/MM_bed2.png")
  MMstudy = loadImage("assets/minimap/MM_study.png")
  MMhall1 = loadImage("assets/minimap/MM_hall1.png")
  MMhall2 = loadImage("assets/minimap/MM_hall2.png")
  MMhall3 = loadImage("assets/minimap/MM_hall3.png")
  MMkitchen1 = loadImage("assets/minimap/MM_kitchen1.png")
  MMkitchen2 = loadImage("assets/minimap/MM_kitchen2.png")
  MMkitchen3 = loadImage("assets/minimap/MM_kitchen3.png")
  MMlr1 = loadImage("assets/minimap/MM_lr1.png")
  MMlr2 = loadImage("assets/minimap/MM_lr2.png")
  MMlr3 = loadImage("assets/minimap/MM_lr3.png")

  //Items
  ITMknife1 = loadImage("assets/items/ITM_knife1.png")
  ITMknife2 = loadImage("assets/items/ITM_knife2.png")
  ITMknife3 = loadImage("assets/items/ITM_knife3.png")
  ITMknife4 = loadImage("assets/items/ITM_knife4.png")

  ITMphone1 = loadImage("assets/items/ITMphone1.png")
  ITMphone2 = loadImage("assets/items/ITMphone2.png")
  ITMphone3 = loadImage("assets/items/ITMphone3.png")
  ITMphone4 = loadImage("assets/items/ITMphone4.png")

  //endings
  ENDbetterSafe = loadImage("assets/endings/END_betterSafe.png")
  ENDblessYou = loadImage("assets/endings/END_blessYou.png")
  ENDcallFailed = loadImage("assets/endings/END_callFailed.png")
  ENDeepy = loadImage("assets/endings/END_eepy.png")
  ENDhiding = loadImage("assets/endings/END_hiding.png")
  ENDmurderMan = loadImage("assets/endings/END_murderMan.png")
  ENDradio = loadImage("assets/endings/END_radio.png")
  ENDslippery = loadImage("assets/endings/END_slippery.png")
  ENDsnooze = loadImage("assets/endings/END_snooze.png")
  ENDstalk = loadImage("assets/endings/END_stalkTheStalker.png")
  ENDtoldYou = loadImage("assets/endings/END_toldYou.png")
  ENDtrip = loadImage("assets/endings/END_trip.png")
  ENDuno = loadImage("assets/endings/END_unoReverse.png")

  ENDbetterSafeGS = loadImage("assets/endings/END_betterSafeGS.png")
  ENDblessYouGS = loadImage("assets/endings/END_blessYouGS.png")
  ENDcallFailedGS = loadImage("assets/endings/END_callFailedGS.png")
  ENDeepyGS = loadImage("assets/endings/END_eepyGS.png")
  ENDhidingGS = loadImage("assets/endings/END_hidingGS.png")
  ENDmurderManGS = loadImage("assets/endings/END_murderManGS.png")
  ENDradioGS = loadImage("assets/endings/END_radioGS.png")
  ENDslipperyGS = loadImage("assets/endings/END_slipperyGS.png")
  ENDsnoozeGS = loadImage("assets/endings/END_snoozeGS.png")
  ENDstalkGS = loadImage("assets/endings/END_stalkTheStalkerGS.png")
  ENDtoldYouGS = loadImage("assets/endings/END_toldYouGS.png")
  ENDtripGS = loadImage("assets/endings/END_tripGS.png")
  ENDunoGS = loadImage("assets/endings/END_unoReverseGS.png")

  //minigames
  MGarrow1 = loadImage("assets/minigames/MG_arrow1.png")
  MGarrow2 = loadImage("assets/minigames/MG_arrow2.png")
  MGarrow3 = loadImage("assets/minigames/MG_arrow3.png")
  MGarrow4 = loadImage("assets/minigames/MG_arrow4.png")
  MGchain0 = loadImage("assets/minigames/MG_chain0.png")
  MGchain1 = loadImage("assets/minigames/MG_chain1.png")
  MGchain2 = loadImage("assets/minigames/MG_chain2.png")
  MGchain3 = loadImage("assets/minigames/MG_chain3.png")
  MGchainPointer = loadImage("assets/minigames/MG_chainPointer.png")
  MGchainFull = loadImage("assets/minigames/MG_chainFull.png")
  MGlockBG = loadImage("assets/minigames/MG_lockBackground.png")
  MGlockHolder = loadImage("assets/minigames/MG_lockHolder.png")
  MGlockPin = loadImage("assets/minigames/MG_lockPin.png")


  //ending animation unlock frames

  for (let i = 1; i < 72; i++) {
    ENDanimationFrames[i-1] = loadImage(`assets/endingAnim/frame${i}.gif`)
  }

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
  buildObjectiveBox()

  SPR_quinnWalkAnimArray = [SPRquinnWalk1, SPRquinnWalk2, SPRquinnWalk3, SPRquinnWalk4, SPRquinnWalk5, SPRquinnWalk6, SPRquinnWalk7, SPRquinnWalk8, SPRquinnWalk9, SPRquinnWalk10, SPRquinnWalk11, SPRquinnWalk12, SPRquinnWalk13, SPRquinnWalk14]

  SPR_quinn = new spriteQuinnClass(SPRquinnStanding, SPR_quinnWalkAnimArray, 0, 120)

  for (let addArrayCount = 0; addArrayCount < 42; addArrayCount ++) {
    interactionCounts.push(0)
  }

  ITMknifeAnim = [ITMknife4, ITMknife4, ITMknife3, ITMknife3, ITMknife2, ITMknife2, ITMknife1, ITMknife1, ITMknife1, ITMknife1, ITMknife2, ITMknife2, ITMknife3, ITMknife3, ITMknife4, ITMknife4]
  ITMphoneAnim = [ITMphone1, ITMphone1, ITMphone2, ITMphone2, ITMphone3, ITMphone3, ITMphone4, ITMphone4, ITMphone4, ITMphone4, ITMphone3, ITMphone3, ITMphone2, ITMphone2, ITMphone1, ITMphone1]

  branchDiagramUnlocks = [
  ["UNO reverse", false, ENDuno, ENDunoGS],
  ["Hey! I'm hidin' here!", false, ENDhiding, ENDhidingGS],
  ["Slippery when Dead", false, ENDslippery, ENDslipperyGS],
  ["Bless you", false, ENDblessYou, ENDblessYouGS],
  ["I told you", false, ENDtoldYou, ENDtoldYouGS],
  ["Call failed", false, ENDcallFailed, ENDcallFailedGS],
  ["Better safe than... oh.", false, ENDbetterSafe, ENDbetterSafeGS],
  ["Have a nice trip!", false, ENDtrip, ENDtripGS],
  ["Snooze and lose", false, ENDsnooze, ENDsnoozeGS],
  ["Not today, Murder Man", false, ENDmurderMan, ENDmurderManGS],
  ["Radio Silence", false, ENDradio, ENDradioGS],
  ["eepy", false, ENDeepy, ENDeepyGS],
  ["Stalk the Stalker", false, ENDstalk, ENDstalkGS]
  ]

}

//Update if window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black')
}

function BGtiles() {

  let BGtileID = 0
  
  //resets existing tile map to clean/empty map for new environment to be added
  BGtileMap = []

  if (currentGameState == 1) {
    BGtilesX = 11
  } else {
    BGtilesX = 5
  }

  //iterate through each row of tiles
  for (let tileX = 0; tileX < BGtilesX; tileX++) {

    //create a new array within the tileMap array, corresponding to each row in the on-screen tileMap
    //clears any previously stored array in that row
    BGtileMap[tileX] = []


    //iterate through each column of tiles within a row
    for (let tileY = 0; tileY < BGtilesY; tileY++) {

      if (currentGameState == 1) {

      let mapToUse = null

        if (currentLocation == 1) {
          mapToUse = BGoutside1
        }

        if (mapToUse[tileX][tileY] == 1) {
          tileImage = OSfloor1
        } else if (mapToUse[tileX][tileY] == 2) {
          tileImage = OSfloor2
        } else if (mapToUse[tileX][tileY] == 3) {
          tileImage = OSfloor3
        } else if (mapToUse[tileX][tileY] == 4) {
          tileImage = OSfloor4
        } else if (mapToUse[tileX][tileY] == 5) {
          tileImage = OSwall1
        } else if (mapToUse[tileX][tileY] == 6) {
          tileImage = OSwall2
        } else if (mapToUse[tileX][tileY] == 7) {
          tileImage = OSwall3
        } else if (mapToUse[tileX][tileY] == 8) {
          tileImage = OSwall4
        } else if (mapToUse[tileX][tileY] == 9) {
          tileImage = OSwall5
        } else if (mapToUse[tileX][tileY] == 10) {
          tileImage = OSsky1
        } else if (mapToUse[tileX][tileY] == 11) {
          tileImage = OSsky2
        } else if (mapToUse[tileX][tileY] == 12) {
          tileImage = OSsky3
        } else if (mapToUse[tileX][tileY] == 13) {
          tileImage = OSsky4
        } else if (mapToUse[tileX][tileY] == 14) {
          tileImage = OSskyMan
        } else {
          tileImage = BLANKtile
        }

      } else if (currentGameState == 2) {

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
      }

      //adds new tile to tile map!
      BGtileMap[tileX][tileY] = new BGtileClass(tileX, tileY, BGtileSize, BGtileID, tileImage)
      BGtileID++

    }
  }
}

function miniMap() {

  let miniMapDisplay = null;

  if (displayingDialogue == false) {
    if (currentLocation == 1 && currentFocus == 1) {
      miniMapDisplay = MMhall1
    } else if (currentLocation == 1 && currentFocus == 2) {
      miniMapDisplay = MMhall3
    } else if (currentLocation == 1 && currentFocus == 3) {
      miniMapDisplay = MMhall2
    } else if (currentLocation == 2 && currentFocus == 1) {
      miniMapDisplay = MMlr1
    } else if (currentLocation == 2 && currentFocus == 2) {
      miniMapDisplay = MMlr3
    } else if (currentLocation == 2 && currentFocus == 3) {
      miniMapDisplay = MMlr2
    } else if (currentLocation == 3 & currentFocus == 1) {
      miniMapDisplay = MMkitchen2
    } else if (currentLocation == 3 && currentFocus == 2) {
      miniMapDisplay = MMkitchen3
    } else if (currentLocation == 3 && currentFocus == 3) {
      miniMapDisplay = MMkitchen1
    } else if (currentLocation == 4 && currentFocus == 1) {
      miniMapDisplay = MMbath1
    } else if (currentLocation == 4 && currentFocus == 2) {
      miniMapDisplay = MMbath2
    } else if (currentLocation == 5 && currentFocus == 1) {
      miniMapDisplay = MMbed1
    } else if (currentLocation == 5 && currentFocus == 2) {
      miniMapDisplay = MMstudy
    } else if (currentLocation == 5 && currentFocus == 3) {
      miniMapDisplay = MMbed2
    }
  }

  push()
  fill('white')
  rect(615, -290, 310, 310)
  if (miniMapDisplay != null) {
    image(miniMapDisplay, 615, -290, 300, 300)
  }
  pop()

}

function checkKeyPress() {
  

  let SPRaddLeft = 0;
  let SPRaddRight = 0;
  let BGscrollAdd = 0;

  if (quinnMovable != false) {
    if ((SPRrightAmount - SPRleftAmount) <= -550) {
      SPRaddLeft = 0
      SPRaddRight = 4
    } else if ((SPRrightAmount - SPRleftAmount) >= 620) {
      SPRaddLeft = 4
      SPRaddRight = 0
    } else {
      SPRaddLeft = 4
      SPRaddRight = 4
    }
  } else {
    SPRaddLeft = 0
    SPRaddRight = 0
  }


  if (keyIsDown(69) && outsideIntID == 1) {
    currentLocation = 1
    currentFocus = 1
    quinnMovable = false

    intermediateGameState = 2
    fadingInit = true
    fadingForward = true

  }

  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    quinnFacing = -1
    SPR_quinn.displayWalkingSprite()
    SPRleftAmount += SPRaddLeft
    if (currentQuinnWalkFrame == 13) {
      currentQuinnWalkFrame = 0
    } else {
      currentQuinnWalkFrame ++
    }
    if (BGscrollAmount <= -1470) {
      BGscrollAdd = 0
    } else {
      BGscrollAdd = 6
    }
    BGscrollAmount -= BGscrollAdd
  } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    quinnFacing = 1
    SPR_quinn.displayWalkingSprite()
    SPRrightAmount += SPRaddRight
    if (currentQuinnWalkFrame == 13) {
      currentQuinnWalkFrame = 0
    } else {
      currentQuinnWalkFrame ++
    }
    if (BGscrollAmount >= 0) {
      BGscrollAdd = 0
    } else {
      BGscrollAdd = 6
    }
    BGscrollAmount += BGscrollAdd
  } else {
    SPR_quinn.displayStaticSprite()
  }


  if (BGscrollAmount < -440 && outsideStoryPoint == false) {
    outdoorsStoryPointTrigger()
  } else {
    outsideInteract()
  }

}

function outsideInteract() {

  let outsideIntText = '';

  if (quinnFacing == 1) {
    outsideIntTextPositionX = -outsideIntTextPositionX + 32
  } else {
    outsideIntTextPositionX = outsideIntTextPositionX - 32
  }

  
  fill('white')
  textFont(VT323Font, 30)
  textAlign(CENTER, CENTER)

  if (outsideIntTextPositionX <= 580 && outsideIntTextPositionX >= 520) {
    outsideIntText = 'Enter Apartment - E'
    outsideIntID = 1
  } else {
    outsideIntText = ''
    outsideIntID = 0
  }

  push()
  text(outsideIntText, outsideIntTextPositionX, 40)
  pop()

}

function outdoorsStoryPointTrigger() {

  outsideStoryPoint = true
  quinnMovable = false
  displayObjective = false

  if (cutScenes[1] == false && appearStage < 200) {

    appearStage = 0
    appearBlend = 1
    cutScenes[1] = true

  } else {

    push()
    fill(20, 27, 47)
    rect(0, 0, 1280, 770)
    pop()

    if (appearStage == 0) {

      displayingDialogue = true
      dialogueToDisplay = 5
      dialogueType = 'story'

      image(SCNmanFigure, 0, 0)

      appearStage ++


    } else if (appearStage < 24) {

      push()
      image(SCNmanFigure, 0, 0)

      if (displayingDialogue == false) {
        appearStage ++
      }
      
      pop()

    } else if (appearStage < 152) {

      push()
      image(SCNmanRevealed, 0, 0)
      tint(255, 255-appearBlend)
      image(SCNmanFigure, 0, 0)
      noTint()

      appearStage ++
      appearBlend += 2
      pop()

    } else if (appearStage == 152) {

      displayingDialogue = true
      dialogueToDisplay = 6
      dialogueType = 'story'

      appearStage ++

      image(SCNmanRevealed, 0, 0)

    } else if (appearStage == 153 && displayingDialogue == false) {

      image(SCNmanRevealed, 0, 0)
      appearStage ++
      
    } else if (appearStage == 154 && displayingDialogue == false) {


      if (branchCodeArray[0][1] == true) {

        image(SCNmanHappy, 0, 0)
        displayingDialogue = true
        dialogueToDisplay = 7
        dialogueType = 'story'
      } else {

        image(SCNmanAngry, 0, 0)
        displayingDialogue = true
        dialogueToDisplay = 8
        dialogueType = 'story'
      }

      appearStage ++

    } else if (appearStage == 155 && displayingDialogue == false) {

      if (branchCodeArray[0][1] == true) {

        image(SCNmanHappy, 0, 0)

      } else {

        image(SCNmanAngry, 0, 0)
      }

      appearStage ++
    
    } else if (appearStage == 156 && displayingDialogue == false) {


      if (branchCodeArray[0][1] == false) {

        image(SCNmanAngry, 0, 0)
        displayingDialogue = true
        dialogueToDisplay = 9
        dialogueType = 'story'
      } else {

        image(SCNmanHappy, 0, 0)
      }

      appearStage ++
    
    } else if (appearStage > 156 && displayingDialogue == false && appearStage < 205) {

      image(SCNmanRevealed, 0, 0)
      fadingInit = true
      fadingForward = true

      appearStage++

    } else if (appearStage == 205) {

      image(SCNmanRevealed, 0, 0)

      cutScenes[1] = false
      quinnMovable = true

    } else {

      if (displayingDialogue == true) {

        if (branchCodeArray[0][1] == false) {

          image(SCNmanAngry, 0, 0)
  
        } else if (branchCodeArray[0][1] == true) {
  
          image(SCNmanHappy, 0, 0)

        } else {

          image(SCNmanRevealed, 0, 0)

        }

      } else {

        image(SCNmanRevealed, 0, 0)
        
      }


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
  //empty list ready to contain all dialogue box instances
  interactDialogueBoxes = [];
  storyDialogueBoxes = [];

  // ===== JSON DIALOGUE SYSTEM: Load dialogue from JSON instead of hardcoded arrays =====
  // Load interact dialogue from JSON
  for (let dialogue of dialogueData.interactDialogue) {
    if (dialogue.text != null) {
      interactDialogueBoxes[dialogue.id] = new dialogueBoxClass(
        dialogue.id,
        dialogue.text,
        dialogue.choices ? dialogue.choices[0] : null,
        dialogue.choices ? dialogue.choices[1] : null
      );
    }
  }

  // Load story dialogue from JSON
  for (let dialogue of dialogueData.storyDialogue) {
    storyDialogueBoxes[dialogue.id] = new dialogueBoxClass(
      dialogue.id,
      dialogue.text,
      dialogue.choices ? dialogue.choices[0] : null,
      dialogue.choices ? dialogue.choices[1] : null
    );
  }
}

function buildObjectiveBox() {
  //empty list ready to contain all objective box instances
  objectiveBoxes = [];


  for (let objectivesAdded = 0; objectivesAdded < objectiveArray.length; objectivesAdded++) {
    objectiveBoxes[objectivesAdded] = new objectiveBoxClass(objectivesAdded, objectiveArray[objectivesAdded])
  }

}

function displayInteractText(interactIDinput) {

  fill('white')
  textFont(VT323Font, 30)
  textAlign(CENTER, CENTER)


  let hoverText = dialogueData.interactDialogue.find(item => item.id === interactIDinput-1)

  text(hoverText.hover, newMouseX, newMouseY - 30)

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

function ITMcollected(itemType) {

  if (itemType == 'knife') {

    image(ITMknifeAnim[ITMcollectAnimTick], 0, 0)

  } else if (itemType == 'phone') {

    image(ITMphoneAnim[ITMcollectAnimTick], 0, 0)

  }

  if (ITMcollectAnimTick == 14) {
    ITMcollectAnimTick = 0
  } else {
    ITMcollectAnimTick ++
  }

}

function manageActionOrder(branchToChange) {

  branchCodeArray[branchToChange][2] = actionOrder
  actionOrder ++
  branchCodeArray[branchToChange][3] = currentPlayStage

}

function checkMouseHover() {

  interactID = 0
  alternativeInteractText = null

  if (inputBlocked == false && (currentGameState == 2 || currentGameState == 1)) {
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

    } else if (currentGameState == 2) {
      
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
            if ((currentPlayStage == 2 || currentPlayStage == 4) && interactionCounts[0] == 0) {
              interactID = 1
            }
          } else if (46 < newMouseX && newMouseX < 112 && 75 < newMouseY && newMouseY < 112) {
            if (currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6 || currentPlayStage == 7) {
              if (currentPlayStage < 7 && interactionCounts[1] == 0) {
                interactID = 2
              } else if (branchCodeArray[1][1] == false && branchCodeArray[2][1] == false && currentPlayStage == 7) {
                interactID = 2
                alternativeInteractText = 69
              }
            }
          } else if (95 < newMouseX && newMouseX < 112 && 125 < newMouseY && newMouseY < 160) {
            if (currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6 || currentPlayStage == 7) {
              if (currentPlayStage < 7) {
                if (branchCodeArray[1][1] == null) {
                  interactID = 3
                  interactionCounts[2] = 0
                } else if (branchCodeArray[1][1] == true && interactionCounts[2] == 1) {
                  interactID = 3
                  alternativeInteractText = 42
                }
              } else if (branchCodeArray[1][1] == true) {
                interactID = 3
                alternativeInteractText = 64
              }
            }
          } else if (80 < newMouseX && newMouseX < 180 && -80 < newMouseY && newMouseY < -30) {
            if (currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6 || currentPlayStage == 7) {
              if (currentPlayStage < 7) {
                if (branchCodeArray[2][1] == null) {
                  interactID = 4
                  interactionCounts[3] = 0
                } else if (branchCodeArray[2][1] == true && interactionCounts[3] == 1) {
                  interactID = 4
                  alternativeInteractText = 43
                }
              } else if (branchCodeArray[2][1] == true) {
                interactID = 4
                alternativeInteractText = 65
              }
            }
          } else if (-340 < newMouseX && newMouseX < -210 && -160 < newMouseY && newMouseY < 190) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[3] == 0) {
              interactID = 5
            }
          }
        } else if (currentLocation == 1 && currentFocus == 2) {
          if (-580 < newMouseX && newMouseX < -320 && -112 < newMouseY && newMouseY < 380) {
            interactID = 6
            if (currentPlayStage == 1) {
              alternativeInteractText = 54
            } else if (currentPlayStage == 2.5) {
              alternativeInteractText = 47
            }
          } else if (6 < newMouseX && newMouseX < 150 && 290 < newMouseY && newMouseY < 380) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && branchCodeArray[3][1] == null) {
              interactID = 7
            }
          } else if (375 < newMouseX && newMouseX < 450 && 240 < newMouseY && newMouseY < 380) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[7] < 2) {
              interactID = 8
              if (interactionCounts[7] == 1) {
                alternativeInteractText = 46
              }
            } else if (currentPlayStage == 7 && interactionCounts[7] < 3) {
              interactID = 8
              alternativeInteractText = 57
            }
          }
        } else if (currentLocation == 1 && currentFocus == 3) {
          if (-630 < newMouseX && newMouseX < -370 && -112 < newMouseY && newMouseY < 380) {
            interactID = 9
            if (currentPlayStage == 1) {
              alternativeInteractText = 54
            } else if (currentPlayStage == 2.5) {
              alternativeInteractText = 47
            } else if (currentPlayStage == 3) {
              alternativeInteractText = 45
            } else if (currentPlayStage == 5) {
              alternativeInteractText = 59
            }
          } else if (370 < newMouseX && newMouseX < 630 && -112 < newMouseY && newMouseY < 380) {
            interactID = 10
            if (currentPlayStage == 3 && branchCodeArray[12][1] == 'sofa') {
              alternativeInteractText = 45
            } else if (currentPlayStage == 5) {
              alternativeInteractText = 59
            }
          } else if (140 < newMouseX && newMouseX < 300 && 120 < newMouseY && newMouseY < 200) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[10] == 0) {
              interactID = 11
            }
          } else if (100 < newMouseX && newMouseX < 330 && -80 < newMouseY && newMouseY < 80) {
            if (currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6 || currentPlayStage == 7) {
              if (currentPlayStage < 6 && interactionCounts[11] == 0) {
                interactID = 12
              } else if (currentPlayStage > 5) {
                if (interactionCounts[11] == 0) {
                  interactionCounts[11] = 1
                }
                if (interactionCounts[11] == 1) {
                  interactID = 12
                  alternativeInteractText = 44
                }
              }
            }

          }
        } else if (currentLocation == 2 && currentFocus == 1) {
          if (-311 < newMouseX && newMouseX < 311 && -340 < newMouseY && newMouseY < 75) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[12] == 0) {
              interactID = 13
            }
          }
        } else if (currentLocation == 2 && currentFocus == 2) {
          if (-80 < newMouseX && newMouseX < 310 && 90 < newMouseY && newMouseY < 190) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[13] == 0) {
              interactID = 14
            }
          } else if (-80 < newMouseX && newMouseX < 310 && 200 < newMouseY && newMouseY < 330) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[14] == 0) {
              interactID = 15
            }
          } else if (-65 < newMouseX && newMouseX < 95 && -120 < newMouseY && newMouseY < 30) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[15] == 0) {
              interactID = 16
            }
          } else if (370 < newMouseX && newMouseX < 630 && -120 < newMouseY && newMouseY < 380) {
            interactID = 17
            if (currentPlayStage == 3 && branchCodeArray[12][1] == 'sofa') {
              alternativeInteractText = 45
            } else if (currentPlayStage == 5) {
              alternativeInteractText = 59
            }
          }
        } else if (currentLocation == 2 && currentFocus == 3) {
          if (-150 < newMouseX && newMouseX < 100 && -110 < newMouseY && newMouseY < 390) {
            interactID = 18
            if (currentPlayStage == 1) {
              alternativeInteractText = 54
            } else if (currentPlayStage == 2.5) {
              alternativeInteractText = 47
            } else if (currentPlayStage == 3) {
              alternativeInteractText = 45
            }
          } else if (-120 < newMouseX && newMouseX < 70 && -320 < newMouseY && newMouseY < -130) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[18] == 0) {
              interactID = 19
            }
          } else if (-500 < newMouseX && newMouseX < -280 && -5 < newMouseY && newMouseY < 210) {
            if (currentPlayStage == 3 && interactionCounts[19] == 0) {
              interactID = 20
            }
          }
        } else if (currentLocation == 3 && currentFocus == 1) {
          if (-600 < newMouseX && newMouseX < -380 && 190 < newMouseY && newMouseY < 240) {
            if (currentPlayStage == 3 && branchCodeArray[12][1] == null) {
              interactID = 21
            }
          }
        } else if (currentLocation == 3 && currentFocus == 2) {
          if (280 < newMouseX && newMouseX < 340 && -70 < newMouseY && newMouseY < 80) {
            if (currentPlayStage == 6 && interactionCounts[21] == 0) {
              interactID = 22
            }
          } else if (400 < newMouseX && newMouseX < 610 && 140 < newMouseY && newMouseY < 340) {
            if ((currentPlayStage == 1 || currentPlayStage == 2.5) && interactionCounts[22] < 2 && interactionCounts[24] > 0) {
              interactID = 23
              if (currentPlayStage == 2.5) {
                alternativeInteractText = 56
              }
            }
          } else if (-620 < newMouseX && newMouseX < -380 && -112 < newMouseY && newMouseY < 380) {
            interactID = 24
            if (currentPlayStage == 1) {
              alternativeInteractText = 54
            } else if (currentPlayStage == 2.5) {
              alternativeInteractText = 47
            } else if (currentPlayStage == 3 && branchCodeArray[12][1] != 'sofa') {
              alternativeInteractText = 45
            }
          }
        } else if (currentLocation == 3 && currentFocus == 3) {
          if (-390 < newMouseX && newMouseX < -130 && -260 < newMouseY && newMouseY < 390) {
            if (currentPlayStage == 1 && interactionCounts[24] == 0) {
              interactID = 25
            }
          } else if (30 < newMouseX && newMouseX < 220 && 0 < newMouseY && newMouseY < 100) {
            if ((currentPlayStage == 2 || currentPlayStage == 4) && branchCodeArray[13][1] == null) {
              interactID = 26
            } else if (currentPlayStage > 5) {
              interactID = 26
              if (branchCodeArray[13][1] == true) {
                alternativeInteractText = 55
              } else {
                alternativeInteractText = 49
              }
            }
          }
        } else if (currentLocation == 4 && currentFocus == 1) {
          if (-300 < newMouseX && newMouseX < -75 && 110 < newMouseY && newMouseY < 240) {
            if (currentPlayStage == 4 && interactionCounts[26] == 0) {
              interactID = 27
            } else if (currentPlayStage == 6) {
              if (interactionCounts[26] == 0) {
                interactionCounts[26] = 1
              }
              if (interactionCounts[26] == 1) {
                interactID = 27
                alternativeInteractText = 58
              }
            }
          } else if (-400 < newMouseX && newMouseX < 20 && -170 < newMouseY && newMouseY < 55) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[27] < 2) {
              interactID = 28
              if (currentPlayStage == 6 && interactionCounts[27] == 1) {
                alternativeInteractText = 60
              }
            }
          } else if (400 < newMouseX && newMouseX < 590 && 190 < newMouseY && newMouseY < 335) {
            if ((currentPlayStage == 6) && interactionCounts[28] == 0) {
              interactID = 29
            }
          } else if (65 < newMouseX && newMouseX < 320 && -112 < newMouseY && newMouseY < 380) {
            interactID = 30
          }
        } else if (currentLocation == 4 && currentFocus == 2) {
          if (-130 < newMouseX && newMouseX < 380 && 170 < newMouseY && newMouseY < 350) {
            if (currentPlayStage == 4 && branchCodeArray[14][1] == null) {
              interactID = 31
            } else if (currentPlayStage == 7) {
              alternativeInteractText = 50
            }
          } else if (140 < newMouseX && newMouseX < 370 && -80 < newMouseY && newMouseY < 175) {
            if ((currentPlayStage > 5) && interactionCounts[31] == 0) {
              interactID = 32
            }
          } else if (-340 < newMouseX && newMouseX < -165 && 120 < newMouseY && newMouseY < 330) {
            if ((currentPlayStage == 2 || currentPlayStage == 4) && interactionCounts[32] == 0) {
              interactID = 33
            } else if ((currentPlayStage == 4 || currentPlayStage == 6) && branchCodeArray[14][1] == true) {
              interactID = 33
              alternativeInteractText = 61
            }
          }
        } else if (currentLocation == 5 && currentFocus == 1) {
          if (140 < newMouseX && newMouseX < 630 && 190 < newMouseY && newMouseY < 330) {
            if (currentPlayStage == 5) {
              interactID = 34
            }
          } else if (190 < newMouseX && newMouseX < 600 && 330 < newMouseY && newMouseY < 380) {
            if ((currentPlayStage == 4 || currentPlayStage == 5) && interactionCounts[34] == 0) {
              interactID = 35
            } else if (currentPlayStage == 7) {
              interactID = 35
              alternativeInteractText = 62
            }
          } else if (-115 < newMouseX && newMouseX < 360 && -160 < newMouseY && newMouseY < 60) {
            if ((3 < currentPlayStage < 7) && branchCodeArray[17][1] == null) {
              interactID = 36
            }
          }
        } else if (currentLocation == 5 && currentFocus == 2) {
          if (-115 < newMouseX && newMouseX < 110 && -70 < newMouseY && newMouseY < 130) {
            if (interactionCounts[36] == 0 && currentPlayStage < 7) {
              interactID = 37
            }
          }
        } else if (currentLocation == 5 && currentFocus == 3) {
          if (-255 < newMouseX && newMouseX < -130 && 80 < newMouseY && newMouseY < 130) {
            if (branchCodeArray[18][1] == null && currentPlayStage < 7) {
              interactID = 38
            }
          } else if (110 < newMouseX && newMouseX < 350 && -250 < newMouseY && newMouseY < 330) {
            if (currentPlayStage < 6 && interactionCounts[38] == 0) {
              interactID = 39
            } else if (currentPlayStage == 7) {
              interactID = 39
              alternativeInteractText = 63
            }
          } else if (380 < newMouseX && newMouseX < 640 && -112 < newMouseY && newMouseY < 380) {
            interactID = 40
            if (currentPlayStage == 5) {
              alternativeInteractText = 59
            }
          } else if (-240 < newMouseX && newMouseX < -35 && 190 < newMouseY && newMouseY < 340) {
            if (interactionCounts[40] == 0 && currentPlayStage < 7) {
              interactID = 41
            }
          } else if (-580 < newMouseX && newMouseX < -180 && -370 < newMouseY && newMouseY < 65) {
            if (interactionCounts[41] == 0 && currentPlayStage < 7) {
              interactID = 42
            }

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

function choiceMade(optionChosen) {
  
  if (dialogueType == 'interact') {
    if (dialogueToDisplay == 2) {
      if (optionChosen == 1) {
        manageActionOrder(1)
        branchCodeArray[1][1] = true
      }
    } else if (dialogueToDisplay == 3) {
      if (optionChosen == 1) {
        manageActionOrder(2)
        branchCodeArray[2][1] = true
      }
    } else if (dialogueToDisplay == 6) {
      if (optionChosen == 1) {
        manageActionOrder(3)
        branchCodeArray[3][1] = true
      }
    } else if (dialogueToDisplay == 19) {
      if (optionChosen == 1) {
        manageActionOrder(11)
        branchCodeArray[11][1] = 'horror'
        fadingInit = true
        fadingForward = true
        currentPlayStage = 6
        postFadeDialogue = true
        postFadeDialogueIndex = 14
      } else {
        manageActionOrder(11)
        branchCodeArray[11][1] = 'romcom'
        fadingInit = true
        fadingForward = true
        currentPlayStage = 6
        postFadeDialogue = true
        postFadeDialogueIndex = 15
      }
    } else if (dialogueToDisplay == 20) {
      if (optionChosen == 1) {
        manageActionOrder(12)
        branchCodeArray[12][1] = 'table'
        fadingInit = true
        fadingForward = true
        postFadeDialogue = true
        postFadeDialogueIndex = 11
        currentPlayStage = 4
        playStageInteractCounter = 0
      } else {
        manageActionOrder(12)
        branchCodeArray[12][1] = 'sofa'
        displayObjective = true
        currentObjective = 4
        currentPlayStage = 3
      }
    } else if (dialogueToDisplay == 25) {
      if (optionChosen == 1) {
        manageActionOrder(13)
        branchCodeArray[13][1] = true
      }
    } else if (dialogueToDisplay == 28) {
      if (optionChosen == 1) {
        manageActionOrder(15)
        branchCodeArray[15][1] = true
        fadingInit = true
        fadingForward = true
        postFadeDialogue = true
        postFadeDialogueIndex = 17
        currentPlayStage = 5
      } else {
        manageActionOrder(15)
        branchCodeArray[15][1] = false
      }
    } else if (dialogueToDisplay == 30) {
      if (optionChosen == 1) {
        manageActionOrder(14)
        branchCodeArray[14][1] = true
      }
    } else if (dialogueToDisplay == 35) {
      if (optionChosen == 1) {
        manageActionOrder(17)
        branchCodeArray[17][1] = true
      }
    } else if (dialogueToDisplay == 37) {
      if (optionChosen == 1) {
        manageActionOrder(18)
        branchCodeArray[18][1] = true
      }
    } else if (dialogueToDisplay == 48) {
      if (optionChosen == 1) {
        manageActionOrder(6)
        branchCodeArray[6][1] = true
      } else {
        manageActionOrder(6)
        branchCodeArray[6][1] = false
      }
    } else if (dialogueToDisplay == 50) {
      if (optionChosen == 1) {
        SP_hidingArray.push('shower')
      }
    } else if (dialogueToDisplay == 51) {
      if (optionChosen == 1) {
        fadingInit = true
        fadingForward = true
        currentPlayStage = 5
        postFadeDialogue = true
        postFadeDialogueIndex = 18
        playStageInteractCounter = 0

      }
    } else if (dialogueToDisplay == 62) {
      if (optionChosen == 1) {
        SP_hidingArray.push('bed')
      }
    } else if (dialogueToDisplay == 63) {
      if (optionChosen == 1) {
        SP_hidingArray.push('wardrobe')
      }
    }
  } else {
    if (cutScenes[1] == true) {
      if (optionChosen == 1) {
        manageActionOrder(18)
        branchCodeArray[0][1] = true
      } else if (optionChosen == 2) {
        manageActionOrder(18)
        branchCodeArray[0][1] = false
      }
    }
  }

  
}

//anything to do with clicking the mouse - tracking it's position, recording interaction, playing noise etc
function mouseClicked() {

  if (pickingPlayerData == true) {
    if (playerDataChoice == 'new') {

      enterNewPlayerName()
      pickingPlayerData = false
      enteringNewPlayer = true

    } else if (playerDataChoice == 'existing') {

      selectExistingPlayerName()
      pickingPlayerData = false
      selectingExistingPlayer = true

    }

  } else if (selectingExistingPlayer == true) {

    if (existingPlayerHover != null) {
      if (existingPlayerHover < 11) {
        currentPlayerData = existingPlayerHover - 1
        loadSelectedPlayerData()
        fadingInit = true
        fadingForward = true

        if (intermediateGameState == null) {
          intermediateGameState = 1
          postFadeDialogue = true
          postFadeDialogueIndex = 4
        }
        if (intermediateLocation == null && intermediateGameState == 2) {
          intermediateLocation = 1
          intermediateFocus = 1
          currentPlayStage = 1
          postFadeDialogue = true
          postFadeDialogueIndex = 0
        }

      } else {
        playerDataChoice = null
        selectingExistingPlayer = false
        pickingPlayerData = true

      }
    }

  } else if (currentGameState == 0 && -130 < newMouseX && newMouseX < 130 && 330 < newMouseY && newMouseY < 460) {
    fadingInit = true
    fadingForward = true

  } else if (MIRdisplay == true) {
    MIRdisplay = false

  } else if (pickingRewind == true && selectedRewindID != null) {
    
    rewindPlay(selectedRewindID)
    pickingRewind = false

  } else if (minigame2Active == true && minigame2Progress != 4) {
    checkMinigameClick()

  } else if (ITMcollectedType != null) {
    ITMarray.push(ITMcollectedType)

    if ((ITMcollectedType == 'phone') && (ITMarray.filter(item => item === 'phone').length == 1)) {
      displayingDialogue = true
      dialogueToDisplay = 12
      dialogueType = 'story'
    } else if (ITMcollectedType == 'phone') {
      displayingDialogue = true
      dialogueToDisplay = 13
      dialogueType = 'story'
    }
    ITMcollectedType = null

  } else if (currentGameState == 2 || currentGameState == 1) {
    if (inputBlocked == false) {
      if (displayingDialogue == true) {
        if (displayingChoice == true) {
          if (170 < newMouseX && newMouseX < 600 && 370 < newMouseY && newMouseY < 420) {
            choiceMade(1)
            displayingDialogue = false
            displayingChoice = false
          } else if (170 < newMouseX && newMouseX < 600 && 490 < newMouseY && newMouseY < 540) {
            choiceMade(2)
            displayingDialogue = false
            displayingChoice = false
          }
          manageObjectiveShown()
        } else {
          displayingDialogue = false
          if (currentPlayStage == 0 && currentGameState == 2) {
            currentPlayStage = 1
            cutScenes[0] = false
          }
          manageObjectiveShown()
        }
        
        if (dialogueToDisplay == 49 && dialogueType == 'interact') {
          ITMcollectedType = 'knife'
          manageActionOrder(18)
          branchCodeArray[20][1] = true
        }
  
      } else {
        if (-740 < newMouseX && newMouseX < -670 && -80 < newMouseY && newMouseY < 10) {
          leftNavClicked()
        } else if (670 < newMouseX && newMouseX < 740 && -80 < newMouseY && newMouseY < 10) {
          rightNavClicked()
        } else {
          if (interactID == 6 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 2
            intermediateFocus = 2
          } else if (interactID == 9 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 4
            intermediateFocus = 1
          } else if (interactID == 10 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 3
            intermediateFocus = 2
          } else if (interactID == 17 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 1
            intermediateFocus = 2
          } else if (interactID == 18 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 5
            intermediateFocus = 3
          } else if (interactID == 24 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 1
            intermediateFocus = 3
          } else if (interactID == 30 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 1
            intermediateFocus = 3
          } else if (interactID == 40 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 2
            intermediateFocus = 3
          } else if (interactID != 0) {

            checkNoInteractDialogue()
            if (noInteractDialogue == false) {

              if (alternativeInteractText == null) {
                displayingDialogue = true
                dialogueToDisplay = interactID - 1
                dialogueType = 'interact'
              } else {
                displayingDialogue = true
                dialogueToDisplay = alternativeInteractText
                dialogueType = 'interact'
                alternativeInteractText = null
              }

            }


            holdInteractCount = interactionCounts[interactID-1]
            holdInteractCount++
            interactionCounts[(interactID-1)] = holdInteractCount

            if (currentPlayStage == 2) {
              playStageInteractCounter ++
            } else if (currentPlayStage == 4) {
              playStageInteractCounter ++
            }


          }
        }
      }
    }
  }
}

function manageObjectiveShown() {
  if ((dialogueToDisplay == 4 || dialogueToDisplay == 10) && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 0
  } else if (dialogueToDisplay == 0 && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 1
  } else if (dialogueToDisplay == 24 && dialogueType == 'interact') {
    displayObjective = true
    currentObjective = 1
  } else if (dialogueToDisplay == 22 && dialogueType == 'interact') {
    currentPlayStage = 2
    displayObjective = true
    currentObjective = 2
  } else if (dialogueToDisplay == 56 && dialogueType == 'interact') {
    currentPlayStage = 3
    displayObjective = true
    currentObjective = 4
  } else if (dialogueToDisplay == 3 && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 3
  } else if (dialogueToDisplay == 11 && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 5
  } else if (dialogueToDisplay == 14 && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 5
  } else if (dialogueToDisplay == 15 && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 5
  } else if (dialogueToDisplay == 18 && dialogueType == 'story') {
    currentPlayStage = 6
    fadingForward = true
    fadingInit = true
    postFadeDialogue = true
    postFadeDialogueIndex = 16
  } else if (dialogueToDisplay == 16 && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 7
  }
  if (currentObjective != null) {
    displayObjective = true
  }
}

function checkNoInteractDialogue() {
  if (interactID == 28 || alternativeInteractText == 60) {
    noInteractDialogue = true
    MIRdisplay = true
  } else if (interactID == 11) {
    noInteractDialogue = true
  } else if (interactID == 13) {
    noInteractDialogue = true
  } else if (interactID == 14) {
    noInteractDialogue = true
  } else if (interactID == 15) {
    noInteractDialogue = true
    ITMcollectedType = 'phone'
  } else if (interactID == 32) {
    noInteractDialogue = true
  } else if (interactID == 41) {
    noInteractDialogue = true
    ITMcollectedType = 'phone'
  } else if (alternativeInteractText == 64) {
    noInteractDialogue = true
    minigame1success = null
    minigameStartTime = millis()
  } else if (alternativeInteractText == 65) {
    noInteractDialogue = true
    minigame2Active = true
    minigameStartTime = millis()
  } else if (alternativeInteractText == 69) {
    noInteractDialogue = true
    gameEnd('escaped')
  } else {
    noInteractDialogue = false
  }
}

function bathroomMirrorInteract() {

  push()

  image(MIRleft, -256, 0)
  image(MIRright, 384, 0)

  if (MIRanimTick < 24) {
    image(MIRquinnLookForward, 0, 0, 768, 768)
  } else {
    image(MIRquinnLookSide, 0, 0, 768, 768)
  }

  if (MIRanimTick < 48) {
    MIRanimTick += 0.5
  } else {
    MIRanimTick = 0
  }

  tint(255, 100)

  image(MIRleft, -256, 0)
  image(MIRright, 384, 0)

  pop()

}

function manageFade() {

  fadeOpacity = 5.3125 * fadeStage

  if (currentGameState == 0 || currentGameState == 1) {
    fadeSpeed = 1
  } else {
    fadeSpeed = 4
  }

  fill(0, 0, 0, fadeOpacity)
  strokeWeight(0)
  resetMatrix()
  rect(0, 256/4, 1550, 1024)

  if (fadingForward == true) {
    if (fadeStage != 48) {
      fadeStage += fadeSpeed
    } else {
      fadingForward = null
    }
  } else if (fadingForward == false) {
    if (fadeStage != 0) {
      fadeStage -= fadeSpeed
    } else {
      fadingInit = false
      fadingForward = true
      fadeHold = 0
      fadeStage = 0
      if (postFadeDialogue == true) {
        postFadeDialogueManager()
      } else {
        postFadeDialogueIndex = null;
      }
    }
  } else if (fadingForward == null) {
    if (fadeHold == 12) {
      fadingForward = false
      fadeHold = 0

      if (beginningMenu == true) {
        pickingPlayerData = true
        beginningMenu = false
      } else if (selectingExistingPlayer == true) {
        selectingExistingPlayer = false
      } else if (enteringNewPlayer == true) {
        enteringNewPlayer = false
      }
      if (intermediateGameState != null) {
        currentGameState = intermediateGameState
        intermediateGameState = null
        if (currentGameState == 1) {
          postFadeDialogue = true
          postFadeDialogueIndex = 4
        }
      } else if (currentGameState == 1) {
        postFadeDialogue = true
        postFadeDialogueIndex = 10
      }
      if (intermediateLocation != null) {
        currentLocation = intermediateLocation
        intermediateLocation = null
      }
      if (intermediateFocus != null) {
        currentFocus = intermediateFocus
        intermediateFocus = null
      }
      if (branchCodeArray[15][1] == true) {
        useGroggyMouse = true
      }
    } else {
      fadeHold += fadeSpeed
    }
  }

}

function postFadeDialogueManager() {

  displayingDialogue = true
  dialogueToDisplay = postFadeDialogueIndex
  dialogueType = 'story'
  postFadeDialogue = false
  playBegin = true

}

function drawEndingAnimation(endingUnlocked) {

  let imageToUse = null;
  let endingImageToDisplay = null;
  let endingImageToDisplayGS = null;
  let endingImageOffset = 0;
  let endingImageTint = 0;
  let unlockFadeOpacity = 0;
  let showText = false;

  push() 

  scale(1.5, 1.5)

  if (ENDanimationTick == 0) {
    branchDiagramUnlocks[endingUnlocked][1] = true
  }

  if (ENDanimationTick < 20) {
    imageToUse = ENDanimationFrames[ENDanimationTick]
    endingImageOffset = 976 - (16 * ENDanimationTick)
  } else if (ENDanimationTick < 44) {
    imageToUse = ENDanimationFrames[20]
    endingImageOffset = 976 - (16 * 21)
  } else if (ENDanimationTick < 94) {
    imageToUse = ENDanimationFrames[ENDanimationTick - 24]
    endingImageOffset = 976 - (16 * (ENDanimationTick - 24))
    if (endingImageOffset <= 0) {
      endingImageOffset = 0
    }
  } else {
    imageToUse = ENDanimationFrames[70]
    endingImageOffset = 0
    showText = true
  }

  image(imageToUse, 0, 0)

  if (ENDanimationTick == 148) {
    ENDanimationTick = 0
    ENDdisplayingUnlock = false
    pickRewind()

  } else {
    
    ENDanimationTick ++

  }

  endingImageToDisplay = branchDiagramUnlocks[endingUnlocked][2]
  endingImageToDisplayGS = branchDiagramUnlocks[endingUnlocked][3]

  if (ENDanimationTick < (49+24)) {
    endingImageTint = 0
    unlockFadeOpacity = 0
  } else if (ENDanimationTick < 94) {
    endingImageTint = (12.75 * (ENDanimationTick - 74))
    if (ENDanimationTick < 84) {
      unlockFadeOpacity = 25.5 * (ENDanimationTick - 74)
    } else {
      unlockFadeOpacity = 255 - (25.5 * (ENDanimationTick - 84))
    }
  } else {
    endingImageTint = 255
    unlockFadeOpacity = 0
  }


  push()
  translate(endingImageOffset, 0)
  image(endingImageToDisplayGS, 8, -8)
  pop()

  push()
  translate(endingImageOffset, 0)
  tint(255, endingImageTint)
  image(endingImageToDisplay, 8, -8)
  pop()

  pop()



  if (showText == true) {

    unlockCount = 0
    for (let x = 0; x < 13; x++) {
      if (branchDiagramUnlocks[x][1] == true) {
        unlockCount ++
      }
    }
    
    push()
    fill('white')
    textFont(VT323Font, 90)
    textAlign(CENTER, CENTER)
    text(branchDiagramUnlocks[endingUnlocked][0], 0, -390)
    text((unlockCount + "/12 unlocked"), 0, 350)
    pop()

  }

  push()
  fill(255, 255, 255, unlockFadeOpacity)
  rect(0, 0, 1152, 1152)
  pop()


  fill(0, 0, 0)
  strokeWeight(0)
  rect(675, 50, 200, 900)
  rect(-675, 50, 200, 900)
  push()

}

function groggyMouse() {

  driftX += random(-1, 1)
  driftY += random(-1, 1)

  instabilityX += random(-3, 3)
  instabilityY += random(-3, 3)

  newMouseX = lerp(newMouseX, newMouseX + driftX, 0.05)
  newMouseY = lerp(newMouseY, newMouseY + driftY, 0.05)

  newMouseX += instabilityX
  newMouseY += instabilityY


}

function gameEnd(endTrigger) {

  let newEnding = null;

  if (branchDiagramUnlocks[newEnding][1] == false) {
    ENDdisplayingUnlock = true
    currentUnlockEnd = newEnding
  } else {
    pickRewind()
  }

}

function pickRewind() {

  let coordOffsetY = 0;
  let coordOffsetX = 0;

  let hoverColumn = null;
  let hoverRow = null;

  let endingHoverText = '???'

  push()
  fill('black')
  rect(0, 256/4, 1550, 1024)
  pop()

  for (let endingInArray = 0; endingInArray < 13; endingInArray++) {

    push()
    scale(0.5, 0.5)
    if (endingInArray < 3) {
      coordOffsetY = endingInArray
      coordOffsetX = -1000

      if (endingInArray == (selectedRewindID - 1)) {
        fill('white')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 525, 365)
      }

      if (branchDiagramUnlocks[endingInArray][1] == true) {
        fill('black')
        rect(coordOffsetX, (-600 + (endingInArray * 500)), 496, 336)
        image(branchDiagramUnlocks[endingInArray][2], coordOffsetX, (-600 + (coordOffsetY * 500)))
        push()
        fill('white')
        textFont(VT323Font, 60)
        textAlign(CENTER, CENTER)
        text(branchDiagramUnlocks[endingInArray][0], coordOffsetX, (-380 + (coordOffsetY * 500)))
        pop()
      } else {
        fill('grey')
        rect(coordOffsetX, (-600 + (endingInArray * 500)), 496, 336)
        image(branchDiagramUnlocks[endingInArray][3], coordOffsetX, (-600 + (coordOffsetY * 500)))
        push()
        fill('white')
        textFont(VT323Font, 60)
        textAlign(CENTER, CENTER)
        text('???', coordOffsetX, (-380 + (coordOffsetY * 500)))
        pop()
      }
    } else if (endingInArray < 6) {
      coordOffsetY = endingInArray - 3
      coordOffsetX = -350

      if (endingInArray == (selectedRewindID - 1)) {
        fill('white')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 525, 365)
      }

      if (branchDiagramUnlocks[endingInArray][1] == true) {
        fill('black')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 496, 336)
        image(branchDiagramUnlocks[endingInArray][2], coordOffsetX, (-600 + (coordOffsetY * 500)))
        push()
        fill('white')
        textFont(VT323Font, 60)
        textAlign(CENTER, CENTER)
        text(branchDiagramUnlocks[endingInArray][0], coordOffsetX, (-380 + (coordOffsetY * 500)))
        pop()
      } else {
        fill('grey')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 496, 336)
        image(branchDiagramUnlocks[endingInArray][3], coordOffsetX, (-600 + (coordOffsetY * 500)))
        push()
        fill('white')
        textFont(VT323Font, 60)
        textAlign(CENTER, CENTER)
        text('???', coordOffsetX, (-380 + (coordOffsetY * 500)))
        pop()
      }
    } else if (endingInArray < 9) {
      coordOffsetY = endingInArray - 6
      coordOffsetX = 350

      if (endingInArray == (selectedRewindID - 1)) {
        fill('white')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 525, 365)
      }

      if (branchDiagramUnlocks[endingInArray][1] == true) {
        fill('black')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 496, 336)
        image(branchDiagramUnlocks[endingInArray][2], coordOffsetX, (-600 + (coordOffsetY * 500)))
        push()
        fill('white')
        textFont(VT323Font, 60)
        textAlign(CENTER, CENTER)
        text(branchDiagramUnlocks[endingInArray][0], coordOffsetX, (-380 + (coordOffsetY * 500)))
        pop()
      } else {
        fill('grey')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 496, 336)
        image(branchDiagramUnlocks[endingInArray][3], coordOffsetX, (-600 + (coordOffsetY * 500)))
        push()
        fill('white')
        textFont(VT323Font, 60)
        textAlign(CENTER, CENTER)
        text('???', coordOffsetX, (-380 + (coordOffsetY * 500)))
        pop()
      }
    } else if (endingInArray < 12) {
      coordOffsetY = endingInArray - 9
      coordOffsetX = 1000

      if (endingInArray == (selectedRewindID - 1)) {
        fill('white')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 525, 365)
      }

      if (branchDiagramUnlocks[endingInArray][1] == true) {
        fill('black')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 496, 336)
        image(branchDiagramUnlocks[endingInArray][2], coordOffsetX, (-600 + (coordOffsetY * 500)))
        push()
        fill('white')
        textFont(VT323Font, 60)
        textAlign(CENTER, CENTER)
        text(branchDiagramUnlocks[endingInArray][0], coordOffsetX, (-380 + (coordOffsetY * 500)))
        pop()
      } else {
        fill('grey')
        rect(coordOffsetX, (-600 + (coordOffsetY * 500)), 496, 336)
        image(branchDiagramUnlocks[endingInArray][3], coordOffsetX, (-600 + (coordOffsetY * 500)))
        push()
        fill('white')
        textFont(VT323Font, 60)
        textAlign(CENTER, CENTER)
        text('???', coordOffsetX, (-380 + (coordOffsetY * 500)))
        pop()
      }
    }
    pop()

  }

  
  if (newMouseX > -630 && newMouseX < -370) {
    hoverColumn = 1
  } else if (newMouseX > -300 && newMouseX < -50) {
    hoverColumn = 2
  } else if (newMouseX > 50 && newMouseX < 300) {
    hoverColumn = 3
  } else if (newMouseX > 370 && newMouseX < 630) {
    hoverColumn = 4
  } else {
    hoverColumn = null
  }

  if (newMouseY > -390 && newMouseY < -210) {
    hoverRow = 1
  } else if (newMouseY > -140 && newMouseY < 40) {
    hoverRow = 2
  } else if (newMouseY > 110 && newMouseY < 280) {
    hoverRow = 3
  } else {
    hoverRow = null
  }


  if (hoverRow == 1 && hoverColumn == 1) {
    selectedRewindID = 1
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'B*tch really thought HE was gonna stab YOU? Crazy.'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 2 && hoverColumn == 1) {
    selectedRewindID = 2
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'This wardrobe is occupied, sorry.'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 3 && hoverColumn == 1) {
    selectedRewindID = 3
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Stalked by a killer and you lost... to a puddle.'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 1 && hoverColumn == 2) {
    selectedRewindID = 4
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Damn hayfever, always knew it would kill me.'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 2 && hoverColumn == 2) {
    selectedRewindID = 5
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Moral: always listen to the advice of random men on the street.'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 3 && hoverColumn == 2) {
    selectedRewindID = 6
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Bloody kids always on they damn phones.'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 1 && hoverColumn == 3) {
    selectedRewindID = 7
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Good job securing the door. Bad job... un-securing it.'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 2 && hoverColumn == 3) {
    selectedRewindID = 8
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Lowkey embarassing for him.'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 3 && hoverColumn == 3) {
    selectedRewindID = 9
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'You wanted to sleep, right? How about permanently...'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 1 && hoverColumn == 4) {
    selectedRewindID = 10
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Good job! Almost as impressive as me surviving all this coding!'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 2 && hoverColumn == 4) {
    selectedRewindID = 11
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Your life is over. My life is what? over? Radio-talk sucks (over).'
    } else {
      endingHoverText = '???'
    }
  } else if (hoverRow == 3 && hoverColumn == 4) {
    selectedRewindID = 12
    if (branchDiagramUnlocks[selectedRewindID-1][1] == true) {
      endingHoverText = 'Wow, you are more oblivious than my blind, elderly dog.'
    } else {
      endingHoverText = '???'
    }
  } else {
    selectedRewindID = null
    endingHoverText = null
  }

  if (endingHoverText != null) {
    push()
    fill('white')
    textFont(VT323Font, 60)
    textAlign(CENTER, CENTER)
    text(endingHoverText, 0, 350)
    pop()
  }


}

function rewindPlay(selectedRewindPoint) {
  
  let rewindActionNumber = null;
  let rewindActionState = null;
  let branchCodeIndex = null;

  if (selectedRewindPoint == 1) {
    if (branchCodeArray[13][1] == false) {

      branchCodeIndex = 13

    } else {

      branchCodeIndex = 20

    }
  } else if (selectedRewindPoint == 2) {

    //hiding places etc

  } else if (selectedRewindPoint == 3) {

    branchCodeIndex = 14

  } else if (selectedRewindPoint == 4) {

    //hiding places etc

  } else if (selectedRewindPoint == 5) {

    //lend money stuff

  } else if (selectedRewindPoint == 6) {

    branchCodeIndex = 6

  } else if (selectedRewindPoint == 7) {

    //door locks

  } else if (selectedRewindPoint == 8) {

    branchCodeIndex = 3

  } else if (selectedRewindPoint == 9) {

    branchCodeIndex = 15

  } else if (selectedRewindPoint == 10) {

    //win

  } else if (selectedRewindPoint == 11) {

    //walkie talkies

  } else if (selectedRewindPoint == 12) {

    //sleepyyyy

  }

  rewindActionNumber = branchCodeArray[branchCodeIndex][2]
  rewindActionState = branchCodeArray[branchCodeIndex][3]

}

function moveLockCharacter() {

  let characterSpeed = 3;

  let lockMoveLeft = true;
  let lockMoveRight = true;
  let lockMoveUp = true;
  let lockMoveDown = true;

  let currentPinSlot = null;

  let pinSlotBoundaries = [
    [-250, -180],
    [-140, -65],
    [-30, 30],
    [65, 140],
    [180, 250]
  ]

  if (useGroggyMouse == true) {
    characterSpeed = characterSpeed * (-1)
  }

  for (let pinNumber = 0; pinNumber < 5; pinNumber++) {

    let pinSlotUpperBoundary = pinSlotBoundaries[pinNumber][0]
    let pinSlotLowerBoundary = pinSlotBoundaries[pinNumber][1]
    

    if (lockCharacterPositionY >= pinSlotUpperBoundary && lockCharacterPositionY <= pinSlotLowerBoundary) {

      if (lockCharacterPositionX < 10) {
        lockMoveLeft = false
      } else if (lockCharacterPositionX > 270) {
        lockMoveRight = false
      }

    currentPinSlot = pinNumber
    
    }
  }

  if (currentPinSlot != null && lockCharacterPositionX > 200) {


    if ((lockCharacterPositionY - characterSpeed) < pinSlotBoundaries[currentPinSlot][0]) {
      lockMoveUp = false
    }

    if ((lockCharacterPositionY + characterSpeed) > pinSlotBoundaries[currentPinSlot][1]) {
      lockMoveDown = false
    }

  } else {

    if ((lockCharacterPositionY + characterSpeed) > 280) {
      lockMoveDown = false
    } else if (lockCharacterPositionY < -285) {
      if (lockCharacterPositionX < 70) {
        lockMoveLeft = false
      } else if (lockCharacterPositionX > 150) {
        lockMoveRight = false
      }
      if (lockCharacterPositionY < -345) {
        lockMoveUp = false
      }
    } else {

      if (lockCharacterPositionX < 10) {
        lockMoveLeft = false
      } else if (lockCharacterPositionX > 200) {
        lockMoveRight = false
      }

    }
  }



  if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && lockMoveRight == true) {
    lockCharacterPositionX += characterSpeed
  }
  if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && lockMoveUp == true) {
    lockCharacterPositionY -= characterSpeed
  }
  if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && lockMoveDown == true) {
    lockCharacterPositionY += characterSpeed
  }
  if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && lockMoveLeft == true) {
    lockCharacterPositionX -= characterSpeed
  }

}

function lockGame1() {

  let lockSpeeds = [4, 2, 6, 4, 8];
  let timeRemaining = 0;
  let timeElapsed = 0;

  displayObjective = true
  currentObjective = 10


  for (item in lockPinPositions) {
    if (lockPinDirections[item] == 1 && (lockPinPositions[item] - lockSpeeds[item]) <= -16) {
      lockPinPositions[item] = lockPinPositions[item] + lockSpeeds[item]
    } else if (lockPinDirections[item] == 1) {
      lockPinDirections[item] = -1
      lockPinPositions[item] = lockPinPositions[item] - lockSpeeds[item]
    } else if (lockPinDirections[item] == -1 && (lockPinPositions[item] - lockSpeeds[item]) >= -140) {
      lockPinPositions[item] = lockPinPositions[item] - lockSpeeds[item]
    } else {
      lockPinDirections[item] = 1
      lockPinPositions[item] = lockPinPositions[item] + lockSpeeds[item]
    }
  }

  push()
  image(MGlockBG, 0, 0)
  translate(-16, 0)
  image(MGlockPin, lockPinPositions[0], 0)
  image(MGlockPin, lockPinPositions[1], 112)
  push()
  scale(1, 0.8)
  image(MGlockPin, lockPinPositions[2], 216)
  pop()
  image(MGlockPin, lockPinPositions[3], 320)
  image(MGlockPin, lockPinPositions[4], 432)
  image(MGlockHolder, 0, 0)
  pop()

  if (lockCharacterPositionY > -250 && lockCharacterPositionY < -180) {
    if (lockCharacterPositionX <= (lockPinPositions[0] + 205)) {
      lockCharacterPositionX = 113
      lockCharacterPositionY = -312
    } else {
      moveLockCharacter()
    }
  } else if (lockCharacterPositionY > -140 && lockCharacterPositionY < -65) {
    if (lockCharacterPositionX <= (lockPinPositions[1] + 205)) {
      lockCharacterPositionX = 113
      lockCharacterPositionY = -312
    } else {
      moveLockCharacter()
    }
  } else if (lockCharacterPositionY > -30 && lockCharacterPositionY < 30) {
    if (lockCharacterPositionX <= (lockPinPositions[2] + 205)) {
      lockCharacterPositionX = 113
      lockCharacterPositionY = -312
    } else {
      moveLockCharacter()
    }
  } else if (lockCharacterPositionY > 65 && lockCharacterPositionY < 140) {
    if (lockCharacterPositionX <= (lockPinPositions[3] + 205)) {
      lockCharacterPositionX = 113
      lockCharacterPositionY = -312
    } else {
      moveLockCharacter()
    }
  } else if (lockCharacterPositionY > 180 && lockCharacterPositionY < 250) {
    if (lockCharacterPositionX <= (lockPinPositions[4] + 205)) {
      lockCharacterPositionX = 113
      lockCharacterPositionY = -312
    } else {
      moveLockCharacter()
    }
  } else {
    moveLockCharacter()
  }


  push()
  fill(255, 0, 0)
  ellipse(lockCharacterPositionX, lockCharacterPositionY, 15, 15)
  pop()

  timeElapsed = millis() - minigameStartTime
  timeRemaining = max(0, (minigame1Duration - timeElapsed) / 1000)

  let timerTextColour = 'white'

  if (timeRemaining <= 11 && ((Math.floor(timeRemaining)) % 2) == 0) {
    timerTextColour = 'red'
  } else{
    timerTextColour = 'white'
  }


  push()
  fill(timerTextColour)
  textFont(VT323Font, 70)
  textAlign(CENTER, CENTER)
  text(`${timeRemaining.toFixed(1)}s`, -185, -326)
  pop()

  if (lockCharacterPositionY > 270 && timeRemaining > 0) {
    minigame1success = true
    branchCodeArray[1][1] = true
  } else if (timeRemaining <=0) {
    minigame1success = false
    gameEnd('lock1')
  }

}

function checkMinigameClick() {

  if (chainArrowPosition < 60 && chainArrowPosition > -60) {
    minigame2Progress ++
    if (minigame2Progress == 4) {
      minigame2FinishTime = millis() - minigameStartTime
    }
  } else if (chainArrowPosition < 180 && chainArrowPosition > -180) {
    //progress remains
  } else if (chainArrowPosition < 340 && chainArrowPosition > -340) {
    minigame2Progress --
  } else {
    minigame2Progress -= 2
  }
  if (minigame2Progress < 0) {
    minigame2Progress = 0
    minigameStartTime -= 5000
  }

}

function lockGame2() {

let chainProgressStages = [
  [MGarrow2, MGchain1],
  [MGarrow3, MGchain2],
  [MGarrow4, MGchain3],
  [MGarrow1, MGchainFull],
]

let MGbackToUse = null;
let MGfrontToUse = null;

let timeRemaining = 0;
let timeElapsed = 0;

displayObjective = true
currentObjective = 10


if (minigame2Progress == 0) {
  MGbackToUse = MGchain0
  MGfrontToUse = MGarrow1
} else if (minigame2Progress < 5) {
  MGbackToUse = chainProgressStages[minigame2Progress-1][1]
  MGfrontToUse = chainProgressStages[minigame2Progress-1][0]
}



minigame2ArrowSpeed = 8 * (minigame2Progress + 1)


if (minigame2ArrowDirection == 1) {
  if (chainArrowPosition + minigame2ArrowSpeed < 340) {
    chainArrowPosition += minigame2ArrowSpeed
  } else {
    minigame2ArrowDirection = -1
    chainArrowPosition -= minigame2ArrowSpeed
  }
} else {
  if (chainArrowPosition - minigame2ArrowSpeed > -340) {
    chainArrowPosition -= minigame2ArrowSpeed
  } else {
    minigame2ArrowDirection = 1
    chainArrowPosition += minigame2ArrowSpeed
  }
}


push()
scale(1.25, 1.25)
image(MGbackToUse, 0, 0)
image(MGfrontToUse, 0, 0)
image(MGchainPointer, chainArrowPosition, 0)

if (useGroggyMouse == true) {

  push()
  for (let groggyDupes = 0; groggyDupes < 5; groggyDupes ++ ){
    let randomTint = random(100, 255)
    let randomOffset = random(-100, 100)

    tint(255, randomTint)
    image(MGchainPointer, chainArrowPosition + randomOffset, 0)
    noTint()
  }
  pop()

}

pop()

timeElapsed = millis() - minigameStartTime
timeRemaining = max(0, (minigame1Duration - timeElapsed) / 1000)

let timerTextColour = 'white'

if (timeRemaining <= 11 && ((Math.floor(timeRemaining)) % 2) == 0) {
  timerTextColour = 'red'
} else{
  timerTextColour = 'white'
}

if (timeRemaining >= 0 && minigame2FinishTime != 0) {
  minigame2Progress = 5
}


push()
fill(timerTextColour)
textFont(VT323Font, 70)
textAlign(CENTER, CENTER)
text(`${timeRemaining.toFixed(1)}s`, 0, -140)
pop()

if (minigame2Progress == 5) {
  fadingInit = true
  fadingForward = true
  minigame2success = true
  minigame2Active = false
  postFadeDialogue = false
  branchCodeArray[2][1] = false
} else if (timeRemaining == 0) {
  fadingInit = true
  fadingForward = true
  minigame2success = false
  minigame2Active = false
  postFadeDialogue = false
  gameEnd('lock2')
}

}

function checkEscape() {

  if (keyIsDown(27)) {
    //pause menu stuff
  }

}

function createPlayerData() {
  push()

  translate(0, 100)

  fill('black')
  rect(0, 256/4, 1550, 1024)

  image(STALKlogo, 0, -200, 600, 600)
  rect(0, 100, 1000, 500)

  push()
  fill(231, 229, 216)
  strokeWeight(0)
  rect(0, -100, 650, 128)
  fill('black')
  rect(0, -100, 640, 120)
  pop()

  push()
  fill(231, 229, 216)
  textFont(VT323Font, 100)
  textAlign(CENTER, CENTER)
  text("NEW PLAYER", 0, -110)
  pop()

  push()
  fill(231, 229, 216)
  strokeWeight(0)
  rect(0, 40, 650, 128)
  fill('black')
  rect(0, 40, 640, 120)
  pop()

  push()
  fill(231, 229, 216)
  textFont(VT323Font, 100)
  textAlign(CENTER, CENTER)
  text("EXISTING PLAYER", 0, 30)
  pop()

  pop()

  if (newMouseX > -330 && newMouseX < 330) {
    if (newMouseY > -65 && newMouseY < 65) {
      playerDataChoice = 'new'
    } else if (newMouseY > 75 && newMouseY < 205) {
      playerDataChoice = 'existing'
    } else {
      playerDataChoice = null
    }
  } else {
    playerDataChoice = null
  }
}

function enterNewPlayerName() {

  push()
  fill('black')
  rect(0, 256/4, 1550, 1024)
  pop()

  console.log('adding new players not complete yet, please restart')


}

function selectExistingPlayerName() {

  push()
  fill('black')
  rect(0, 256/4, 1550, 1024)
  pop()

  let existingPlayerNames = [];
  let existingPlayerProgress = [];

  playerData.players.forEach(player => {
    existingPlayerNames.push(player.name)
    existingPlayerProgress.push(player.progress.endingsUnlocked)
  })
  
  let playerDataOffsetX = null;
  let playerDataOffsetY = null;
  let playerDisplayStyle = null;
  let dontDisplay = false;

  if (existingPlayerNames.length <= 5) {
    playerDisplayStyle = 1
  } else {
    playerDisplayStyle = 2
  }

  for (playerDataItem in existingPlayerNames) {
    if (playerDisplayStyle == 1) {
      playerDataOffsetX = 0
      playerDataOffsetY = (15 * (playerDataItem + 1)) - 375
      dontDisplay = false
    } else {
      if (playerDataItem < 5) {
        playerDataOffsetX = -350
        playerDataOffsetY = (15 * (playerDataItem + 1)) - 375
        dontDisplay = false
      } else if (playerDataItem < 10) {
        playerDataOffsetX = 350
        playerDataOffsetY = (15 * (playerDataItem - 4)) - 375
        dontDisplay = false
      } else {
        dontDisplay = true
      }
    }

    if (dontDisplay == false) {

      push()
      fill('white')
      strokeWeight(0)
      rect(playerDataOffsetX, playerDataOffsetY, 650, 128)
      fill('black')
      rect(playerDataOffsetX, playerDataOffsetY, 640, 120)
      pop()
    
      push()
      fill('white')
      textFont(VT323Font, 80)
      textAlign(CENTER, CENTER)
      text(existingPlayerNames[playerDataItem], playerDataOffsetX, playerDataOffsetY - 32)
      pop()

      push()
      fill('white')
      textFont(VT323Font, 45)
      textAlign(CENTER, CENTER)
      text(existingPlayerProgress[playerDataItem] + '/12 endings unlocked', playerDataOffsetX, playerDataOffsetY + 30)
      pop()

    }


    push()
    fill('white')
    strokeWeight(0)
    rect(0, 400, 300, 75)
    fill('black')
    rect(0, 400, 290, 65)
    pop()
  
    push()
    fill('white')
    textFont(VT323Font, 50)
    textAlign(CENTER, CENTER)
    text('<<< return', 0, 395)
    pop()
    
  }

  if (playerDisplayStyle == 1) {
    if (newMouseX > -320 && newMouseX < 320) {
      if (newMouseY > -420 && newMouseY < -300 && (existingPlayerNames.length) >= 1) {
        existingPlayerHover = 1
      } else if (newMouseY > -270 && newMouseY < -150 && (existingPlayerNames.length) >= 2) {
        existingPlayerHover = 2
      } else if (newMouseY > -120 && newMouseY < -0 && (existingPlayerNames.length) >= 3) {
        existingPlayerHover = 3
      } else if (newMouseY > 30 && newMouseY < 150 && (existingPlayerNames.length) >= 4) {
        existingPlayerHover = 4
      } else if (newMouseY > 180 && newMouseY < 300 && (existingPlayerNames.length) >= 5) {
        existingPlayerHover = 5
      } else {
        existingPlayerHover = null
      }
    }
  } else {
    if (newMouseX > -670 && newMouseX < -30) {
      if (newMouseY > -420 && newMouseY < -300 && (existingPlayerNames.length) >= 1) {
        existingPlayerHover = 1
      } else if (newMouseY > -270 && newMouseY < -150 && (existingPlayerNames.length) >= 2) {
        existingPlayerHover = 2
      } else if (newMouseY > -120 && newMouseY < -0 && (existingPlayerNames.length) >= 3) {
        existingPlayerHover = 3
      } else if (newMouseY > 30 && newMouseY < 150 && (existingPlayerNames.length) >= 4) {
        existingPlayerHover = 4
      } else if (newMouseY > 180 && newMouseY < 300 && (existingPlayerNames.length) >= 5) {
        existingPlayerHover = 5
      } else {
        existingPlayerHover = null
      }
    } else if (newMouseX < 670 && newMouseX > 30) {
      if (newMouseY > -420 && newMouseY < -300 && (existingPlayerNames.length) >= 6) {
        existingPlayerHover = 6
      } else if (newMouseY > -270 && newMouseY < -150 && (existingPlayerNames.length) >= 7) {
        existingPlayerHover = 7
      } else if (newMouseY > -120 && newMouseY < -0 && (existingPlayerNames.length) >= 8) {
        existingPlayerHover = 8
      } else if (newMouseY > 30 && newMouseY < 150 && (existingPlayerNames.length) >= 9) {
        existingPlayerHover = 9
      } else if (newMouseY > 180 && newMouseY < 300 && (existingPlayerNames.length) >= 10) {
        existingPlayerHover = 10
      } else {
        existingPlayerHover = null
      }
    }
  }

  if (newMouseX > -150 && newMouseX < 150 && newMouseY > 360 && newMouseY < 430) {
    existingPlayerHover = 11
  }

}

function loadSelectedPlayerData() {

  let loadedPlayer = playerData.players.find(player => player.playerID === currentPlayerData)

  intermediateGameState = loadedPlayer.currentSessionData.find(data => data.currentGameState !== undefined).currentGameState
  intermediateLocation = loadedPlayer.currentSessionData.find(data => data.currentLocation !== undefined).currentLocation
  intermediateFocus = loadedPlayer.currentSessionData.find(data => data.currentFocus !== undefined).currentFocus

  currentPlayStage = loadedPlayer.currentSessionData.find(data => data.currentPlayStage !== undefined).currentPlayStage

  ITMarray = loadedPlayer.currentSessionData.find(data => data.ITMarray !== undefined).ITMarray

  currentObjective = loadedPlayer.currentSessionData.find(data => data.currentObjective !== undefined).currentObjective

  branchCodeArray = (loadedPlayer.progress.branchCodeArray).map(item => [item.id, item.value1, item.value2, item.value3])

  endingsUnlocked = loadedPlayer.progress.endingsUnlocked

  for (endingItem in loadedPlayer.progress.endingsUnlockedIndexes) {
    branchDiagramUnlocks[(loadedPlayer.progress.endingsUnlockedIndexes)[endingItem]][1] = true
  }


}



function draw() {
  background('black')
  noCursor()
  
  frameRate(24)


  //Calculates new mouse coordinates based on center of screen instead of default top left corner, thus allowing coordinates to remain same regardless of window resizing - crucial when calculating mouse click position across different window sizes
  newMouseX = mouseX - (windowWidth/2)
  newMouseY = mouseY - (windowHeight/2)

  //useGroggyMouse = true

  if (useGroggyMouse == true) {
    groggyMouse()
  }

  //add logic to prevent pausing during key points
  checkEscape()

  BGtiles()
  NAVtiles()

  //apply VHS effects
  drawFlicker()
  frameJitter()
  applyVHSdistortion()


  if (currentGameState == 0 && beginningMenu == true) {

    image(STALKlogo, 0, -40, 800, 800)

    push()
    fill(231, 229, 216)
    strokeWeight(0)
    rect(0, 400, 256, 128)
    fill('black')
    rect(0, 400, 250, 120)
    pop()

    push()
    fill(231, 229, 216)
    textFont(VT323Font, 100)
    textAlign(CENTER, CENTER)
    text("PLAY", 0, 385)
    pop()

  } else if (currentGameState == 0) {
    
    push()
    fill('black')
    rect(0, 256/4, 1550, 1024)
    pop()

  } else if (currentGameState == 1) {

    push()

    //centre tile maps in window
    translate(-BGtilesX * BGtileSize/4 + BGtileSize/2, -BGtilesY * BGtileSize/2 + BGtileSize/2, 0);
    translate (BGscrollAmount, 0, 0)


    //draw each tile in current tile map
    for (let tileX = 0; tileX < BGtilesX; tileX++) {

      for (let tileY = 0; tileY < BGtilesY; tileY++) {

        BGtileMap[tileX][tileY].displayTile()
      }
    }

    pop()

    fill(0, 0, 0)
    strokeWeight(0)
    rect(708, 50, 135, 900)
    rect(-708, 50, 135, 900)

    push()


  } else if (currentGameState == 2) {


    quinnMovable = false

    if (currentPlayStage == 0 && cutScenes[0] == false) {

      displayingDialogue = true
      dialogueToDisplay = 0
      dialogueType = 'story'
      cutScenes[0] = true

    }

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

  }

  if (cutScenes[1] == true) {
    outdoorsStoryPointTrigger()
  }


  push()

  if (scanLineY > 197) {
    scanLineY = 0
  } else {
    scanLineY = scanLineY + 2
  }

  if (displayingDialogue == true) {

    quinnMovable = false
    showHUD = false


    textWrap(WORD)

    inputBlocked = true

    if (dialogueType == 'interact') {
      interactDialogueBoxes[dialogueToDisplay].displayDialogue()
    } else if (dialogueType == 'story') {
      storyDialogueBoxes[dialogueToDisplay].displayDialogue()
    }

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
      text('click to continue...', 570, 525)

    }

  
  } else {

    charTyped = 0
    scanlineY = 0

    if (currentGameState == 1 && cutScenes[1] == false && playBegin == true) {
      quinnMovable = true
    }
    if (postFadeDialogue == true) {
      quinnMovable = false
    }

    showHUD = true


  }

  pop()

  //check whether the mouse is hovering over anything interactable
  checkMouseHover()


if (quinnMovable == true) {
  checkKeyPress()
} else if (currentGameState == 1 && cutScenes[1] == false) {
  SPR_quinn.displayStaticSprite()
}

if (MIRdisplay == true) {
  bathroomMirrorInteract()
}

if (ITMcollectedType != null) {
  ITMcollected(ITMcollectedType)
}

if (playStageInteractCounter > 8 && currentPlayStage == 2 && displayingDialogue == false) {
  currentPlayStage = 2.5
  playStageInteractCounter = 0
  displayingDialogue = true
  dialogueToDisplay = 3
  dialogueType = 'story'
} else if (playStageInteractCounter > 8 && currentPlayStage == 4 && displayingDialogue == false) {
  currentPlayStage = 5
  playStageInteractCounter = 0
  displayingDialogue = true
  dialogueToDisplay = 1
  dialogueType = 'story'
} else if (currentPlayStage == 6 && branchCodeArray[10][1] != true && displayingDialogue == false) {

}



if (ENDdisplayingUnlock == true) {
  drawEndingAnimation(currentUnlockEnd)
}

if (minigame1success == null) {
  lockGame1()
}

if (minigame2Active == true) {
  lockGame2()
}

if (showHUD == true && fadingInit == false) {
  if (currentObjective != null && displayObjective == true) {
    objectiveBoxes[currentObjective].displayObjective()
  }
  if (currentGameState == 2) {
    miniMap()
  }
}

if (pickingPlayerData == true) {
  createPlayerData()
}
if (enteringNewPlayer == true) {
  enterNewPlayerName()
}
if (selectingExistingPlayer == true) {
  selectExistingPlayerName()
}

if (fadingInit == true) {
  manageFade()
}


//track mouse coordinates on screen (useful for tracking click position later, remove when submitting final game)
fill('white')
textFont(VT323Font, 30)
textAlign(CENTER, CENTER)
text(newMouseX, newMouseX+50, newMouseY)
text(newMouseY, newMouseX+50, newMouseY + 30)
text(interactID, newMouseX+50, newMouseY + 60)

if (quinnMovable == false) { 
push()
fill('white')
ellipse(newMouseX, newMouseY, 15, 15)
pop()
}

if (useGroggyMouse == true) {
  push()
  translate(0, 256/4)
  tint(255, 100);
  image(groggyOverlay, 0, 0, 1550, 1024);
  groggyOverlay.play()
  groggyOverlay.loop()
  pop()
}

push()
translate(0, 256/4)
//semi-transparent VHS-style overlay
tint(255, 100);
image(VHSoverlay, 0, 0, 1550, 1024);
pop()

push()

resetMatrix()
fill(0, 0, 0, 0)
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

console.log(currentPlayStage)

  
}