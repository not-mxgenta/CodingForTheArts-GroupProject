//dictating which 'stage' of the game we are in, changes the background tilemaps and any events
let currentGameState = 0;
//more specific, works within each game state i.e. may be in state 2 (inside), dictates whether in location 0 (bathroom) or location 1 (bedroom) etc.
let currentLocation = 1;
//even more specific, specifies which part of a location is the player's current focus i.e. left wall
let currentFocus = 1;
//when inside, what 'stage' of play - dictates objectives and interactivity options etc
let currentPlayStage = 0;
//menu vs actual game
let playBegin = false;

let pauseMenuOpen;
let pauseMenuHover = null;

let quittingGame = false;

//managing fade transition between scenes
let fadeOpacity = 0;
let fadeStage = 48;
let fadingInit = true;
//fading opacity zero to full or other way (forward = zero to full)
let fadingForward = false;
//pause at full opacity before resume fade in other direction
let fadeHold = 0;
//transition locations/focus when fade at full opacity (smoother transition e.g. through doors)
let intermediateGameState = null;
let intermediateLocation = null;
let intermediateFocus = null;
//faster fades inside (fades more frequent, long fades become tedious)
let fadeSpeed = 1;
//dialogue to display when fade ends (if at all) e.g. when returning home, fade into entrance then dialogue prompt to put dinner on
let postFadeDialogue = false;
let postFadeDialogueIndex = null;

//essential to centre all activity on the screen, regardless of screen size
let newMouseX;
let newMouseY;

//variables used to make mouse unstable when using sleeping pills
let driftX = 0;
let driftY = 0;
let instabilityX = 0;
let instabilityY = 0;
let useGroggyMouse = false;

//tracking whether nav buttons are hovered
let leftNavHovered = false;
let rightNavHovered = false;

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

//dialogue + interactivity variables
let interactID = 0;
//showing dialogue?
let displayingDialogue = false;
//does the dialogue have a choice or just click to close
let displayingChoice = false;
let currentChoices = [];
//containing all instances of dialogue box class
let interactDialogueBoxes = [];
let storyDialogueBoxes = [];
//input not available when dialogue is mid-typing (prevents skipping dialogue before finished)
let inputBlocked = false;
//segment of dialogue to type on screen (for typing animation)
let currentDialogue = '';
let charTyped = 0;
//retro scan lines on dialogue and objective boxes
let scanLineY = 0;
//which dialogue to show in dialogue box
let dialogueToDisplay = 0;
//if finish of dialogue should immediately prompt second dialogue
let followUpDialogue = [null, null];
//prevents errors if interaction doesn't prompt dialogue (i.e. collecting item, cutscene with mirror, window etc.)
let noInteractDialogue = false;
//various branching choices format: [name, completion status, order completed, play stage completed at]
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

//stores how many actions have been completed to track when each story point branch is completed
let actionOrder = 0;

//whether displaying screen to choose rewind point
let pickingRewind = false;
//which point to rewind to
let selectedRewindID = null;

//where player is hiding/has hidden
let SP_hidingArray = [];
//initialise list of unlocked ending details
let branchDiagramUnlocks = [];

//animation showing unlock of new ending
let ENDanimationFrames = [];
let ENDanimationTick = 0;
let ENDdisplayingUnlock = false;

//how many endings have been unlocked
let unlockCount = 0;
//which ending has just been unlocked
let currentUnlockEnd = null;

//lock 1 minigame, position and direction of movement of each pin
let lockPinPositions = [0, 0, 0, 0, 0];
let lockPinDirections = [1, 1, 1, 1, 1];
//position of player indicator in lock 1 minigame
let lockCharacterPositionX = 113;
let lockCharacterPositionY = -312;

//arrow marker in lock 2 minigame
let chainArrowPosition = 0

//timer and other variables on lock minigames
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

let minigame3Active = false;
let minigame3init = true;
let RADkillerLocation = 0;
let RADplayerLocation = 0;
let RADanimFrames = [];
let intermediateWalkieGameActive = false;
let RADanimTick = 0;
let RADhoveredRoom = 0;
let RADchoosingLocation = 'player';
let RADwalkieLocations = [3, 5]
let RADkillerMove = []
let RADplayerMove = []

let minigame4Active = false;
let minigame4Failed = false;
let minigame4radius = 500;
let pregameInstructions4 = true;
let playInProgress = false;

let displayingMinigameInstructions = false;
let hoveringMinigameInstructionButton = false;

let hidingResult = false;
let hidingTransition = false;

//list containing number of interactions with each object
let interactionCounts = [];
let holdInteractCount = 0;

//if interaction objects have multiple dialogues linked (i.e. based on different choices/stages of the game)
let alternativeInteractText = null;
//story or interact dialogue
let dialogueType = null;

//interact text when outside, hover over head
let outsideIntTextPositionX = 0;
let outsideIntID = 0;

//interacting with man outside in opening scene
let outsideStoryPoint = false;

//tracks interactions in specific play stage i.e. while waiting for food to cook, player progression based on how many interactions completed (food done after 8 interacts)
let playStageInteractCounter = 0;

//variables related to choosing to load player data or create new
let pickingPlayerData = false;
let playerDataChoice = null;
let playerNameInput = "";
let enteringNewPlayer = false;
let selectingExistingPlayer = false;
let existingPlayerHover = null;
let currentPlayerData = null;
let beginningMenu = true;

//variables for Quinn's Walking Animation + movement outside & background scroll
let SPR_quinnWalkAnimArray = [];
let currentQuinnWalkFrame = 0;
let quinnMovable = false;
let SPRrightAmount = 620;
let SPRleftAmount = 0;
let quinnFacing = -1;
let walkingXpos = 0;
let BGscrollAmount = 0;

//mirror cutscene, quinn animation (eyes)
let MIRanimTick = 0;
let MIRdisplay = false;

//window cutscene
let showingWindowInteract = false;

//whether fade animation is player going to sleep
let goingToSleep = false;

//collecting items animation
let ITMcollectAnimTick = 0;
let ITMcollectedType = null;
//items collected
let ITMarray = [];

//json containing dialogue
let dialogueData;
//json containing previous player data
let playerData;


let cutScenes = [false, false]
let appearStage = 0
let appearBlend = 1


let objectiveArray = ['walk home', 'cook dinner', 'wait for food', 'get dinner', 'eat dinner', 'get ready for bed', 'go to bed', 'investigate noise', 'HIDE!', 'ESCAPE!', 'unlock, QUICK!', 'investigate ANOTHER noise'];
let currentObjective = null;
let objectiveBoxes = [];
let displayObjective = false;

let showHUD = false;

let firstChasePrompt = false;
let dustyBed = false;
let slipperShower = false;
let occupiedWardrobe = false;
let eepySleepy = false;

let killerJumpscare = false;
let jumpscareTick = 0;
let jumpscareCounter = 0;

let firstEncounter = true;

let jumpScares = [];

