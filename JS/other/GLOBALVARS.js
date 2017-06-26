
//GAME_________________________________________________________

//STATE1_______________________________________________________
var startGameButton;
var startScreenWall;
var tutorialButton;
var heart;
var deagle;


//STATE2_______________________________________________________


var blinkSound;
var mouseBoundX;
var mouseBoundY;
var style = { font: "bold 40px Amatic Sc", fill: "#ffffff", align: "center"};

var scoreText;
var score = 1;
var wall0;
var wall1;
var wall2;
var wall3;
var wall4;

var velocityVector;
var weapon1, weapon2, weapon3, weapon4, weapon5, weapon6;

var jumps;
var jumpwaspressed = false;
var jumppressed = false;
var playJumpSound;
var cursors;
var enemies;
var playerChar;
var body;
var groundlings;
var groundling_height;

var currentWeapon;
var firstWeapon;
var lastWeapon;
var currentWeaponID;
var currentWeaponSprite;

var weaponSpriteGroup = [];
var ownedWeapons = [];
var weapons = [];
var gameKeyboard;
var key;


var time_til_spawn = Math.random() * 3000 + 2000;  //Random time between 2 and 5 seconds.
var time_til_spawn_g = Math.random() * 3000 + 2000;
var enemy_height = Math.random() * 550 + 100;

var backgroundMusic;
var musicPlaying = true;
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
var blinkCounter;
var blinkBool = true;
var weaponDropTimer;
var weaponDropGroup;
var weaponBreakTimer;
var weaponDropped = false;
var weaponWasDropped;
var weaponSpawnTimer;


//STATE3_______________________________________________________


var tweetScoreButton;