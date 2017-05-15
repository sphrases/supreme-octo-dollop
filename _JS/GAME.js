
var windowHeight = $(window).height()-100;
var windowWidth = $(window).width()-120;

var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, 'myPhaserID', { preload: preload, create: create, update: update});

function preload() {

    game.load.image("bgLvl0", "../_RES/bg/plx-1.png");
    game.load.image("bgLvl1", "../_RES/bg/plx-2.png");
    game.load.image("bgLvl2", "../_RES/bg/plx-3.png");
    game.load.image("bgLvl3", "../_RES/bg/plx-4.png");
    game.load.image("bgLvl4", "../_RES/bg/plx-5.png");


}

function create() {

    //Initializing Background!
    var wall0 = game.add.sprite(0, 0, "bgLvl0");
    var wall1 = game.add.sprite(0, 0, "bgLvl1");
    var wall2 = game.add.sprite(0, 0, "bgLvl2");
    var wall3 = game.add.sprite(0, 0, "bgLvl3");
    var wall4 = game.add.sprite(0, 0, "bgLvl4");

    var wallGroup = game.add.group();

    wallGroup.add(wall0);
    wallGroup.add(wall1);
    wallGroup.add(wall2);
    wallGroup.add(wall3);
    wallGroup.add(wall4);


    wallGroup.height = 600;
    wallGroup.width = 500;


}

function update() {


}



