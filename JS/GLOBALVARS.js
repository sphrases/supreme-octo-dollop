var wall0;
var wall1;
var wall2;
var wall3;
var wall4;
var wallGroup;


var weapon1, weapon2, weapon3, weapon4, weapon5, weapon6;

var windowHeight = 700;
var windowWidth = 1000;
var jumps = 0;
var jumpwaspressed = false;
var jumppressed = false;
var playJumpSound;

var bulletTime = 0;
var cursors;
var rightWasDown = 0;
var enemies;
var playerChar;
var body;

var machineGun;
var pistol;
var currentWeapon;
var firstWeapon;
var lastWeapon;
var currentWeaponID;
var bullets;

var weapons = [];
var gameKeyboard;
var key;

var wasSelectedUpState;
var SelectedUpState;
var wasSelectedUpState1;
var SelectedUpState1;
var wasSelectedUpState2;
var SelectedUpState2;

var playerIsInAir;

var time_til_spawn = Math.random() * 3000 + 2000;  //Random time between 2 and 5 seconds.
var enemy_height = Math.random() * 550 + 100;

var backgroundMusic;