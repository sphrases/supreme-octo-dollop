/**
 * Created by sphra on 12.06.2017.
 */

function restartGame() {
    backgroundMusic.stop();
    game.state.start('startMenu');

}

function tweetScore() {
    window.open("https://twitter.com/intent/tweet?text=I%20scored%20%20" + Math.floor(score) + "%20on%20PEWPEW%20-%20The%20Game!%20%20try%20yourself%20on%20www.pewpewpew.cf", "Tweet your score!", "height=500,width=600,resizable=no", "");

}