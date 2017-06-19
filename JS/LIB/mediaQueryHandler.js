/**
 * Created by sphra on 19.06.2017.
 */


var mobileMode = false;
var windowHeight = 700;
var windowWidth = 1000;
var scalingFactor = 1;

var mq = window.matchMedia("(min-width: 900px)");

if (mq.matches) {
    // window width is at least 500px
    windowHeight = 700;
    windowWidth = 1000;


    $("#dispSize").html(windowWidth);
} else {
    windowHeight = window.innerWidth / 1.7777777777777;
    windowWidth = window.innerWidth
    scalingFactor = window.innerWidth / 1000;
    $("#dispSize").html(windowWidth);
    // window width is less than 500px
}


mq.addListener(function (changed) {
    if (changed.matches) {
        // the width of browser is more then 500px
        windowHeight = 700;
        windowWidth = 1000;
        $("#dispSize").html(windowWidth);

    } else {
        windowHeight = window.innerWidth / 1.7777777777777;
        windowWidth = window.innerWidth;
        scalingFactor = window.innerWidth/ 1000;
        $("#dispSize").html(windowWidth);

        // the width of browser is less then 500px

    }
});



