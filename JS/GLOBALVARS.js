
//GAME_________________________________________________________
var windowHeight = 700;
var windowWidth = 1000;

//STATE1_______________________________________________________
var startGameButton;
var startScreenWall;
var tutorialButton;
var heart;
var deagle;


//STATE2_______________________________________________________

var style
var scoreText;
var score = 1;
var wall0;
var wall1;
var wall2;
var wall3;
var wall4;

var velocityVector = 1;
var weapon1, weapon2, weapon3, weapon4, weapon5, weapon6;

var jumps = 0;
var jumpwaspressed = false;
var jumppressed = false;
var playJumpSound;
var cursors;
var enemies;
var playerChar;
var body;

var currentWeapon;
var firstWeapon;
var lastWeapon;
var currentWeaponID;

var ownedWeapons = [];
var weapons = [];
var gameKeyboard;
var key;


var time_til_spawn = Math.random() * 3000 + 2000;  //Random time between 2 and 5 seconds.
var enemy_height = Math.random() * 550 + 100;

var backgroundMusic;
var musicPlaying;
var musicToggleButton;
var timer;

var livesCounter1;
var livesCounter2;
var livesCounter3;
var lives = [];
var livesCount;
var liveWasChanged;
var liveChanged;

var blinkTimer;
var blinkCounter = 0;
var blinkBool = true;
var weaponDropTimer;
var weaponDropGroup;
var weaponBreakTimer;
var weaponDropped = false;
var weaponWasDropped;
var weaponSpawnTimer;


//STATE3_______________________________________________________


