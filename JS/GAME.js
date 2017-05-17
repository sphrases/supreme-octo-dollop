var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, 'myPhaserID', {
    preload: preload,
    create: create,
    update: update
}, true, false);


var last_spawn_time = game.time;

function preload() {


    //loading the backgrounds
    game.load.image("bgLvl0", "../RES/bg/layer0.png");
    game.load.image("bgLvl1", "../RES/bg/layer1.png");
    game.load.image("bgLvl2", "../RES/bg/layer2.png");
    game.load.image("bgLvl3", "../RES/bg/plx-4.png");
    game.load.image("bgLvl4", "../RES/bg/plx-5.png");

    //loading the players spritesheet
    game.load.spritesheet('dude', '../RES/dude.png', 32, 48);

    game.load.image('ground', '../RES/ground/ground.png');

    game.load.image('bullet', '../RES/sprites/bullet2.png');
    game.load.image('beam', '../RES/sprites/beam.png');


    //load sounds
    game.load.audio('bulletGunSound', '../RES/audio/pew.wav');
    game.load.audio('machineGunSound', '../RES/audio/machineGun.mp3');
    game.load.audio('enemyHit', '../RES/audio/smallExplosion.mp3');
    game.load.audio('playJumpSound', '../RES/audio/YeahBoi/boi.mp3');
    game.load.audio('laserGunSound', '../RES/audio/laser.mp3');


    //load enemies
    game.load.image('enemyBullet', '../RES/sprites/bullet2.png');
    game.load.spritesheet('invader', '../RES/sprites/ship2.png', 32, 32);

}

function create() {
    //Initializing the physix system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    //Initializing Background!-------------------------------------
    wall0 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl0");
    wall1 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl1");
    wall2 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl2");
    wall3 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl3");
    wall4 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl4");


    wall3.tileScale.set(3.2, 3.2);
    wall4.tileScale.set(3.2, 3.2);

    /*wallGroup = game.add.group();

     wallGroup.add(this.wall0);
     wallGroup.add(this.wall1);
     wallGroup.add(this.wall2);
     wallGroup.add(this.wall3);
     wallGroup.add(this.wall4);*/
    //--------------------------------------------------------------


    //Init ground layer
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 82, 'ground');
    ground.scale.setTo(3, 2);
    ground.body.immovable = true;
    ground.alpha = 0


    //Init character
    playerChar = game.add.sprite(150, game.world.height - 200, 'dude');
    game.physics.arcade.enable(playerChar);
    playerChar.body.bounce.y = 0;
    playerChar.body.gravity.y = 300;
    playerChar.body.collideWorldBounds = true;
    playerChar.scale.setTo(2, 2);

    playerChar.animations.add('jump', [3], 10, true);
    playerChar.animations.add('right', [5, 6,], 10, true);


    //WEAPONS!
    playBulletGunSound = game.add.audio('bulletGunSound');
    enemyHit = game.add.audio('enemyHit');
    playJumpSound = game.add.audio('playJumpSound');
    playMachineGunSound = game.add.audio('machineGunSound');
    playLaserSound = game.add.audio('laserGunSound');

    //pistol
    createWeapon(weapon1, 30, 'bullet', 300, 600, 0, playBulletGunSound);
    createWeapon(weapon2, 30, 'bullet', 500, 90, 7, playMachineGunSound);
    createWeapon(weapon3, 3, 'beam', 1000, 300, 0, playLaserSound);
    createWeapon(weapon4, 40, 'beam', 1000, 30, 0, playLaserSound);

    firstWeapon = 0;
    lastWeapon = weapons.length - 1;
    currentWeaponID = 0;
    currentWeapon = weapons[currentWeaponID];

    //  The baddies!
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    gameKeyboard = game.input.Keyboard;
    cursors = game.input.keyboard.createCursorKeys()
    key = game.input.keyboard;

}

function update() {

    game.physics.arcade.collide(playerChar, platforms);
    currentWeapon = weapons[currentWeaponID];
    jumpwaspressed = jumppressed;
    jumppressed = cursors.up.isDown;


    moveWorld(this.game);
    spawnEnemy();
    moveEnemies();
    readInput();
    playAnimations();


    //READ INPUTS...

    weapons.forEach(
        function e(x) {
            game.physics.arcade.overlap(x.bullets, enemies, collisionHandler, null, this)
        });
    game.physics.arcade.overlap(enemies, playerChar, collisionHandler, null, this);


}

