$(function () {
    var Quizobject = {};
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
    var sessionobject = {
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
    }


    // Switch view
    // 0 default (startseite)
    // 1 quizInfo
    // 2 quiz
    // 3 Quizend
    // 4 Quiz Highscore
    function viewSite() {
        switch (sessionobject.view) {
            case "1":
                quizinfo();
                break;
            case "2":
                quiz();
                break;
            case "3":
                quizend();
                break;
            case "4":
                break;
            default:
                quizoverview();
                console.log("Bitte sessionStorage.setItem('view','id') in die Console eingeben. \n id info : \n 0 = default \n 1 = quizinfo \n 2 = quiz(undefined) \n 3 = quizend \n 4 = highscore(undefined)");
                break;
        }
    }

    function clicklistener() {
        var elements = document.querySelectorAll('.js-change-view');
        //Eventlistener zu jedem Link hinzuf�gen
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

            //data auslesen
            var click_quizid = e.currentTarget.getAttribute('data-quizID');
            var click_view = e.currentTarget.getAttribute('data-view');
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

    function quiz() {
        getQuizByID(sessionobject.quizID);
        $(document).on("onQuizData", function (event, data) {
            Quizobject.quiz = data;
            Quizobject.sessionobject = sessionobject;

            view.render("quizround", Quizobject);

            clicklistener();
        });
    }

    function quizend() {
        getQuizViewByID(sessionobject.quizID);
        $(document).on("onQuizViewByID", function (event, data) {
            getHighscorePositions(sessionobject.quizID, sessionobject.username, sessionobject.points);
            var quizInfo = {};
            if (quizInfo.bild === "/URL") {
                quizInfo.bild = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T10-Asset/Bilder/Bilder%20Klein/Stadion3-Klein.jpg";
            }
            Quizobject.datquiz = data;
        });

        // HIGHSCORE info

        $(document).on("onHighscorePositions", function (event, data) {
            getQuizView(7);
            $.extend(Quizobject.datquiz, data);
        });


        //Random Quiz Vorschlag

        $(document).on("onQuizView", function (event, data) {
            var nQuizObject = data; //copy object
            var quizInfo = data;
            var icount = 0;
            var ARQused = [];
            ARQused[0] = sessionobject.quizID;
            var iRand = Math.random();

            //RAND Quiz außer aufgerufene Quiz.
            for (var i = 0; icount < 4; i++) {
                iRand = Math.round(Math.random() * ( quizInfo.length - 0 ));
                if (iRand !== 0) {
                    iRand--;
                }
                while ((ARQused.indexOf("" + iRand) > -1)) {
                    iRand = Math.round(Math.random() * ( quizInfo.length - 0 ));
                    if (iRand !== 0) {
                        iRand--;
                    }
                }

                if (quizInfo[iRand].quizID !== sessionobject.quizID) { // <- Abfrage ob QuizID == Random ID ist wenn true neu generieren
                    icount++;
                    ARQused[icount] = quizInfo[iRand].quizID;
                    nQuizObject[icount - 1] = quizInfo[iRand];
                    if (quizInfo[iRand].bild === "/URL") {
                        quizInfo[iRand].bild = "https://raw.githubusercontent.com/th-koeln/wba1-2016-backslash/master/T10-Asset/Bilder/Bilder%20Klein/Stadion3-Klein.jpg";
                    }
                }
            }

            Quizobject.quizes = nQuizObject;
            Quizobject.quizes = Quizobject.quizes.slice(0, 4);
            $.extend(Quizobject.datquiz, sessionobject);

            view.render("quizend", Quizobject);

            //Aktualisieren der richtig Falsch antworten & Scalebar füllen
            var percent = Math.round((sessionobject.points / sessionobject.maxpoints) * 100);
            document.getElementById("JS_ScaleScore").style.width = percent + "%";
            //Red/Green Icons füllen
            item = document.getElementById('JS_Score');
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
    }

    function quizoverview() {
        getQuizView(10);
        //Random Quiz Vorschlag
        $(document).on("onQuizView", function (event, data) {
            Quizobject.quizes = data; //copy object

            view.render("quizoverview", Quizobject, function () {
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
            });

            clicklistener();
        });
    }

    function quizinfo() {
        getQuizViewByID(sessionobject.quizID);
        $(document).on("onQuizViewByID", function (event, data) {
            Quizobject.quizinfo = data;
            Quizobject.sessionobject = sessionobject;

            view.render("quizinfo", Quizobject);

            clicklistener();
        });
    }

    viewSite();
});