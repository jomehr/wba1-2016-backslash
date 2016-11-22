function startTimer() {
    var time = 13,
        timeOffset = 13,
        initialOffset = 440,
        interval;

    clearInterval(interval);
    interval = setInterval(function () {
        var offsetTemp = initialOffset - (time * initialOffset / timeOffset);
        $(".circle_animation").css("stroke-dashoffset", offsetTemp);

        if (time === 0) {
            time = 15;
            timeOffset = 15;
            $(".circle_animation").css("stroke-dashoffset", offsetTemp);
        }

        time--;
    }, 1000);
}

startTimer();