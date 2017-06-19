//mediaHandler();
var game = new Phaser.Game(windowWidth, windowHeight, Phaser.AUTO, 'myPhaserID', {}, true, false);

var last_spawn_time = game.time;
var last_spawn_time_g = game.time;

game.state.add('startMenu', startState);
game.state.add('playState', playState);
game.state.add('gameOverState', gameOverState);
game.state.add('tutorialState', tutorialState);
game.state.start('startMenu');








