/**
 * Created by sphra on 19.06.2017.
 */


var mq = window.matchMedia( "(min-width: 500px)" );

if (mq.matches) {
    // window width is at least 500px
    var windowHeight = 700;
    var windowWidth = 1000;
} else {
    var windowHeight = window.innerWidth * 0.7;
    var windowWidth = window.innerWidth;
    // window width is less than 500px
}