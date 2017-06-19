/**
 * Created by sphra on 19.06.2017.
 */



var windowHeight;
var windowWidth;

var mq = window.matchMedia( "(min-width: 500px)" );

if (mq.matches) {
    // window width is at least 500px
    windowHeight = 700;
    windowWidth = 1000;
} else {
    windowHeight = window.innerWidth * 0.7;
    windowWidth = window.innerWidth;
    // window width is less than 500px
}


mq.addListener(function(changed) {
    if(changed.matches) {
        // the width of browser is more then 700px
        windowHeight = 700;
        windowWidth = 1000;
    } else {
        windowHeight = window.innerWidth * 0.7;
        windowWidth = window.innerWidth;
        // the width of browser is less then 700px
    }
});