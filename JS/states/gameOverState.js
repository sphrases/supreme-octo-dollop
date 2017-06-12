/**
 * Created by sphra on 12.06.2017.
 */
var gameOverState = {
    preload: function () {
        game.load.image("background", "../RES/STATE3/bg/background.png");
        game.load.spritesheet("startGameButtonSprite", "../RES/STATE3/icons/restartButton.png", 250, 70);
        game.load.spritesheet("tutorialButtonSprite", "../RES/STAGE1/icons/tutorialButton.png", 250, 70);
        game.load.spritesheet("heart", "../RES/STAGE1/icons/heart.png", 32, 32);
        game.load.spritesheet("deagle", "../RES/STAGE1/icons/deagleSpritesheet.png", 60, 40);

        game.load.image("bgLvl0", "../RES/STATE3/bg/layer0.png");
        game.load.image("bgLvl1", "../RES/STATE3/bg/layer1.png");
        game.load.image("bgLvl2", "../RES/STATE3/bg/layer2.png");
        game.load.image("bgLvl3", "../RES/STATE3/bg/layer3.png");
        game.load.image("bgLvl4", "../RES/STATE3/bg/layer4.png");



    },
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Initializing Background!-------------------------------------
        wall0 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl0");
        wall1 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl1");
        wall2 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl2");
        wall3 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl3");
        wall4 = game.add.tileSprite(0, 0, game.width, game.height, "bgLvl4");
        endScreenWall = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        startGameButton = game.add.button(game.width / 2 - 125, game.height / 2 , 'startGameButtonSprite', restartGame, this, 1, 0, 0);


        style = { font: "bold 40px Amatic Sc", fill: "#ffffff", align: "center"};

        newScoreText = game.add.text((game.width / 2 +4), (game.height / 2 - 70), "your score: \n" + Math.floor(score), style);
        newScoreText.anchor.setTo(0.5, 0.5);

        //scoreText.anchor.setTo(0.5, 0.5);
        heart = game.add.sprite(310, 310, 'heart');
        heart.scale.setTo(1.8, 1.8);
        heart.angle = -30;
        heart.animations.add('blink', [1, 0], 6, true);
        heart.animations.play('blink');

        deagle = game.add.sprite(580, 280, 'deagle');
        deagle.scale.setTo(2.5, 2.5);
        deagle.angle = -30;
        deagle.animations.add('shoot', [0, 1, 2], 8, true);
        deagle.animations.play('shoot');
    },
    update: function () {
        wall1.tilePosition.x -= 0.25 * velocityVector;
        wall2.tilePosition.x -= 0.5 * velocityVector;
        wall3.tilePosition.x -= 2 * velocityVector;
        wall4.tilePosition.x -= 2 * velocityVector;
    }
}