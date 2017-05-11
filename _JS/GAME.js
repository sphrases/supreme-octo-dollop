
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'myPhaserID', { preload: preload, create: create, update: update});

function preload() {
    //Hintergrund besteht aus 5 verschiedenen Bildern
    game.load.image('back0', '../_RES/Parallax background/plx-1.png');
    game.load.image('back1', '../_RES/Parallax background/plx-2.png');
    game.load.image('back2', '../_RES/Parallax background/plx-3.png');
    game.load.image('back3', '../_RES/Parallax background/plx-4.png');
    game.load.image('back4', '../_RES/Parallax background/plx-5.png');

    game.load.audio('boi', '../_RES/audio/YeahBoi/boi.mp3');
    game.load.audio('yeah', '../_RES/audio/YeahBoi/yeah.mp3');
    game.load.audio('ossas', '../_RES/audio/YeahBoi/ossas.mp3');

    game.load.image('ground', '../_RES/ground/ground.png');
    game.load.image('floating_ground', '../_RES/ground/floating_ground.png');
    game.load.spritesheet('dude', '../_RES/dude.png', 32, 48);
    game.load.image('star', '../_RES/sprites/ship.png');




}
var platforms;
var player;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    var bg0 = game.add.sprite(0, 0, 'back0');
    bg0.scale.setTo(3, 3);
    var bg1 = game.add.sprite(0, 0, 'back1');
    bg1.scale.setTo(3, 3);
    var bg2 = game.add.sprite(0, 0, 'back2');
    bg2.scale.setTo(3, 3);
    var bg3 = game.add.sprite(0, 0, 'back3');
    bg3.scale.setTo(3, 3);
    var bg4 = game.add.sprite(0, 0, 'back4');
    bg4.scale.setTo(3, 3);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = false;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 370, 'floating_ground');
    ledge.scale.setTo(2, 2);

    ledge.body.immovable = false;

    ledge = platforms.create(-600, 250, 'floating_ground');
    ledge.scale.setTo(2, 2);
    ledge.body.immovable = false;

    //END WORLD ______________________________________________________________

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 1;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    //_________________________________________-
    cursors = game.input.keyboard.createCursorKeys();


    boi = game.add.audio('boi');
    yeah = game.add.audio('yeah');
    ossas = game.add.audio('ossas');
    //game.sound.setDecodedCallback([boi, yeah]);




}

function update() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        ossas.play();
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown)
    {

        boi.play();
        player.body.velocity.y = -500;
    }


    if (cursors.down.isDown) {
        yeah.play();


    }
}



