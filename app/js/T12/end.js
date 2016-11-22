/*
$(document).ready(function () {
    var elem = document.getElementById("myScore");

    var width = 0;
    var id = setInterval(frame, 50);

    function frame() {
        /!* Übergabe der Data_Value nach score *!/
        var score = document.getElementById("myScore").getAttribute("data-value");
        if (width >= score) {
            clearInterval(id);
        } else {
            width++;
            document.getElementById("JS_ScaleScore").style.width = width + '%';
        }
    }
});*/