let endingPicked = null;


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

    if (dialogueToDisplay == 33) {
      translate(0, 0, 1)
    }

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
    textWrap(WORD)
    textLeading(40)
    fill('white')
    textFont(VT323Font, 50)
    textAlign(CENTER, CENTER)
    text("OBJECTIVE:", 0, -55)
    text(this.objective, 0, 25, 280)
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

  //sound
  SNDbrokenGlass = loadSound("assets/Sound/broken-glass.mp3")
  SNDchaseSong = loadSound("assets/Sound/chase-song.mp3")
  SNDdoorOpen = loadSound("assets/Sound/door-interact.mp3")
  SNDdoorLock = loadSound("assets/Sound/door-lock.mp3")
  SNDinside = loadSound("assets/Sound/inside-house.mp3")
  SNDoutside = loadSound("assets/Sound/outside-house.mp3")
  SNDradio = loadSound("assets/Sound/radio-noise.mp3")
  SNDsurprise = loadSound("assets/Sound/surprise-sound-effect.mp3")
  SNDjumpscare = loadSound("assets/Sound/jumpscare.mp3")

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
  WINbackgroundMain = loadImage("assets/WIN_background.png")
  OBJbedroomWindowClosed = loadImage("assets/OBJ_BedroomWindowClosed.png")
  OBJbedroomWindowOpen = loadImage("assets/OBJ_BedroomWindowOpen.png")
  OBJbedroomWindowOutside = loadImage("assets/OBJ_BedroomWindowOutside.png")
  OBJbedroomOverlay = loadImage("assets/OBJsheet_BedroomReplacement.png")

  //icons
  ICONnavigation = loadImage("assets/ICON_NavigationArrow.png")

  //other
  BLANKtile = loadImage("assets/BLANKtile.png")
  MIRleft = loadImage("assets/MIR_left.png")
  MIRright = loadImage("assets/MIR_right.png")
  WINforeground = loadImage("assets/WIN_zoom.png")
  WINbackgroundFrame1 = loadImage("assets/WIN_zoomframe1.png")
  WINbackgroundFrame2 = loadImage("assets/WIN_zoomframe2.png")


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
  MGmap0 = loadImage("assets/minigames/RAD_map0.png")
  MGmap1 = loadImage("assets/minigames/RAD_map1.png")
  MGmap2 = loadImage("assets/minigames/RAD_map2.png")
  MGmap3 = loadImage("assets/minigames/RAD_map3.png")
  MGmap4 = loadImage("assets/minigames/RAD_map4.png")
  MGmap5 = loadImage("assets/minigames/RAD_map5.png")
  MGradAnim1 = loadImage("assets/minigames/RAD_frame1.png")
  MGradAnim2 = loadImage("assets/minigames/RAD_frame2.png")
  MGradAnim3 = loadImage("assets/minigames/RAD_frame3.png")
  MGradAnim4 = loadImage("assets/minigames/RAD_frame4.png")
  MGradAnim5 = loadImage("assets/minigames/RAD_frame5.png")
  MGradAnim6 = loadImage("assets/minigames/RAD_frame6.png")

  //jumpscares
  JSframe1 = loadImage("assets/Jumpscare/Jumpscare1.png")
  JSframe2 = loadImage("assets/Jumpscare/Jumpscare2.png")
  JSframe3 = loadImage("assets/Jumpscare/Jumpscare3.png")


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

  RADanimFrames = [MGradAnim1, MGradAnim2, MGradAnim3, MGradAnim4, MGradAnim5, MGradAnim6, MGradAnim1]

  jumpScares = [JSframe1, JSframe2, JSframe3, JSframe2]

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

    SNDsurprise.setVolume(0.8)
    SNDsurprise.play()

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
      image(WINbackgroundMain, 0, -51)
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

  if (currentLocation == 5 && currentFocus == 1) {
    image(BGbedroomLower, -256, 256)
    image(BGbedroomLower, -512, 256)
    image(BGbedroomMiddle, 256, 0)
    image(BGbedroomMiddle, 0, 0)
    image(BGbedroomMiddle, -256, 0)
    image(BGbedroomMiddle, -512, 0)
    image(BGbedroomUpper, 256, -256)
    image(BGbedroomUpper, 0, -256)
    image(BGbedroomUpper, -256, -256)
    image(BGbedroomUpper, -512, -256)
    image(OBJbedroomOverlay, -300, 0)

    image(OBJbedroomWindowOutside, 300, -100)

    if (branchCodeArray[17][1] == true) {
      image(OBJbedroomWindowOpen, 300, -100)
    } else {
      image(OBJbedroomWindowClosed, 300, -100)
    }
  }
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
            //removed
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[3] == 0) {
              interactID = 5
            }
            interactID = 0
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
            //removed
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[10] == 0) {
              interactID = 11
            }
            interactID = 0
          } else if (100 < newMouseX && newMouseX < 330 && -80 < newMouseY && newMouseY < 80) {
            if (currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6 || currentPlayStage == 7) {
              if (currentPlayStage == 6 && interactionCounts[11] == 0) {
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
            if ((currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[12] == 0) {
              interactID = 13
            }
          }
        } else if (currentLocation == 2 && currentFocus == 2) {
          //removed
          if (-80 < newMouseX && newMouseX < 310 && 90 < newMouseY && newMouseY < 190) {
            if (currentPlayStage == 6 && interactionCounts[13] == 0) {
              interactID = 14
            }
            interactID = 0
          } else if (-80 < newMouseX && newMouseX < 310 && 200 < newMouseY && newMouseY < 330) {
            if ((currentPlayStage == 2 || currentPlayStage == 4 || currentPlayStage == 6) && interactionCounts[14] == 0) {
              interactID = 15
            }
          } else if (-65 < newMouseX && newMouseX < 95 && -120 < newMouseY && newMouseY < 30) {
            if (currentPlayStage == 6 && interactionCounts[15] == 0) {
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
            //removed
            if ((currentPlayStage > 5) && interactionCounts[31] == 0) {
              interactID = 32
            }
            interactID = 0
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
            if (currentPlayStage == 5 || currentPlayStage == 4) {
              interactID = 34
              alternativeInteractText = 51
            }
          } else if (190 < newMouseX && newMouseX < 600 && 330 < newMouseY && newMouseY < 380) {
            if ((currentPlayStage == 4 || currentPlayStage == 5) && interactionCounts[34] == 0) {
              interactID = 35
            } else if (currentPlayStage == 7) {
              interactID = 35
              alternativeInteractText = 62
            }
          } else if (210 < newMouseX && newMouseX < 370 && -210 < newMouseY && newMouseY < 0) {
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
        goingToSleep = true
        currentPlayStage = 6
        postFadeDialogue = true
        postFadeDialogueIndex = 14
      } else {
        manageActionOrder(11)
        branchCodeArray[11][1] = 'romcom'
        fadingInit = true
        fadingForward = true
        goingToSleep = true
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
        followUpDialogue = [52, 'interact']
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
        goingToSleep = true
        playStageInteractCounter = 0
        postFadeDialogue = true
        postFadeDialogueIndex = 16

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
    if (dialogueToDisplay == 25) {
      if (optionChosen == 1) {
        if (currentLocation == 4) {
          RADkillerLocation = 2
          RADplayerLocation = 4
        } else {
          RADkillerLocation = 2
          RADplayerLocation = 5
        }
        fadingInit = true
        fadingForward = true
        intermediateWalkieGameActive = true
        postFadeDialogue = true
        postFadeDialogueIndex = 26
      } else {
        //hiding minigame
      }
    } else if (dialogueToDisplay == 27) {
      if (optionChosen == 1) {
        SP_hidingArray.push('wardrobe')
        minigame4Active = true
        pregameInstructions4 = true
      } else {
        SP_hidingArray.push('bed')
        minigame4Active = true
        pregameInstructions4 = true
      }
    } else if (dialogueToDisplay == 29) {
      if (optionChosen == 1) {
        intermediateLocation = 4
        intermediateFocus = 1
      } else {
        intermediateLocation = 2
        intermediateFocus = 3
      }
      fadingInit = true
      fadingForward = true
      SNDchaseSong.loop()
      SNDchaseSong.play()

    }
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
          intermediateLocation = 1
          intermediateFocus = 1
          currentPlayStage = 0
          postFadeDialogue = true
          postFadeDialogueIndex = 4
        }
        if (intermediateLocation == null && intermediateGameState == 2) {
          intermediateLocation = 1
          intermediateFocus = 1
          currentPlayStage = 0
          postFadeDialogue = true
          postFadeDialogueIndex = 0
        }
        if (currentPlayStage == null) {
          currentPlayStage = 0
        }
        if (currentObjective == null) {
          if (currentPlayStage == 1) {
            currentObjective = 1
          } else if (currentPlayStage == 2) {
            currentObjective = 2
          } else if (currentPlayStage == 2.5) {
            currentObjective = 3
          } else if (currentPlayStage == 3) {
            currentObjective = 4
          } else if (currentPlayStage == 4) {
            currentObjective = 5
          } else if (currentPlayStage == 5) {
            currentObjective = 6
          } else if (currentPlayStage == 6) {
            currentObjective = 7
          }
          if (currentObjective != null) {
            displayObjective = true
          }
        }

      } else {
        playerDataChoice = null
        selectingExistingPlayer = false
        pickingPlayerData = true

      }
    }

  } else if (enteringNewPlayer == true) {
    if (newMouseX > -130 && newMouseX < 130 && newMouseY > 110 && newMouseY < 210) {
      fadingInit = true
      fadingForward = true
      intermediateGameState = 1
      intermediateLocation = 1
      intermediateFocus = 1
      currentPlayStage = 0
      postFadeDialogue = true
      postFadeDialogueIndex = 4
      saveNewPlayerData()
    }

  } else if (currentGameState == 0 && -130 < newMouseX && newMouseX < 130 && 330 < newMouseY && newMouseY < 460) {
    fadingInit = true
    fadingForward = true
  } else if (pauseMenuOpen == true) {
    if (pauseMenuHover == 1) {
      pauseMenuOpen = false
    } else if (pauseMenuHover == 2) {
      savePlayerData()
    } else if (pauseMenuHover == 3) {
      quittingGame = true
      savePlayerData()
    }

  } else if (MIRdisplay == true) {
    MIRdisplay = false

  } else if (pickingRewind == true && selectedRewindID == 13) {
    
    tryAgain()
    // rewindPlay(selectedRewindID)
    pickingRewind = false

  } else if (hidingResult == true) {
    fadingForward = false
    fadingInit = true
    hidingTransition = true

  } else if (minigame2Active == true && minigame2Progress != 4) {
    checkMinigameClick()

  } else if (minigame4Active == true) {
    
    if (pregameInstructions4 == true) {
      pregameInstructions4 = false
      playInProgress = true
      minigameStartTime = millis()
    } else {
      if (playInProgress == true) {
        minigame4radius += 50
      } else {
        minigame4Active = false
      }
    }

  } else if (minigame3Active == true) {
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
        }
        if (dialogueToDisplay == 28) {
          SP_hidingArray.push('shower')
          minigame4Active = true
          pregameInstructions4 = true
        }
      }
    } else if (displayingMinigameInstructions == true) {
      displayingMinigameInstructions = false
    } else {
      if (hoveringMinigameInstructionButton == true) {
        displayingMinigameInstructions = true
      } else {
        checkRadioGameMovement()
      }
    }

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

        if (dialogueToDisplay == 20 && dialogueType == 'story') {
          showingWindowInteract = false
          if (currentPlayStage == 4) {
            currentPlayStage = 5
            currentObjective = 6
          }
        }

        if (dialogueToDisplay == 70 && dialogueType == 'interact') {
          branchCodeArray[10][1] = true
        }

        if (dialogueToDisplay == 53 && dialogueType == 'interact') {
          gameEnd('phone')
        }

        if (dialogueToDisplay == 14 && dialogueType == 'story') {
          fadingInit = true
          fadingForward = true
          goingToSleep = true
          eepySleepy = true
        }

        if (dialogueToDisplay == 70 && dialogueType == 'interact' && SNDradio.isPlaying() == true) {
          SNDradio.stop()
        }

        displayFollowUpDialogue()
  
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
            SNDdoorOpen.play()
          } else if (interactID == 9 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 4
            intermediateFocus = 1
            SNDdoorOpen.play()
          } else if (interactID == 10 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 3
            intermediateFocus = 2
            SNDdoorOpen.play()
          } else if (interactID == 17 && alternativeInteractText == null) {

              fadingInit = true
              fadingForward = true
              intermediateLocation = 1
              intermediateFocus = 2
              SNDdoorOpen.play()

          } else if (interactID == 18 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 5
            intermediateFocus = 3
            SNDdoorOpen.play()
          } else if (interactID == 24 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 1
            intermediateFocus = 3
            SNDdoorOpen.play()
          } else if (interactID == 30 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 1
            intermediateFocus = 3
            SNDdoorOpen.play()
          } else if (interactID == 40 && alternativeInteractText == null) {
            fadingInit = true
            fadingForward = true
            intermediateLocation = 2
            intermediateFocus = 3
            SNDdoorOpen.play()
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
  } else if (dialogueToDisplay == 33 && dialogueType == 'interact') {
    displayObjective = true
    currentObjective = 7
    currentPlayStage = 6
  } else if (dialogueToDisplay == 20 && dialogueType == 'story' && currentPlayStage == 5) {
    displayObjective = true
    currentObjective = 6
  } else if ((dialogueToDisplay == 16 || dialogueToDisplay == 15 || dialogueToDisplay == 14) && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 7
  } else if (dialogueToDisplay == 21 && dialogueType == 'story') {
    displayObjective = true
    currentObjective = 11
    glassBreak()
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
    livingRoomWindowInteract()
    showingWindowInteract = true
    displayingDialogue = true
    dialogueToDisplay = 19
    dialogueType = 'story'
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

function displayFollowUpDialogue() {

  if (dialogueToDisplay == 19 && dialogueType == 'story') {
    followUpDialogue = [20, 'story']
  } else if (dialogueToDisplay == 15 && dialogueType == 'interact') {
    followUpDialogue = [68, 'interact']
  } else if (dialogueToDisplay == 68 && dialogueType == 'interact') {
    followUpDialogue = [70, 'interact']
  } else if (dialogueToDisplay == 22 && dialogueType == 'story') {
    followUpDialogue = [23, 'story']
  } else if (dialogueToDisplay == 44 && dialogueType == 'interact') {
    followUpDialogue = [48, 'interact']
  } else if (dialogueToDisplay == 48 && dialogueType == 'interact') {
    followUpDialogue = [53, 'interact']
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

function livingRoomWindowInteract() {

  push()

  fill('black')
  rect(0, 256/4, 1550, 1024)

  if (dialogueToDisplay == 19 && dialogueType == 'story') {
    image(WINbackgroundFrame1, 0, 0)
  } else if (dialogueToDisplay == 20 && dialogueType == 'story') {
    image(WINbackgroundFrame2, 0, 0)
  }
  

  image(WINforeground, 0, 0)

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
      if (hidingTransition == true) {
        gameEnd(SP_hidingArray[(SP_hidingArray.length) - 1])
        hidingTransition = false
      }

      if (currentLocation == 1 && currentPlayStage == 7 && firstChasePrompt == false) {
      
        displayingDialogue = true
        dialogueToDisplay = 29
        dialogueType = 'story'
        firstChasePrompt = true
        SNDsurprise.setVolume(0.8)
        SNDsurprise.play()

      } else if (dialogueToDisplay == 29) {
        if (ITMarray.filter(item => item === 'phone').length == 2) {
          followUpDialogue = [25, 'story']
        } else {
          followUpDialogue = [24, 'story']
        }
      } else if (dialogueToDisplay == 33 && eepySleepy == true) {
        gameEnd('bed')
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
      if (intermediateWalkieGameActive == true && minigame3Active == false) {
        minigame3Active = true
        intermediateWalkieGameActive = false
      } else if (intermediateWalkieGameActive == true && minigame3Active == true) {
        minigame3Active = false
        intermediateWalkieGameActive = false
      }
    } else {
      if (goingToSleep == true) {
        displayingDialogue = true
        dialogueToDisplay = 33
        dialogueType = 'interact'
        goingToSleep = false
      } else if (displayingDialogue == false) {
        fadeHold += fadeSpeed
      }
      
    }
  }

}

function getKilledFool(newEnding) {

  if (SNDjumpscare.isPlaying() == false) {
    SNDjumpscare.play()

  }


  push()
  fill('black')
  rect(0, 264/4, 1550, 1024)

  if (newEnding != null) {
    endingPicked = newEnding
  }

  if (jumpscareCounter < 10) {

    push()
    let randomRotation = 0;
    let randomZoom = 0;
    randomZoom = random(0.9, 1.1)
    randomRotation = random(-10, 10)
    scale(randomZoom, randomZoom)
    rotate(randomRotation)
    image(jumpScares[jumpscareTick], 0, 0)

    pop()

    if (jumpscareTick < 3) {
      jumpscareTick ++
    } else {
      jumpscareTick = 0
      jumpscareCounter ++
    }


  } else {

    killerJumpscare = false
    SNDjumpscare.stop()

    if (branchDiagramUnlocks[endingPicked][1] == false) {
      ENDdisplayingUnlock = true
      currentUnlockEnd = endingPicked
    } else {
      pickRewind()
      pickingRewind = true
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
    pickingRewind = true
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

  if (branchCodeArray[20][1] == true && (endTrigger == 'sneeze' || endTrigger == 'wardrobe' || endTrigger == 'shower' || endTrigger == 'phone' || endTrigger == 'radio')) {
    newEnding = 0
    if (branchDiagramUnlocks[newEnding][1] == false) {
      ENDdisplayingUnlock = true
      currentUnlockEnd = newEnding
    } else {
      pickRewind()
      pickingRewind = true
    }
  } else if (branchCodeArray[15][1] == true) {
    newEnding = 8
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'lock1' || endTrigger == 'lock2') {
    newEnding = 6
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'sneeze') {
    newEnding = 3
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'wardrobe') {
    newEnding = 1
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'shower') {
    newEnding = 2
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'money') {
    newEnding = 4
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'phone') {
    newEnding = 5
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'shoes') {
    newEnding = 7
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'escaped') {
    newEnding = 9
    if (branchDiagramUnlocks[newEnding][1] == false) {
      ENDdisplayingUnlock = true
      currentUnlockEnd = newEnding
    } else {
      pickRewind()
      pickingRewind = true
    }
  } else if (endTrigger == 'radio') {
    newEnding = 10
    getKilledFool(newEnding)
    killerJumpscare = true
  } else if (endTrigger == 'bed') {
    newEnding = 11
    getKilledFool(newEnding)
    killerJumpscare = true
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

  push()
  fill('white')
  rect(0, 490, 510, 125)
  fill('black')
  rect(0, 490, 500, 115)
  fill('white')
  textFont(VT323Font, 35)
  textAlign(CENTER, CENTER)
  text("It didn't have to end like this...", 0, 460)
  textSize(70)
  text("try again", 0, 500)
  pop()

  if (newMouseX > -250 && newMouseX < 250 && newMouseY > 430 && newMouseY < 540) {
    selectedRewindID = 13
  }

}

//scrapped for time constraints :(
// function rewindPlay(selectedRewindPoint) {
  
//   let rewindActionNumber = null;
//   let rewindActionState = null;
//   let branchCodeIndex = null;

//   if (selectedRewindPoint == 1) {
//     if (branchCodeArray[13][1] == false) {

//       branchCodeIndex = 13

//     } else {

//       branchCodeIndex = 20

//     }
//   } else if (selectedRewindPoint == 2) {

//     minigame4Active = true
//     pregameInstructions4 = true

//   } else if (selectedRewindPoint == 3) {

//     minigame4Active = true
//     pregameInstructions4 = true

//   } else if (selectedRewindPoint == 4) {

//     minigame4Active = true
//     pregameInstructions4 = true

//   } else if (selectedRewindPoint == 5) {

//     branchCodeIndex = 0

//   } else if (selectedRewindPoint == 6) {

//     branchCodeIndex = 6

//   } else if (selectedRewindPoint == 7) {

//     if (branchCodeArray[1][1] == true) {
//       branchCodeIndex = 1
//     } else {
//       branchCodeIndex = 2
//     }

//   } else if (selectedRewindPoint == 8) {

//     branchCodeIndex = 3

//   } else if (selectedRewindPoint == 9) {

//     branchCodeIndex = 15

//   } else if (selectedRewindPoint == 10) {

//     branchCodeIndex = 0

//   } else if (selectedRewindPoint == 11) {

//     if (ITMarray.filter(item => item === 'phone').length == 2) {

//       rewindActionState = 7

//     } else {

//       rewindActionState = 4

//     }

//   } else if (selectedRewindPoint == 12) {

//     branchCodeIndex = 12

//   }

//   if (branchCodeIndex != null) {
//     rewindActionNumber = branchCodeArray[branchCodeIndex][2]
//     rewindActionState = branchCodeArray[branchCodeIndex][3]
//   }

//   if (rewindActionNumber != null) {
//     for (branchCode in branchCodeArray) {
//       if (branchCodeArray[branchCode][2] >= rewindActionNumber) {
//         branchCodeArray[branchCode][1] = null

//       }
//     }
//   }


// }

function tryAgain() {

  quittingGame = false
  savePlayerData()

  //dictating which 'stage' of the game we are in, changes the background tilemaps and any events
  currentGameState = 0;
  //more specific, works within each game state i.e. may be in state 2 (inside), dictates whether in location 0 (bathroom) or location 1 (bedroom) etc.
  currentLocation = 1;
  //even more specific, specifies which part of a location is the player's current focus i.e. left wall
  currentFocus = 1;
  //when inside, what 'stage' of play - dictates objectives and interactivity options etc
  currentPlayStage = 0;

  pauseMenuHover = null;

  quittingGame = false;

  //managing fade transition between scenes
  fadeOpacity = 0;
  fadeStage = 48;
  fadingInit = true;
  //fading opacity zero to full or other way (forward = zero to full)
  fadingForward = false;
  //pause at full opacity before resume fade in other direction
  fadeHold = 0;
  //transition locations/focus when fade at full opacity (smoother transition e.g. through doors)
  intermediateGameState = null;
  intermediateLocation = null;
  intermediateFocus = null;
  //faster fades inside (fades more frequent, long fades become tedious)
  fadeSpeed = 1;
  //dialogue to display when fade ends (if at all) e.g. when returning home, fade into entrance then dialogue prompt to put dinner on
  postFadeDialogue = false;
  postFadeDialogueIndex = null;

  useGroggyMouse = false;


  //dialogue + interactivity variables
  interactID = 0;
  //showing dialogue?
  displayingDialogue = false;
  //does the dialogue have a choice or just click to close
  displayingChoice = false;
  currentChoices = [];
  //input not available when dialogue is mid-typing (prevents skipping dialogue before finished)
  inputBlocked = false;
  //which dialogue to show in dialogue box
  dialogueToDisplay = 0;
  //if finish of dialogue should immediately prompt second dialogue
  followUpDialogue = [null, null];
  //prevents errors if interaction doesn't prompt dialogue (i.e. collecting item, cutscene with mirror, window etc.)
  noInteractDialogue = false;
  //various branching choices format: [name, completion status, order completed, play stage completed at]
  branchCodeArray = [
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

  //stores how many actions have been completed to track when each story point branch is completed
  actionOrder = 0;

  //whether displaying screen to choose rewind point
  pickingRewind = false;
  //which point to rewind to
  selectedRewindID = null;

  //where player is hiding/has hidden
  SP_hidingArray = [];

  ENDanimationTick = 0;
  ENDdisplayingUnlock = false;

  //which ending has just been unlocked
  currentUnlockEnd = null;

  //lock 1 minigame, position and direction of movement of each pin
  lockPinPositions = [0, 0, 0, 0, 0];
  lockPinDirections = [1, 1, 1, 1, 1];
  //position of player indicator in lock 1 minigame
  lockCharacterPositionX = 113;
  lockCharacterPositionY = -312;

  //arrow marker in lock 2 minigame
  chainArrowPosition = 0

  //timer and other variables on lock minigames
  minigameStartTime = 0;
  minigame1Duration = 45000;
  minigame1success = 0;
  minigame2Duration = 45000;
  minigame2success = 0;
  minigame2Progress = 0;
  minigame2Active = false;
  minigame2ArrowDirection = 1
  minigame2ArrowSpeed = 1;
  minigame2FinishTime = 0;

  minigame3Active = false;
  minigame3init = true;
  RADkillerLocation = 0;
  RADplayerLocation = 0;
  RADanimFrames = [];
  intermediateWalkieGameActive = false;
  RADanimTick = 0;
  RADhoveredRoom = 0;
  RADchoosingLocation = 'player';
  RADwalkieLocations = [3, 5]
  RADkillerMove = []
  RADplayerMove = []

  minigame4Active = false;
  minigame4Failed = false;
  minigame4radius = 500;
  pregameInstructions4 = true;
  playInProgress = false;

  displayingMinigameInstructions = false;
  hoveringMinigameInstructionButton = false;

  hidingResult = false;
  hidingTransition = false;

  //list containing number of interactions with each object
  interactionCounts = [];
  holdInteractCount = 0;

  //if interaction objects have multiple dialogues linked (i.e. based on different choices/stages of the game)
  alternativeInteractText = null;
  //story or interact dialogue
  dialogueType = null;

  //interact text when outside, hover over head
  outsideIntTextPositionX = 0;
  outsideIntID = 0;

  //interacting with man outside in opening scene
  outsideStoryPoint = false;

  //tracks interactions in specific play stage i.e. while waiting for food to cook, player progression based on how many interactions completed (food done after 8 interacts)
  playStageInteractCounter = 0;

  currentQuinnWalkFrame = 0;
  quinnMovable = false;
  SPRrightAmount = 620;
  SPRleftAmount = 0;
  quinnFacing = -1;
  walkingXpos = 0;
  BGscrollAmount = 0;

  //mirror cutscene, quinn animation (eyes)
  MIRanimTick = 0;
  MIRdisplay = false;

  //window cutscene
  showingWindowInteract = false;

  //whether fade animation is player going to sleep
  goingToSleep = false;

  //collecting items animation
  ITMcollectAnimTick = 0;
  ITMcollectedType = null;
  //items collected
  ITMarray = [];

  cutScenes = [false, false]
  appearStage = 0
  appearBlend = 1


  objectiveArray = ['walk home', 'cook dinner', 'wait for food', 'get dinner', 'eat dinner', 'get ready for bed', 'go to bed', 'investigate noise', 'HIDE!', 'ESCAPE!', 'unlock, QUICK!', 'investigate ANOTHER noise'];
  currentObjective = null;
  displayObjective = false;

  showHUD = false;

  firstChasePrompt = false;
  dustyBed = false;
  slipperShower = false;
  occupiedWardrobe = false;
  eepySleepy = false;

  firstEncounter = true
    
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
    branchCodeArray[1][1] = false
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
    if (currentGameState > 0 && displayingDialogue == false && pickingRewind == false && ENDdisplayingUnlock == false && minigame2Active == false && minigame3Active == false && minigame4Active == false && minigame1success != null) {
      pauseMenuOpen = true
    }
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

  push()
  fill('white')
  strokeWeight(0)
  rect(0, -20, (45 * playerNameInput.length), 105)
  fill('black')
  rect(0, -20, (45 * playerNameInput.length) - 5, 100)
  pop()

  push()
  fill('white')
  textFont(VT323Font, 100)
  textAlign(CENTER, CENTER)
  text(playerNameInput, 0, -40)
  textSize(80)
  text('Enter player name:', 0, -150)
  if (playerNameInput.length == 12) {
    fill('red')
    textSize(40)
    text('max characters reached', 0, 75)
  }
  pop()

  push()
  fill('white')
  strokeWeight(0)
  rect(0, 160, 256, 100)
  fill('black')
  rect(0, 160, 250, 95)
  pop()

  push()
  fill('white')
  textFont(VT323Font, 75)
  textAlign(CENTER, CENTER)
  text("submit", 0, 150)
  pop()

}

function keyPressed() {
  if (enteringNewPlayer == true) {
    if (keyCode == BACKSPACE) {
      playerNameInput = playerNameInput.slice(0, (playerNameInput.length)-1)
    } else if (keyCode == 32) {
      return false;
    } else if (key.length == 1 && (playerNameInput.length < 12)) {
      playerNameInput += key
    }
  }
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
  interactionCounts = loadedPlayer.currentSessionData.find(data => data.interactionCounts !== undefined).interactionCounts

  if (ITMarray == null) {
    ITMarray = []
  }
  if (interactionCounts == null) {
    interactionCounts = []
    for (let addArrayCount = 0; addArrayCount < 42; addArrayCount ++) {
      interactionCounts.push(0)
    }
  }

  currentObjective = loadedPlayer.currentSessionData.find(data => data.currentObjective !== undefined).currentObjective

  branchCodeArray = (loadedPlayer.progress.branchCodeArray).map(item => [item.id, item.value1, item.value2, item.value3])

  unlockCount = loadedPlayer.progress.endingsUnlocked

  for (endingItem in loadedPlayer.progress.endingsUnlockedIndexes) {
    branchDiagramUnlocks[(loadedPlayer.progress.endingsUnlockedIndexes)[endingItem]][1] = true
  }
}

function saveNewPlayerData() {

  let previousPlayerID = 0;
  let previousPlayer = null

  if (playerData.players.length == 0) {
    previousPlayerID = 0
  } else {
    previousPlayer = playerData.players[((playerData.players.length) - 1)]
    previousPlayerID = previousPlayer.playerID 
    currentPlayerData = previousPlayerID + 1
  }


  let newPlayerData = {
    "name": playerNameInput,
    "playerID": currentPlayerData,
    "currentSessionData": [
        {"currentGameState": 1},
        {"currentLocation": null},
        {"currentFocus": null},
        {"currentPlayStage": null},
        {"playStageInteractCounter": null},
        {"ITMarray": null},
        {"currentObjective": null},
        {"interactionCounts": null}
    ],
    "progress": {
        "lastCheckpoint": null,
        "endingsUnlocked": 0,
        "endingsUnlockedIndexes": [],
        "branchCodeArray": [
            {"id": "SP_lend", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_fdLock", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_fdChain", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_shoes", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_satchel", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_hallDrawer", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_phone", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_lrWindow", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_lrUpperDrawer", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_lrLowerDrawer", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_radio", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_TV", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_diningChair", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_kitchenSink", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_bath", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_bathroomCabinet", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_showerCurtain", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_bedroomWindow", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_book", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_bedroomCabinet", "value1": null, "value2": 0, "value3": null},
            {"id": "SP_weapon", "value1": null, "value2": 0, "value3": null}
        ]
    }
  }

  fetch('http://localhost:3000/addPlayer', { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayerData) 
  })
  .then(response => response.json())
  .then(data => console.log(data.message))
  .catch(error => console.error("Error saving player:", error));

  reloadPlayerDataJSON()
}

function reloadPlayerDataJSON() {
  fetch('http://localhost:3000/getPlayers')
      .then(response => response.json())
      .then(data => {
          playerData = data; // Update playerData with fetched data
          console.log("Player data reloaded successfully!");
      })
      .catch(error => console.error("Error reloading player data:", error));

}

function savePlayerData() {
  
  let endingsUnlockedIndexes = []

  for (ending in branchDiagramUnlocks) {
    if (branchDiagramUnlocks[ending][1] == true) {
      endingsUnlockedIndexes.push(ending)
    }
  }

  let playerToSaveAs = playerData.players.find(player => player.playerID === currentPlayerData)
  let playerNameToSave = playerToSaveAs.name

  let newData = {
    "name": playerNameToSave,
    "playerID": currentPlayerData,
    "currentSessionData": [
        {"currentGameState": currentGameState},
        {"currentLocation": currentLocation},
        {"currentFocus": currentFocus},
        {"currentPlayStage": currentPlayStage},
        {"playStageInteractCounter": playStageInteractCounter},
        {"ITMarray": ITMarray},
        {"currentObjective": currentObjective},
        {"interactionCounts": interactionCounts}
    ],
    "progress": {
        "lastCheckpoint": null,
        "endingsUnlocked": unlockCount,
        "endingsUnlockedIndexes": endingsUnlockedIndexes,
        "branchCodeArray": branchCodeArray
    }
  }
  
  fetch('http://localhost:3000/savePlayer', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: currentPlayerData, ...newData })
  })
  .then(response => response.json())
  .then(data => {
      console.log("Save status:", data.message);
  })
  .catch(error => {
      console.error("Error saving player data:", error);
  });

  if (quittingGame == true) {
    window.location.reload()
  } else {
    pauseMenuOpen = false
    reloadPlayerDataJSON()
  }

}

function glassBreak() {

  SNDbrokenGlass.play()
  SNDbrokenGlass.stop(2)
  SNDbrokenGlass.onended(breakIn)

}

function breakIn() {

  displayingDialogue = true
  dialogueToDisplay = 22
  dialogueType = 'story'

}

function radioGame() {

  push()
  fill('black')
  rect(0, 256/4, 1550, 1024)
  pop()

  push ()

  translate(200, 0)
  imageMode(CENTER)

  push()
  
  scale(1.5, 1.5)

  let imageMapToUse = MGmap0
  let INSTRUCTtext = null
  let ROOMtext = null

  let killerRadarX = 0
  let killerRadarY = 0

  let playerRadarX = 0
  let playerRadarY = 0

  let walkieRadarX = 0
  let walkieRadarY = 0

  let killerLocationImage = RADanimFrames[0]

  let playerMouseX = newMouseX - 200

  if (minigame3init == true) {
    RADkillerLocation = 2
    RADplayerLocation = 3
    RADwalkieLocations[1] = 5
    minigame3init = false
  }

  if (playerMouseX > -360 && playerMouseX < -90 && newMouseY > -360 && newMouseY < -120) {
    RADhoveredRoom = 1
  } else if (playerMouseX > -80 && playerMouseX < 50 && newMouseY > -360 && newMouseY < 70) {
    RADhoveredRoom = 2
  } else if (playerMouseX > 70 && playerMouseX < 380 && newMouseY > -280 && newMouseY < 70) {
    RADhoveredRoom = 3
  } else if (playerMouseX > -260 && playerMouseX < -100 && newMouseY > -100 && newMouseY < 20) {
    RADhoveredRoom = 4
  } else if ((playerMouseX > -260 && playerMouseX < -100 && newMouseY > 50 && newMouseY < 280) || (playerMouseX > -99 && playerMouseX < 260 && newMouseY > 100 && newMouseY < 280)) {
    RADhoveredRoom = 5
  } else {
    RADhoveredRoom = 0
  }

  if (RADchoosingLocation == 'killer') {
    if (RADhoveredRoom != 0 && (RADwalkieLocations[0] == RADhoveredRoom || RADwalkieLocations[1] == RADhoveredRoom)) {
    //RadhoveredRoom stays the same
    } else {
      RADhoveredRoom = 0
    }
  }

  

  if (RADhoveredRoom == 0) {
    imageMapToUse = MGmap0
    ROOMtext = ''
  } else if (RADhoveredRoom == 1) {
    imageMapToUse = MGmap1
    ROOMtext = 'kitchen'
  } else if (RADhoveredRoom == 2) {
    imageMapToUse = MGmap2
    ROOMtext = 'hallway'
  } else if (RADhoveredRoom == 3) {
    imageMapToUse = MGmap3
    ROOMtext = 'living room'
  } else if (RADhoveredRoom == 4) {
    imageMapToUse = MGmap4
    ROOMtext = 'bathroom'
  } else if (RADhoveredRoom == 5) {
    imageMapToUse = MGmap5
    ROOMtext = 'bedroom'
  }


  if (RADchoosingLocation == 'killer') {
    INSTRUCTtext = 'Where should I lure the killer to?'
  } else if (RADchoosingLocation == 'player') {
    INSTRUCTtext = 'Where should I go?'
  } else {
    INSTRUCTtext = ''
  }
  

  
  image(imageMapToUse, 0, 0)

  push()
  fill('white')
  textFont(VT323Font, 35)
  textAlign(CENTER, CENTER)
  text(INSTRUCTtext, 0, 250)
  fill('red')
  textFont(VT323Font, 30)
  text(ROOMtext, 0, 280)
  pop()

  push()
  fill('white')
  textFont(VT323Font, 35)
  textAlign(CENTER, CENTER)
  text('legend:', -475, -250)
  textFont(VT323Font, 25)
  text("killer's location", -400, -208)
  image(RADanimFrames[1], -510, -200, 256, 256)
  text("quinn + walkie #1", -402, -168)
  push()
  tint(233, 145, 243)
  image(MGchainPointer, -505, -220, 200, 200)
  pop()
  text("walkie #2", -440, -128)
  push()
  tint(145, 168, 243)
  image(MGchainPointer, -505, -180, 200, 200)
  pop()
  textWrap(WORD)
  text("I can speak into my walkie talkie, and the sound will play through the other radio and, hopefully, lure the killer to wherever that is, then I have my chance to move! I can try and get to the front door, then I can escape through there.", -410, 50, 300)
  pop()
  


  let kitchenX = -225
  let kitchenY = -240
  let hallX = -15
  let hallY = -145
  let livingX = 225
  let livingY = -105
  let bathX = -180
  let bathY = -40
  let bedroomX = -15
  let bedroomY = 190

  if (RADkillerLocation == 1) {
    killerRadarX = kitchenX
    killerRadarY = kitchenY
  } else if (RADkillerLocation == 2) {
    killerRadarX = hallX
    killerRadarY = hallY
  } else if (RADkillerLocation == 3) {
    killerRadarX = livingX
    killerRadarY = livingY
  } else if (RADkillerLocation == 4) {
    killerRadarX = bathX
    killerRadarY = bathY
  } else if (RADkillerLocation == 5) {
    killerRadarX = bedroomX
    killerRadarY = bedroomY
  }

  if (RADplayerLocation == 1) {
    playerRadarX = kitchenX
    playerRadarY = kitchenY
  } else if (RADplayerLocation == 2) {
    playerRadarX = hallX
    playerRadarY = hallY
  } else if (RADplayerLocation == 3) {
    playerRadarX = livingX
    playerRadarY = livingY
  } else if (RADplayerLocation == 4) {
    playerRadarX = bathX
    playerRadarY = bathY
  } else if (RADplayerLocation == 5) {
    playerRadarX = bedroomX
    playerRadarY = bedroomY
  }

  RADwalkieLocations[0] = RADplayerLocation

  if (RADwalkieLocations[1] == 1) {
    walkieRadarX = kitchenX
    walkieRadarY = kitchenY
  } else if (RADwalkieLocations[1] == 2) {
    walkieRadarX = hallX
    walkieRadarY = hallY
  } else if (RADwalkieLocations[1] == 3) {
    walkieRadarX = livingX
    walkieRadarY = livingY
  } else if (RADwalkieLocations[1] == 4) {
    walkieRadarX = bathX
    walkieRadarY = bathY
  } else if (RADwalkieLocations[1] == 5) {
    walkieRadarX = bedroomX
    walkieRadarY = bedroomY
  }

  if (RADanimTick < 5) {
    killerLocationImage = RADanimFrames[0]
  } else if (RADanimTick < 10) {
    killerLocationImage = RADanimFrames[1]
  } else if (RADanimTick < 15) {
    killerLocationImage = RADanimFrames[2]
  } else if (RADanimTick < 20) {
    killerLocationImage = RADanimFrames[3]
  } else if (RADanimTick < 25) {
    killerLocationImage = RADanimFrames[4]
  } else if (RADanimTick < 30) {
    killerLocationImage = RADanimFrames[5]
  } else {
    killerLocationImage = null
  }

  if (RADanimTick <= 50) {
    RADanimTick ++
  } else {
    RADanimTick = 0
  }

  pop()

  push()

  if (killerLocationImage != null) {
    image(killerLocationImage, killerRadarX, killerRadarY, 450, 450)
  }

  push()
  tint(233, 145, 243)
  image(MGchainPointer, playerRadarX - 20, playerRadarY - 100, 300, 300)
  pop()

  push()
  tint(145, 168, 243)
  image(MGchainPointer, walkieRadarX + 20, walkieRadarY - 100, 300, 300)
  pop()

  // rect(kitchenX, kitchenY, 20, 20)
  // rect(hallX, hallY, 20, 20)
  // rect(livingX, livingY, 20, 20)
  // rect(bathX, bathY, 20, 20)
  // rect(bedroomX, bedroomY, 20, 20)

  if (newMouseX > -470 && newMouseX < -370 && newMouseY > 300 && newMouseY < 400) {
    hoveringMinigameInstructionButton = true
  } else {
    hoveringMinigameInstructionButton = false
  }

  push()
  translate(0, -35)
  if (hoveringMinigameInstructionButton == true) {
    fill('red')
  } else {
    fill('white')
  }
  ellipse(-625, 390, 110, 110)
  fill('black')
  ellipse(-625, 390, 100, 100)
  fill('white')
  textFont(VT323Font, 120)
  textAlign(CENTER, CENTER)
  text('i', -625, 375)
  pop()


  pop()

  pop()

  if (displayingMinigameInstructions == true) {

    push()
    fill('black')
    rect(0, 256/4, 1550, 1024)
    fill('white')
    rect(0, 0, 1000, 750)
    fill('black')
    rect(0, 0, 985, 740)
    fill('white')
    textFont(VT323Font, 40)
    textAlign(CENTER, CENTER)
    textWrap(WORD)
    text("Each turn you may choose where to move yourself, and where to activate the walkie talkie in order to lure the intruder. You can skip either of these actions, but you run the risk of the intruder moving on his own while searching for you. Your aim is to reach the hallway so you can escape through the front door. However, if the intruder moves into or through the same room as you, you will be caught and it's game over... unless there is a hiding spot available, where you can wait for the killer to move on. There are two hiding spots in the bedroom, and one in the bathroom.", 0, 0, 900)
    textSize(30)
    text("click anywhere to close...", 0, 325)
    textSize(70)
    text("instructions", 0, -325)
    pop()

  }




}

function checkRadioGameMovement() {

  if (RADchoosingLocation == 'killer') {
    
    if (RADhoveredRoom != RADkillerLocation && RADhoveredRoom != 0) {
      RADkillerMove = [RADkillerLocation, RADhoveredRoom]
      checkRadioGameResult(RADkillerMove)
    }
  } else {
    
    if (RADhoveredRoom != RADplayerLocation && RADhoveredRoom != 0) {
      RADplayerMove = [RADplayerLocation, RADhoveredRoom]
      checkRadioGameResult(RADplayerMove)
    }
  }

}

function checkRadioGameResult(RADmovingArray) {

  let RADsuccessfulMove = true
  
  let RADmoveToCheck = RADmovingArray
  let RADmoveToCheckAgainst = 0
  
  if (RADchoosingLocation == 'player') {
    RADmoveToCheckAgainst = RADkillerLocation
  } else {
    RADmoveToCheckAgainst = RADplayerLocation
  }

  if (RADmoveToCheckAgainst == 1) {
    if (RADmoveToCheck[1] == 1) {
      RADsuccessfulMove = false
    }
  } else if (RADmoveToCheckAgainst == 2) {
    if (RADmoveToCheck[1] == 2) {
      RADsuccessfulMove = false
    } else if ((RADmoveToCheck[0] == 3 || RADmoveToCheck[0] == 5) && (RADmoveToCheck[1] == 1 || RADmoveToCheck[1] == 4)) {
      RADsuccessfulMove = false
    } else if ((RADmoveToCheck[1] == 3 || RADmoveToCheck[1] == 5) && (RADmoveToCheck[0] == 1 || RADmoveToCheck[0] == 4)) {
      RADsuccessfulMove = false
    }
  } else if (RADmoveToCheckAgainst == 3) {
    if (RADmoveToCheck[1] == 3) {
      RADsuccessfulMove = false
    } else if ((RADmoveToCheck[0] == 5) && (RADmoveToCheck[1] == 1 || RADmoveToCheck[1] == 2 || RADmoveToCheck[1] == 4)) {
      RADsuccessfulMove = false
    } else if ((RADmoveToCheck[1] == 5) && (RADmoveToCheck[0] == 1 || RADmoveToCheck[0] == 2 || RADmoveToCheck[0] == 4)) {
      RADsuccessfulMove = false
    }
  } else if (RADmoveToCheckAgainst == 4) {
    if (RADmoveToCheck[1] == 4) {
      RADsuccessfulMove = false
    }
  } else if (RADmoveToCheckAgainst == 5) {
    if (RADmoveToCheck[1] == 5) {
      RADsuccessfulMove = false
    }
  }
  


  if (RADchoosingLocation == 'player' && RADsuccessfulMove == true) {
    if (RADmoveToCheck[1] == 2) {
      RADplayerLocation = RADmoveToCheck[1]
      intermediateWalkieGameActive = true
      fadingInit = true
      fadingForward = true
      intermediateLocation = 1
      intermediateFocus = 1
    } else {
      RADchoosingLocation = 'killer'
      RADplayerLocation = RADmoveToCheck[1]
    }
  } else if (RADchoosingLocation == 'killer' && RADsuccessfulMove == true) {
    RADchoosingLocation = 'player'
    RADkillerLocation = RADmoveToCheck[1]
  } else if (RADmoveToCheck[1] == 5 || RADmoveToCheck[1] == 4 || RADmoveToCheckAgainst == 5 || RADmoveToCheckAgainst == 4) {
    push()
    fill('black')
    rect(0, 256/4, 1550, 1024)
    pop()
    if (RADmoveToCheck[1] == 5 || RADmoveToCheckAgainst == 5) {
      displayingDialogue = true
      dialogueToDisplay = 27
      dialogueType = 'story'
    } else if (RADmoveToCheck[1] == 4 || RADmoveToCheckAgainst == 4) {
      displayingDialogue = true
      dialogueToDisplay = 28
      dialogueType = 'story'
    }
  } else {
    gameEnd('radio')
  }

}

function hidingMinigame() {

  let maxRadius = 590
  let minRadius = 350

  let timeRemaining = 0;
  let timeElapsed = 0;

  push()
  fill('black')
  rect(0, 256/4, 1550, 1024)
  pop()

  push()
  fill('white')
  ellipse(0, 0, 600, 600)
  fill('black')
  ellipse(0, 0, 590, 590)
  pop()

  push()
  fill('red')
  ellipse(0, 0, minigame4radius, minigame4radius)
  pop()

  push()
  fill('white')
  ellipse(0, 0, 350, 350)
  fill('black')
  ellipse(0, 0, 340, 340)
  pop()

  if (pregameInstructions4 == true) {
    push()
    fill('black')
    rect(0, 256/4, 1550, 1024)
    pop()

    push()
    fill('white')
    textFont(VT323Font, 70)
    textAlign(CENTER, CENTER)
    textWrap(WORD)
    text("Ok, I can hide in here until the intruder moves on. But I HAVE to stay still, otherwise he might find me!", 0, -175, 750)
    fill('red')
    textSize(50)
    text("Click to keep the red circle in the boundaries (it will decrease in radius over time, click to increase the radius and keep it within the outlining circles). If it dips outside either boundary, you 'move'.", 0, 250, 800)
    fill('white')
    textSize(35)
    text("click anywhere to continue...", 0, 490, 800)
    pop()

  } else {

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
    text(`${timeRemaining.toFixed(1)}s`, 0, 0)
    pop()

  }
  
  if (minigame4radius > minRadius && pregameInstructions4 == false) {
    if (timeElapsed < 10000) {
      minigame4radius -= 2
    } else if (timeElapsed < 20000) {
      minigame4radius -= 4
    } else if (timeElapsed < 30000) {
      minigame4radius -= 6
    } else {
      minigame4radius -= 8
    }
  }

  if (pregameInstructions4 == false) {
    if (timeElapsed >= 45000) {
      minigame4Active = false
    } else if (minigame4radius >= maxRadius || minigame4radius <= minRadius) {
      hidingFound()
      hidingResult = true
    }
  }


}

function hidingFound() {

  let hidingPlace = SP_hidingArray[(SP_hidingArray.length) - 1]
  let resultText = ''

  if (hidingPlace == 'wardrobe') {
    resultText = 'Always hated being in the closet anyway.'
  } else if (hidingPlace == 'shower') {
    resultText = 'Slippery place, that shower.'
  } else if (hidingPlace == 'bed') {
    resultText = 'It was so dusty under there, no wonder I sneezed. Shame I had to do it so loudly, and when the intruder was... right there.'
  }

  push()
  fill('white')
  textFont(VT323Font, 75)
  textAlign(CENTER, CENTER)
  textWrap(WORD)
  text(resultText, 0, 0, 1000)
  pop()

}

function ambientSoundManager() {

  if (currentGameState == 1 && SNDoutside.isPlaying() == false) {
    SNDoutside.setVolume(0.8)
    SNDoutside.loop()
    SNDoutside.play()
  } else if (currentGameState == 2 && SNDinside.isPlaying() == false) {
    SNDoutside.stop()
    SNDinside.loop()
    SNDinside.play()
  } else if (SNDchaseSong.isPlaying == true) {
    SNDinside.stop()
  }
}


function draw() {
  background('black')
  noCursor()
  
  frameRate(24)

  ambientSoundManager()


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
  } else if (firstEncounter == false) {
    outdoorsStoryPointTrigger()
  }


  if (MIRdisplay == true) {
    bathroomMirrorInteract()
  } else if (showingWindowInteract == true) {
    livingRoomWindowInteract()
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

    if (followUpDialogue[0] == null) {
      showHUD = true
    }



  }

  pop()

  //check whether the mouse is hovering over anything interactable
  checkMouseHover()


if (quinnMovable == true) {
  checkKeyPress()
} else if (currentGameState == 1 && cutScenes[1] == false) {
  SPR_quinn.displayStaticSprite()
}

if (ITMcollectedType != null) {
  ITMcollected(ITMcollectedType)
}

if (playStageInteractCounter > 8 && currentPlayStage == 2 && displayingDialogue == false && followUpDialogue[0] == null && MIRdisplay == false && showingWindowInteract == false) {
  currentPlayStage = 2.5
  playStageInteractCounter = 0
  displayingDialogue = true
  dialogueToDisplay = 3
  dialogueType = 'story'
} else if (playStageInteractCounter > 8 && currentPlayStage == 4 && displayingDialogue == false && followUpDialogue[0] == null && MIRdisplay == false && showingWindowInteract == false) {
  currentPlayStage = 5
  playStageInteractCounter = 0
  displayingDialogue = true
  dialogueToDisplay = 1
  dialogueType = 'story'
} else if (currentPlayStage == 6 && branchCodeArray[10][1] == true && displayingDialogue == false) {
  currentPlayStage = 7
  displayingDialogue = true
  dialogueToDisplay = 21
  dialogueType = 'story'
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

if (minigame3Active == true) {
  radioGame()
}

if (minigame4Active == true) {
  hidingMinigame()
}

if (hidingResult == true) {
  hidingFound()
}

if (pickingRewind == true) {
  showHUD = false
  pickRewind()
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

if (dialogueToDisplay == 15 && dialogueType == 'interact' && SNDradio.isPlaying() == false) {
  SNDradio.loop()
  SNDradio.play()
}


//track mouse coordinates on screen (useful for tracking click position later, remove when submitting final game)
// fill('white')
// textFont(VT323Font, 30)
// textAlign(CENTER, CENTER)
// text(newMouseX, newMouseX+50, newMouseY)
// text(newMouseY, newMouseX+50, newMouseY + 30)
// text(interactID, newMouseX+50, newMouseY + 60)

if (followUpDialogue[0] != null && displayingDialogue == false) {

  displayingDialogue = true
  dialogueToDisplay = followUpDialogue[0]
  dialogueType = followUpDialogue[1]
  followUpDialogue = [null, null]

}

if (pauseMenuOpen == true) {

  let hoverButton1Colour = 'white'
  let hoverButton2Colour = 'white'
  let hoverButton3Colour = 'white'

  push()
  fill('black')
  rect(0, 256/4, 1550, 1024)
  pop()


  if (newMouseX > -95 && newMouseX < 95) {
    if (newMouseY > -240 && newMouseY < -140) {
      hoverButton1Colour = 'red'
      pauseMenuHover = 1
    } else if (newMouseY > -50 && newMouseY < 50) {
      hoverButton2Colour = 'red'
      pauseMenuHover = 2
    } else if (newMouseY > 140 && newMouseY < 240) {
      hoverButton3Colour = 'red'
      pauseMenuHover = 3
    }
  }

  push()
  fill(hoverButton1Colour)
  rect(0, -190, 200, 100)
  fill('black')
  rect(0, -190, 190, 90)
  fill(hoverButton2Colour)
  rect(0, 0, 200, 100)
  fill('black')
  rect(0, 0, 190, 90)
  fill(hoverButton3Colour)
  rect(0, 190, 200, 100)
  fill('black')
  rect(0, 190, 190, 90)
  pop()

  push()
  fill('white')
  textFont(VT323Font, 80)
  textAlign(CENTER, CENTER)
  text("play", 0, -205)
  text("save", 0, -15)
  text("quit", 0, 175)
  pop()
}

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

if (killerJumpscare == true) {
  getKilledFool(null)
}

push()
translate(0, 256/4)
//semi-transparent VHS-style overlay
tint(255, 100);
image(VHSoverlay, 0, 0, 1560, 1034);
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


}