var windowHeight = 700;
var windowWidth = 1000;

var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, 'myPhaserID', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    game.load.image("bgLvl0", "../_RES/bg/layer0.png");
    game.load.image("bgLvl1", "../_RES/bg/layer1.png");
    game.load.image("bgLvl2", "../_RES/bg/layer2.png");
    game.load.image("bgLvl3", "../_RES/bg/plx-4.png");
    game.load.image("bgLvl4", "../_RES/bg/plx-5.png");

    //game.load.image("platform1", "../_RES/platform/platform1.png")


}

function create() {

    //Initializing Background!-------------------------------------


    this.wall0 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl0");
    this.wall1 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl1");
    this.wall2 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl2");
    this.wall3 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl3");
    this.wall4 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl4");

    
    this.wall3.tileScale.set(3.2, 3.2);
    this.wall4.tileScale.set(3.2, 3.2);

    this.wallGroup = game.add.group();

    this.wallGroup.add(this.wall0);
    this.wallGroup.add(this.wall1);
    this.wallGroup.add(this.wall2);
    this.wallGroup.add(this.wall3);
    this.wallGroup.add(this.wall4);
    //--------------------------------------------------------------


}

function update() {
    this.wall1.tilePosition.x -= 0.006;
    this.wall2.tilePosition.x -= 0.01;
    this.wall3.tilePosition.x -= 0.02;
    this.wall4.tilePosition.x -= 0.04;


}



