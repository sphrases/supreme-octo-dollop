var windowHeight = 700;
var windowWidth = 1000;

var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, 'myPhaserID', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    //loading the backgrounds
    game.load.image("bgLvl0", "../_RES/bg/layer0.png");
    game.load.image("bgLvl1", "../_RES/bg/layer1.png");
    game.load.image("bgLvl2", "../_RES/bg/layer2.png");
    game.load.image("bgLvl3", "../_RES/bg/plx-4.png");
    game.load.image("bgLvl4", "../_RES/bg/plx-5.png");

    //loading the players spritesheet
    game.load.spritesheet('dude', '../_RES/dude.png', 32, 48);


}

function create() {
    //Initializing the physix system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


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

    //Init character
    playerChar = game.add.sprite(300, game.world.height - 150, 'dude');


    game.physics.arcade.enable(playerChar);
    playerChar.body.bounce.y = 0.2;
    playerChar.body.gravity.y = 300;
    playerChar.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    playerChar.animations.add('left', [0, 1, 2, 3], 10, true);
    playerChar.animations.add('right', [5, 6, 7, 8], 10, true);


    //read keyboard input
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    this.wall1.tilePosition.x -= 0.25;
    this.wall2.tilePosition.x -= 0.5;
    this.wall3.tilePosition.x -= 1;
    this.wall4.tilePosition.x -= 2;

    //Handle playerChar movement!
    //cancel velocity
    playerChar.body.velocity.x = 0;






    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown)
    {
        playerChar.body.velocity.y = -350;
    } else {
        playerChar.animations.stop();

        playerChar.frame = 4;
    }



}



