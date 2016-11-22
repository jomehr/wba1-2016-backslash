// how long the timer runs
var timeOffset = 15;
var time = 0;

var initialOffset = 440;
var offset = 440;


var interval = setInterval(function () {
    offset += initialOffset / timeOffset;

    $(".circle_animation").css("stroke-dashoffset", offset);

    time++;

    if (time === timeOffset) {
        time = 0;
        offset = 440;
        $(".circle_animation").css("stroke-dashoffset", offset);
    }
}, 1000);