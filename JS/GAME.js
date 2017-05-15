var windowHeight = 700;
var windowWidth = 1000;
var jumps = 0;
var jumpwaspressed = false;
var jumppressed = false;
var bulletGun;
var bulletTime = 0;
var cursors;
var rightWasDown = 0;
var enemies;
var playerChar;
var body;



var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, 'myPhaserID', {
    preload: preload,
    create: create,
    update: update
});


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

    game.load.image('bulletGun', '../RES/sprites/bullet2.png');


    //load sounds
    game.load.audio('bulletGunSound', '../RES/audio/pew.wav');

    //load enemies
    game.load.image('enemyBullet', '../RES/sprites/bullet2.png');
    game.load.spritesheet('invader', '../RES/sprites/ship2.png', 32, 32);

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


    //Init ground layer
    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 82, 'ground');

    ground.scale.setTo(3, 2);

    ground.body.immovable = true;
    ground.alpha = 0


    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  The baddies!
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;


    //Init bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(100, 'bulletGun');
    bullets.setAll('anchor.x', 0.2);
    bullets.setAll('anchor.y', 0.1);

    //Init sounds
    playBulletGunSound = game.add.audio('bulletGunSound');


    //Init character
    playerChar = game.add.sprite(150, game.world.height - 150, 'dude');


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

var time_til_spawn = Math.random()*3000 + 2000;  //Random time between 2 and 5 seconds.
var last_spawn_time = game.time;

function update() {
    game.physics.arcade.collide(playerChar, platforms);


    //Handle playerChar movement!
    //cancel velocity


    var current_time = game.time.time;
    if(current_time - last_spawn_time > time_til_spawn){
        time_til_spawn = Math.random()*3000 + 2000;
        last_spawn_time = current_time;
        spawnEnemy();
    }



    //Movement
    if (cursors.left.isDown) {
        //kek
    }

    else if (cursors.right.isDown) {
        playerChar.animations.play('right');
        rightWasDown = 1;
        moveWorld(this);
    }
    if (rightWasDown == 1 && cursors.right.isUp) {
        brakeWorld(this);
        rightWasDown = 0;
    }

    else {
        //  Stand still
        playerChar.animations.stop();
        playerChar.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    jumpwaspressed = jumppressed;
    jumppressed = cursors.up.isDown;    //cursor.up.isDown is a bool variable!


    if (jumppressed && !jumpwaspressed && (playerChar.body.touching.down || checkJump())) {
        jump(this);
        jumps++;
    }

    if (playerChar.body.touching.down) {
        jumps = 0;
    }

    //Fire!
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

        fireBullet();
    }

    game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);

}


function jump(game) {
    playerChar.body.velocity.y = -350;
}

function checkJump() {
    if (jumps <= 1) {
        console.log("Jumped!");
        return true;

    } else {

        return false;
    }
}


function moveWorld(game) {
    game.wall1.tilePosition.x -= 0.25;
    game.wall2.tilePosition.x -= 0.5;
    game.wall3.tilePosition.x -= 1;
    game.wall4.tilePosition.x -= 2;
    enemies.forEachAlive(function(enemy) {enemy.position.x -= 2});

}

function brakeWorld(game) {
    console.log("braked");
    var decounter = 0.1;


        console.log(game.wall1.tilePosition.x);
        game.wall1.tilePosition.x -= 0.25-decounter;
        game.wall2.tilePosition.x -= 0.5-decounter;
        game.wall3.tilePosition.x -= 1-decounter;
        game.wall4.tilePosition.x -= 2-decounter;

        decounter += 0.1;

}

function fireBullet() {

    if (game.time.now > bulletTime) {
        bullet = bullets.getFirstExists(false);

        if (bullet) {
            bullet.reset(playerChar.body.x + 16, playerChar.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = playerChar.rotation;
            game.physics.arcade.velocityFromRotation(playerChar.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 400;
            playBulletGunSound.play();
        }
    }

}



var enemy_height = Math.random()* 600 + 100;

function spawnEnemy() {

        enemy_height = Math.random()* 600 + 100;

        var enemy = enemies.create(game.world.width, enemy_height, 'invader');
        enemy.anchor.setTo(0.5, 0.5);
        enemy.rotation = 90;
        //enemy.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        //enemy.play('fly');
        enemy.body.moves = false;
        console.log("enemy spawned!");
        enemies.add(enemy);


}



function collisionHandler (bullet, enemy) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    enemy.kill();



}

