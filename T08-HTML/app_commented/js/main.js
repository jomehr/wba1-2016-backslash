sessionobject = {
    "points": sessionStorage.getItem('points'),
    "maxpoints": sessionStorage.getItem('maxpoints'),
    "countright": sessionStorage.getItem('correctanswers'),
    "countquestions": sessionStorage.getItem('amountquestions'),
    "quizID": sessionStorage.getItem('quizid'),
    "username": sessionStorage.getItem('username'),
    "view": sessionStorage.getItem('view')
};
//zeitvariable zum limit der suchleiste
var gtime = 0;

$(function () {   //on doc.ready get certain infos.
    var username = sessionStorage.getItem('username');
    var clickElements = document.querySelectorAll('.js-change-view');
    if (!username) {
        sessionStorage.setItem('username', "unbekannt");
    }
    if (sessionobject.view === undefined) {
        sessionobject.view = 0;
    } else {
        sessionobject.view = parseInt(sessionobject.view);
    }
    view.init();

    // Klicklistener via Event Delgation initialisieren
    document.querySelector("body").addEventListener("click", function (e) {
        //Haben wir auf ein Element geklickt und enthält das Element die Klasse 'js-change-view'
        if (e.target && e.target.classList.contains('js-change-view')) {
            handleClick(e);
        }
    });
/*  Not used anymore.
    function oldViewSite() {
        switch (sessionobject.view) {
            case 1:
                view.render("quizinfo");
                break;
            case 2:
                view.render("quizround", function (quizrounddata) {
                    $.getScript("js/T12/round.js", function () {
                        quiz.startQuiz(quizrounddata);
                        //startTimer();
                    });
                });
                break;
            case 3:
                view.render("quizend", function () {
                    $.getScript("js/T05/slider.js", function () {
                        $.getScript("js/T05/script.js", function () {
                            $.getScript("js/T12/end.js", function () {
                                //Aktualisieren der richtig Falsch antworten & Scalebar füllen
                                var percent = Math.round((sessionobject.points / sessionobject.maxpoints) * 100);
                                document.getElementById("JS_ScaleScore").style.width = percent + "%";
                                document.getElementsByClassName("ss_score_balken")[0].setAttribute("data-value", "" + percent);
                                //Red/Green Icons füllen
                                var item = document.getElementById('JS_Score');
                                var redicon = '<div class="ss_score_point bg-red animated flash" ></div>';
                                var greenicon = '<div class="ss_score_point bg-green" ></div>';
                                var length = sessionobject.countquestions;
                                var fragencount = JSON.parse(sessionStorage.getItem('rs_fragen'));
                                for (var i = 0; i < fragencount.length; i++) {
                                    if (fragencount[i] === false) {
                                        item.innerHTML += redicon;
                                    } else {
                                        item.innerHTML += greenicon;
                                    }
                                }
                            });
                        });
                    });
                });
                break;
            case 4:
                view.render("highscore");
                break;
            default:
                view.render("quizoverview", function () {
                    $.getScript("js/T06/collapse.js", function () {
                        collapse.init();
                    });

                    $.getScript("js/lib/flickity.pkgd.min.js", function () {
                        var flickityConfig = {
                            // options
                            cellAlign: 'center',
                            cellSelector: '.js-carousel-cell',
                            contain: true,
                            imagesLoaded: true,
                            prevNextButtons: false,
                            setGallerySize: true
                        };
                        var $carousel = $('.js-carousel').flickity(flickityConfig);
                        slideshowNavi.init($carousel);
                    });

                    sortonchange();
                });
                break;
        }
    }
*/
    function viewSite() {      // Switch view to determine the next site
        switch (sessionobject.view) {
            case 1:   // case quizinfo
                view.render("quizinfo"); // view.class call to render view on site
                break;
            case 2:   // case quizround
                view.render("quizround", function (quizrounddata) { // view.class call to render view on site
                    quiz.startQuiz(quizrounddata);  //changing display items after the view is in dom.
                    QuizRound.startTimer();
                    QuizRound.bindAnswerClickListener();
                });
                break;
            case 3:   // case quizend
                view.render("quizend", function () { // view.class call to render view on site
                    //Aktualisieren der richtig Falsch antworten & Scalebar füllen
                    var percent = Math.round((sessionobject.points / sessionobject.maxpoints) * 100);
                    document.getElementById("JS_ScaleScore").style.width = percent + "%";
                    document.getElementsByClassName("ss_score_balken")[0].setAttribute("data-value", "" + percent);
                    //Red/Green Icons füllen
                    var item = document.getElementById('JS_Score');
                    var redicon = '<div class="ss_score_point bg-red animated flash" ></div>';
                    var greenicon = '<div class="ss_score_point bg-green" ></div>';
                    var length = sessionobject.countquestions;
                    var fragencount = JSON.parse(sessionStorage.getItem('rs_fragen'));
                    for (var i = 0; i < fragencount.length; i++) {
                        if (fragencount[i] === false) {
                            item.innerHTML += redicon;
                        } else {
                            item.innerHTML += greenicon;
                        }
                    }
                });
                break;
            case 4:   //case highscore
                view.render("highscore");  // view.class call to render view on site
                break;
            default:  //default quizoverview
                view.render("quizoverview", function () {   // view.class call to render view on site
                    collapse.init();    //changing display items after the view is in dom.

                    var flickityConfig = {
                        // options
                        cellAlign: 'center',
                        cellSelector: '.js-carousel-cell',
                        contain: true,
                        imagesLoaded: true,
                        prevNextButtons: false,
                        setGallerySize: true
                    };
                    var $carousel = $('.js-carousel').flickity(flickityConfig);
                    slideshowNavi.init($carousel);

                    sortonchange();
                });
                break;
        }
    }

    function handleClick(e) {
        //Standardverhalten preventen
        e.preventDefault();
        if (document.getElementById("wa_Sidenav_mobil").getAttribute("data-navState") === "true") {
            $("#nav-icon4").trigger("click");
        }

        //data auslesen
        var click_quizid = e.target.getAttribute('data-quizID');
        var click_view = parseInt(e.target.getAttribute('data-view'));
        if (click_quizid === null || click_quizid === undefined) {  //check if the data attribute is undefined//null
            sessionobject.quizID = 0;
        } else {
            sessionobject.quizID = click_quizid;
        }
        sessionStorage.setItem('quizid', sessionobject.quizID);
        if (click_view !== sessionobject.view) {
            sessionobject.view = click_view;
            sessionStorage.setItem('view', sessionobject.view);
        }
        viewSite();
    }

    function sortonchange() {
        var elements = document.querySelectorAll('.js_sort');
        //Eventlistener zu jedem Link hinzufügen
        for (i = 0; i < elements.length; i++) {
            var sort_eventcheck = elements[i].getAttribute('sortevent');
            if (sort_eventcheck === null) {
                elements[i].setAttribute('sortevent', "true");  //adding/removing eventlisteners
                elements[i].removeEventListener('change', handleSort);
                elements[i].addEventListener('change', handleSort);
            }
        }

        function handleSort(e) {
            var sortoption = document.getElementById('js_sort').value;    // get data value
            var searchString = document.getElementById('js_sort_text').value;
            switch (sortoption) {   //switch data value
                case "beliebtheit":
                    sortoption = 2;
                    break;
                case "alphabetisch":
                    sortoption = 1;
                    break;
                case "datum":
                    sortoption = 0;
                    break;
                default:
                    sortoption = "";
                    break;
            }
            getQuizView(10, searchString, sortoption);  //api call with searchoptions
            $(document).on("onQuizView", function (event, data) {

            });
        }
    }

    viewSite();
});
