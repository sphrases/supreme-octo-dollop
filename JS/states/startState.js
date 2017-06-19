/**
 * Created by sphra on 12.06.2017.
 */
var startState = {
    preload: function () {
        game.load.image("background", "../RES/STAGE1/bg/background.png");
        game.load.spritesheet("startGameButtonSprite", "../RES/STAGE1/icons/startGameButton.png", 250, 70);
        game.load.spritesheet("tutorialButtonSprite", "../RES/STAGE1/icons/tutorialButton.png", 250, 70);
        game.load.spritesheet("heart", "../RES/STAGE1/icons/heart.png", 32, 32);
        game.load.spritesheet("deagle", "../RES/STAGE1/icons/deagleSpritesheet.png", 60, 40);


    },
    create: function () {

        style = { font: "bold "+Math.floor(40 * scalingFactor)+"px Amatic Sc", fill: "#ffffff", align: "center"};

        startScreenWall = game.add.tileSprite(0, 0, windowWidth * scalingFactor, windowHeight * scalingFactor, 'background');
        startScreenWall.scale.setTo(1 * scalingFactor, 1 * scalingFactor);


        startGameButton = game.add.button(game.width / 2 - 125, game.height / 2 - 80, 'startGameButtonSprite', startGame, this, 1, 0, 0);
        tutorialButton = game.add.button(game.width / 2 - 125, game.height / 2, 'tutorialButtonSprite', startTutorial, this, 1, 0, 0);

        heart = game.add.sprite(game.width * 0.380, game.height * 0.435, 'heart');
        heart.scale.setTo(1.8 * scalingFactor, 1.8 * scalingFactor);
        heart.anchor.setTo(0.5, 0.5);
        heart.angle = -30;
        heart.animations.add('blink', [1, 0], 6, true);
        heart.animations.play('blink');

        deagle = game.add.sprite(game.width * 0.650, game.height * 0.380, 'deagle');
        deagle.scale.setTo(2.5 * scalingFactor  , 2.5 * scalingFactor);
        deagle.anchor.setTo(0.5, 0.5);
        deagle.angle = -30;
        deagle.animations.add('shoot', [0, 1, 2], 8, true);
        deagle.animations.play('shoot');


    },
    update: function () {
    }
}

var tutorialState = {
    preload: function () {
        game.load.image("background", "../RES/STAGE1/bg/background.png");
        game.load.spritesheet("startGameButtonSprite", "../RES/STAGE1/icons/backButton.png", 250, 70);
        game.load.spritesheet("tutorialButtonSprite", "../RES/STAGE1/icons/tutorialButton.png", 250, 70);
        game.load.spritesheet("heart", "../RES/STAGE1/icons/heart.png", 32, 32);
        game.load.spritesheet("deagle", "../RES/STAGE1/icons/deagleSpritesheet.png", 60, 40);


    },
    create: function () {
        startScreenWall = game.add.tileSprite(0, 0, game.width* scalingFactor, game.height * scalingFactor, 'background');

        heart = game.add.sprite(game.width * 0.130, game.height * 0.370, 'heart');
        heart.scale.setTo(1.8 * scalingFactor, 1.8 * scalingFactor);
        heart.anchor.setTo(0.5, 0.5);
        heart.angle = -30;
        heart.animations.add('blink', [1, 0], 6, true);
        heart.animations.play('blink');

        deagle = game.add.sprite(game.width * 0.800, game.height * 0.270, 'deagle');
        deagle.scale.setTo(2.5 * scalingFactor, 2.5 * scalingFactor);
        heart.anchor.setTo(0.5, 0.5);
        deagle.angle = -30;
        deagle.animations.add('shoot', [0, 1, 2], 8, true);
        deagle.animations.play('shoot');



        style = { font: "bold "+Math.floor(40*scalingFactor )+"px Amatic Sc", fill: "#ffffff", align: "center"};

        tutorialText = "[space] -> shoot \n" +
            "[up] -> jump \n" +
            "weapons will drop randomly from supply crates";

        tutText = game.add.text((game.width / 2 ), (game.height / 2  ), tutorialText, style);
        tutText.anchor.setTo(0.5, 0.5);

        startGameButton = game.add.button(game.width / 2 - 125, game.height - 200 , 'startGameButtonSprite', back, this, 1, 0, 0);

        //tutText.setText("[space] -> shoot \n [up] -> jump \n weapons will drop randomly from supply crates");


    },
    update: function () {
        tutText.setText("[space] -> shoot \n [up] -> jump \n weapons will drop randomly from supply crates");

    }


}

function back() {
    game.state.start('startMenu');

}