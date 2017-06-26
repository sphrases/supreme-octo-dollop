/**
 * Created by sphra on 12.06.2017.
 */
var playState = {
    preload: function () {

        game.load.spritesheet('heart', '../RES/STATE2/sprites/icons/heart.png', 32, 32, 2);


        var loadingHeart = game.add.sprite(game.width / 2 - 60, game.height / 2, 'heart');
        loadingHeart.scale.setTo(1.8 * scalingFactor, 1.8 * scalingFactor);
        loadingHeart.anchor.setTo(0.5, 0.5);
        loadingHeart.animations.add('blink', [1, 0], 6, true);
        loadingHeart.animations.play('blink');


        style = {font: "bold 40px Arial", fill: "#ffffff", align: "center"};

        var loadingText = game.add.text(game.width / 2, game.height / 2 - 30, "Loading...", style);

        //loading the backgrounds
        game.load.image("bgLvl0", "../RES/STATE2/bg/layer0.png");
        game.load.image("bgLvl1", "../RES/STATE2/bg/layer1.png");
        game.load.image("bgLvl2", "../RES/STATE2/bg/layer2.png");
        game.load.image("bgLvl3", "../RES/STATE2/bg/layer3.png");
        game.load.image("bgLvl4", "../RES/STATE2/bg/layer4.png");


        //loading the players spritesheet
        game.load.spritesheet('dude', '../RES/STATE2/dude.png', 32, 48);
        game.load.spritesheet('guns', '../RES/STATE2/guns.png', 32, 48);

        game.load.image('ground', '../RES/STATE2/ground/ground.png');


        //weapons
        game.load.spritesheet('deagle', '../RES/STATE2/sprites/guns/deagle/deagle.png', 60, 40, 3);
        game.load.spritesheet('ak', '../RES/STATE2/sprites/guns/ak/ak.png', 60, 40, 3);

        game.load.image('bullet', '../RES/STATE2/sprites/bullets/bullet2.png');
        game.load.image('beam', '../RES/STATE2/sprites/bullets/beam.png');


        game.load.spritesheet('musicSprite', '../RES/STATE2/sprites/icons/music_sprite.png', 100, 100);

        //load sounds
        game.load.audio('background_music', '../RES/STATE2/audio/Pocketmaster.mp3');

        game.load.audio('bulletGunSound', '../RES/STATE2/audio/pew.wav');
        game.load.audio('machineGunSound', '../RES/STATE2/audio/machineGun.mp3');
        game.load.audio('enemyHit', '../RES/STATE2/audio/smallExplosion.mp3');
        game.load.audio('playJumpSound', '../RES/STATE2/audio/YeahBoi/boi.mp3');
        game.load.audio('laserGunSound', '../RES/STATE2/audio/laser.mp3');
        game.load.audio('blinkSound', '../RES/STATE2/audio/blinkSound.mp3');

        //load enemies
        game.load.spritesheet('enemy1', '../RES/STATE2/sprites/icons/enemy1.png', 64, 30, 4);
        game.load.spritesheet('spikes', '../RES/STATE2/sprites/icons/spikes.png', 64, 30, 4);
        game.load.spritesheet('spikes2', '../RES/STATE2/sprites/icons/spikes2.png', 64, 30, 4);

        game.load.spritesheet('dropBox', '../RES/STATE2/sprites/icons/bulletBox.png', 32, 32);
    },

    create: function () {




        //Initializing the physix system

        velocityVector = 2;
        jumps = 0;
        score = 1;
        lives = [];
        weapons = [];
        weaponSpriteGroup = [];
        ownedWeapons = [1, 0, 0, 0, 0];
        timer = 0;
        blinkCounter = 0;
        livesCount = 3;


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


        //console.log(lives);

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

        guns = game.add.sprite(0, 0, 'guns');
        //guns.scale.setTo(2, 2);
        guns.frame = 0;
        playerChar.addChild(guns);

        playerChar.animations.add('jump', [3], 10, true);
        playerChar.animations.add('right', [5, 6], 7, true);
        playerChar.animations.add('hit', [6, 9], 7, true);

        blinkSound = game.add.audio('blinkSound');


        //WEAPONS!
        playBulletGunSound = game.add.audio('bulletGunSound');
        enemyHit = game.add.audio('enemyHit');
        playJumpSound = game.add.audio('playJumpSound');
        playMachineGunSound = game.add.audio('machineGunSound');
        playLaserSound = game.add.audio('laserGunSound');

        //pistol
        createWeapon(weapon1, 30, 'bullet', 'deagle', 300, 600, 0, playBulletGunSound);
        createWeapon(weapon2, 30, 'bullet','ak', 500, 90, 2, playMachineGunSound);
        createWeapon(weapon3, 3, 'beam', 'deagle', 1000, 300, 0, playLaserSound);
        createWeapon(weapon4, 40, 'beam', 'deagle', 1000, 30, 0, playLaserSound);
        createWeapon(weapon5, 40, 'dude', 'deagle', 1000, 100, 0, enemyHit);


        firstWeapon = 0;
        lastWeapon = weapons.length - 1;
        currentWeaponID = 0;
        currentWeapon = weapons[currentWeaponID];

        //  The baddies!
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;

        groundlings = game.add.group();
        groundlings.enableBody = true;
        groundlings.physicsBodyType = Phaser.Physics.ARCADE;


        weaponDropGroup = game.add.group();
        weaponDropGroup.enableBody = true;
        weaponDropGroup.physicsBodyType = Phaser.Physics.ARCADE;

        gameKeyboard = game.input.Keyboard;
        cursors = game.input.keyboard.createCursorKeys();
        key = game.input.keyboard;


        style = {font: "bold 40px Amatic Sc", fill: "#000000", align: "center"};

        scoreText = game.add.text(170, 5, "test", style);
        //scoreText.anchor.setTo(0.5, 0.5);

        timer = game.time.create(false);
        timer.loop(10000, timerHandler, this);
        timer.start();
        weaponSpawnTimer = 20;
        weaponDropTimer = game.time.create(false);
        weaponDropTimer.loop(Phaser.Timer.SECOND * 20, spawnWeaponDrop);
        weaponDropTimer.start();


        // Background-Music

        backgroundMusic = game.add.audio('background_music');
        backgroundMusic.loop = true;

        if (musicPlaying) {
            backgroundMusic.play();
        }

        //addEventListenerButton();



    },

    update: function () {
        game.physics.arcade.collide(playerChar, platforms);

        currentWeapon = weapons[currentWeaponID];
        jumpwaspressed = jumppressed;
        if (cursors.up.isDown || (game.input.activePointer.x > 500 && game.input.activePointer.isDown )) {
            jumppressed = true;

        } else {
            jumppressed = false;
        }
        liveWasChanged = liveChanged;
        weaponWasDropped = weaponDropped;

        score += 0.1;
        scoreText.setText('score: ' + Math.floor(score) + "");
        //console.log(score);

        moveWorld(this.game);
        spawnEnemy();
        spawnGroundling();

        readInput();
        playAnimations();


        //READ INPUTS...

        weapons.forEach(
            function e(x) {
                game.physics.arcade.overlap(x.bullets, enemies, collisionHandler, null, this)
            });



        liveChanged = false;
        weaponDropped = false;

        game.physics.arcade.overlap(groundlings, playerChar, hitPlayer, null, this);
        game.physics.arcade.overlap(enemies, playerChar, hitPlayer, null, this);
        game.physics.arcade.overlap(weaponDropGroup, playerChar, dropWeapon, null, null);


    }

}



