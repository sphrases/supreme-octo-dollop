var player;
var cursors;
var playerWalking;
var counter;
var enemyGroup;
var difficulty;


//_______________________________________
var game = new Phaser.Game($(window).width(), $(window).height(), Phaser.AUTO, 'myPhaserID', {
    preload: preload,
    create: create,
    update: update
}, true, false);

function preload() {
    game.load.spritesheet('playerSprite', './RES/dude.png', 32, 48);
    game.load.image('enemySprite', './RES/sprites/ship2.png');


}


function create() {

    //create player, add physics etc
    player = game.add.sprite(100, 100, 'playerSprite');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.animations.add('playerWalking', [5, 6], 8, false);


    //create enemies:
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;


    //add keyboard cursors functionallity
    cursors = game.input.keyboard.createCursorKeys();
    difficulty = 4;


}

function update() {
    game.physics.startSystem(Phaser.Physics.ARCADE);



    if (game.time.now > difficulty * 10000) {
        difficulty + 4;
        spawnEnemy();
        
    }


    counter = Math.random() * 80 + 1;
    if (counter <= difficulty) {
        spawnEnemy();
    }

    //reset values when buttons not pressed!
    player.body.velocity.set(0, 0);
    //player.stop('playerWalking');


    if (cursors.up.isDown) {
        player.play('playerWalking');
        player.body.velocity.y = -600;

    }

    if (cursors.down.isDown) {
        player.play('playerWalking');
        player.body.velocity.y = 600;

    }

    if (cursors.left.isDown) {
        player.play('playerWalking');
        player.body.velocity.x = -600;

    }

    if (cursors.right.isDown) {
        player.play('playerWalking');
        player.body.velocity.x = 600;

    }


    game.physics.arcade.overlap(enemyGroup, player, collisionHandlerFunction, null, this);
}


function spawnEnemy() {
    console.log('enemy Spawned');

    var temp = difficulty * 100;

    var enemy = enemyGroup.create(game.world.width / 2, game.world.height / 2, 'enemySprite');

    enemy.anchor.setTo(0.5, 0.5);
    //enemy.body.velocity.x = Math.floor(Math.random() * temp) - (temp/2);
    //enemy.body.velocity.y = Math.floor(Math.random() * temp) - (temp/2);
    enemy.body.velocity.x = 1;
    enemy.body.velocity.y = 1;


}


function collisionHandlerFunction(player) {
    console.log('ded');
    player.kill();

}

