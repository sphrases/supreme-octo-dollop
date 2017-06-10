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
    game.load.image("bgLvl3", "../RES/bg/layer3.png");
    game.load.image("bgLvl4", "../RES/bg/layer4.png");


    //loading the players spritesheet
    game.load.spritesheet('dude', '../RES/dude.png', 32, 48);
    game.load.spritesheet('guns', '../RES/guns.png', 32, 48);

    game.load.image('ground', '../RES/ground/ground.png');

    game.load.image('bullet', '../RES/sprites/bullet2.png');
    game.load.image('beam', '../RES/sprites/beam.png');
    game.load.image('piml', '../RES/sprites/piml.png');


    game.load.spritesheet('musicSprite', '../RES/sprites/music_sprite.png', 100, 100);

    //load sounds
    game.load.audio('bulletGunSound', '../RES/audio/pew.wav');
    game.load.audio('machineGunSound', '../RES/audio/machineGun.mp3');
    game.load.audio('enemyHit', '../RES/audio/smallExplosion.mp3');
    game.load.audio('playJumpSound', '../RES/audio/YeahBoi/boi.mp3');
    game.load.audio('laserGunSound', '../RES/audio/laser.mp3');
    //game.load.audio('background_music', '../RES/audio/Pocketmaster.wav');


    //load enemies
    game.load.image('enemyBullet', '../RES/sprites/bullet2.png');
    game.load.spritesheet('invader', '../RES/sprites/ship2.png', 32, 32);
    game.load.spritesheet('dropBox', '../RES/sprites/bulletBox.png', 32, 32);
    game.load.spritesheet('heart', '../RES/sprites/heart.png', 32, 32, 2);


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


    musicToggleButton = game.add.button(960, 0, 'musicSprite', toggleMusic, this, 0);
    musicToggleButton.scale.set(0.4, 0.4);


    //create lives
    livesCounter1 = game.add.sprite(10, 5, 'heart');
    livesCounter1.scale.set(1.5, 1.5);
    livesCounter2 = game.add.sprite(60, 5, 'heart');
    livesCounter2.scale.set(1.5, 1.5);
    livesCounter3 = game.add.sprite(110, 5, 'heart');
    livesCounter3.scale.set(1.5, 1.5);

    lives.push(livesCounter1);
    lives.push(livesCounter2);
    lives.push(livesCounter3);



    console.log(lives);

    //Init ground layer
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 90, 'ground');
    ground.scale.setTo(3, 2);
    ground.body.immovable = true;
    ground.alpha = false;


    //Init character
    playerChar = game.add.sprite(150, game.world.height - 300, 'dude');
    game.physics.arcade.enable(playerChar);
    playerChar.body.bounce.y = 0;
    playerChar.body.gravity.y = 400;
    playerChar.body.collideWorldBounds = true;
    playerChar.scale.setTo(2.5, 2.5);

    guns = game.add.sprite(0,0, 'guns');
    //guns.scale.setTo(2, 2);
    guns.frame = 0;
    playerChar.addChild(guns);

    playerChar.animations.add('jump', [3], 10, true);
    playerChar.animations.add('right', [5, 6], 7, true);
    playerChar.animations.add('hit', [6, 9], 7, true);


    //WEAPONS!
    playBulletGunSound = game.add.audio('bulletGunSound');
    enemyHit = game.add.audio('enemyHit');
    playJumpSound = game.add.audio('playJumpSound');
    playMachineGunSound = game.add.audio('machineGunSound');
    playLaserSound = game.add.audio('laserGunSound');

    //pistol
    createWeapon(weapon1, 30, 'bullet', 300, 600, 0, playBulletGunSound);
    createWeapon(weapon2, 30, 'bullet', 500, 90, 2, playMachineGunSound);
    createWeapon(weapon3, 3, 'beam', 1000, 300, 0, playLaserSound);
    createWeapon(weapon4, 40, 'beam', 1000, 30, 0, playLaserSound);
    createWeapon(weapon5, 40, 'dude', 1000, 100, 0, enemyHit);

    ownedWeapons = [1, 0, 0, 0, 0];
    //createWeapon(weapon6, 1, 'piml', 700, 100, 0, playLaserSound);

    firstWeapon = 0;
    lastWeapon = weapons.length - 1;
    currentWeaponID = 0;
    currentWeapon = weapons[currentWeaponID];

    //  The baddies!
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    weaponDropGroup = game.add.group();
    weaponDropGroup.enableBody = true;
    weaponDropGroup.physicsBodyType = Phaser.Physics.ARCADE;

    gameKeyboard = game.input.Keyboard;
    cursors = game.input.keyboard.createCursorKeys();
    key = game.input.keyboard;

    // Background-Music
    //backgroundMusic = game.add.audio('background_music');
    //backgroundMusic.loop = true;
    //backgroundMusic.play();
    musicPlaying = true;
    velocityVector = 2;

    timer = game.time.create(false);
    timer.loop(10000, timerHandler, this);
    timer.start();
    weaponSpawnTimer = 20;
    weaponDropTimer = game.time.create(false);
    weaponDropTimer.loop(Phaser.Timer.SECOND * 20, spawnWeaponDrop);
    weaponDropTimer.start();


    livesCount = 3;
}

function update() {


    game.physics.arcade.collide(playerChar, platforms);
    currentWeapon = weapons[currentWeaponID];
    jumpwaspressed = jumppressed;
    jumppressed = cursors.up.isDown;
    liveWasChanged = liveChanged;
    weaponWasDropped = weaponDropped;

    moveWorld(this.game);
    spawnEnemy();

    readInput();
    playAnimations();


    //READ INPUTS...

    weapons.forEach(
        function e(x) {
            game.physics.arcade.overlap(x.bullets, enemies, collisionHandler, null, this)
        });
    liveChanged = false;
    weaponDropped = false;

    game.physics.arcade.overlap(enemies, playerChar, hitPlayer, null, this);
    game.physics.arcade.overlap(weaponDropGroup, playerChar, dropWeapon, null, null);




}

