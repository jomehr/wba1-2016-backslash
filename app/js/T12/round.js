var timeOffset = 13,
    time = 13,
    initialOffset = 440;

var interval = setInterval(function () {
    $(".circle_animation").css("stroke-dashoffset", initialOffset - (time * initialOffset / timeOffset));

    if (time === 0) {
        time = 15;
        timeOffset = 15;
        //$(".circle_animation").css("stroke-dashoffset", offset);
    }

    time--;
}, 1000);