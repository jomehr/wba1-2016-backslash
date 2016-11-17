$(function () {
    //Userdaten rand generieren solange keine bestehen!!!
    var rand1 = Math.random(); //Punkte
    var rand2 = 1000; //maxPunkte
    var rand3 = Math.random(); //richtige antworten
    var rand4 = 10; //anzahl Fragen
    rand1 = Math.round(1000 * rand1);
    rand3 = Math.round(10 * rand3);

    sessionStorage.setItem('points', rand1);
    sessionStorage.setItem('maxpoints', rand2);
    sessionStorage.setItem('correctanswers', rand3);
    sessionStorage.setItem('amountquestions', rand4);
    sessionStorage.setItem('quizid', 0);
    sessionStorage.setItem('username', "waaaow");

    //Hier kommen die User Quiz Data
    sessionobject = {
        "points": sessionStorage.getItem('points'),
        "maxpoints": sessionStorage.getItem('maxpoints'),
        "countright": sessionStorage.getItem('correctanswers'),
        "countquestions": sessionStorage.getItem('amountquestions'),
        "quizID": sessionStorage.getItem('quizid'),
        "username": sessionStorage.getItem('username'),
        "view": sessionStorage.getItem('view')
    };

    if (sessionobject.view === undefined) {
        sessionobject.view = 0;
    } else {
      sessionobject.view = parseInt(sessionobject.view);
    }


    function viewSite() {
        //console.log("Bitte sessionStorage.setItem('view','id') in die Console eingeben. \n id info : \n 0 = default \n 1 = quizinfo \n 2 = quiz(undefined) \n 3 = quizend \n 4 = highscore(undefined)");
        switch (sessionobject.view) {
            case 1:
                view.render("quizinfo", function () {
                    clicklistener();
                });
                break;
            case 2:
                view.render("quizround", function () {
                    clicklistener();
                });
                break;
            case 3:
                view.render("quizend", function () {
                    //Aktualisieren der richtig Falsch antworten & Scalebar füllen
                    var percent = Math.round((sessionobject.points / sessionobject.maxpoints) * 100);
                    document.getElementById("JS_ScaleScore").style.width = percent + "%";
                    //Red/Green Icons füllen
                    var item = document.getElementById('JS_Score');
                    var redicon = '<div class="ss_score_point bg-red" ></div>';
                    var greenicon = '<div class="ss_score_point bg-green" ></div>';
                    var length = sessionobject.countquestions;
                    for (var i = 0; i < length; i++) {
                        var random = Math.random();
                        if (random >= 0.5) {
                            item.innerHTML += redicon;
                        } else {
                            item.innerHTML += greenicon;
                        }
                    }
                    var flickityConfig = {
                        // options
                        cellAlign: 'left',
                        cellSelector: '.js-carousel-cell',
                        contain: true,
                        imagesLoaded: true,
                        prevNextButtons: false,
                        setGallerySize: true
                    };
                    var $carousel = $('.js-carousel').flickity(flickityConfig);
                    slideshowNavi.init($carousel);

                    clicklistener();
                });
                break;
            case 4:
                view.render("highscore", function () {
                    clicklistener();
                });
                break;
            default:
                view.render("quizoverview", function () {
                    collapse.init();
                    var flickityConfig = {
                        // options
                        cellAlign: 'left',
                        cellSelector: '.js-carousel-cell',
                        contain: true,
                        imagesLoaded: true,
                        prevNextButtons: false,
                        setGallerySize: true
                    };
                    var $carousel = $('.js-carousel').flickity(flickityConfig);
                    slideshowNavi.init($carousel);
                    clicklistener();
                });
                break;
        }
    }

    function clicklistener() {
        var elements = document.querySelectorAll('.js-change-view');
        //Eventlistener zu jedem Link hinzufügen
        for (i = 0; i < elements.length; i++) {
            var click_eventcheck = elements[i].getAttribute('events');

            if (click_eventcheck === null) {
                elements[i].setAttribute('events', "true");
                elements[i].removeEventListener('click', handleClick);
                elements[i].addEventListener('click', handleClick);
            }

        }

        function handleClick(e) {
            //Standardverhalten preventen
            e.preventDefault();

            console.log(e);

            //data auslesen
            var click_quizid = e.currentTarget.getAttribute('data-quizID');
            var click_view = parseInt(e.currentTarget.getAttribute('data-view'));
            console.log(click_view);
            if (click_quizid === null || click_quizid === undefined) {
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
    }

    viewSite();
});
