sessionobject = {
    "points": sessionStorage.getItem('points'),
    "maxpoints": sessionStorage.getItem('maxpoints'),
    "countright": sessionStorage.getItem('correctanswers'),
    "countquestions": sessionStorage.getItem('amountquestions'),
    "quizID": sessionStorage.getItem('quizid'),
    "username": sessionStorage.getItem('username'),
    "view": sessionStorage.getItem('view')
};


$(function () {
    var username = sessionStorage.getItem('username');
    if (!username) {
      sessionStorage.setItem('username', "unbekannt");
    }
    if (sessionobject.view === undefined) {
        sessionobject.view = 0;
    } else {
        sessionobject.view = parseInt(sessionobject.view);
    }

    function viewSite() {   //function to switch views
        switch (sessionobject.view) {//switch sessionobject
            case 1:   // case1 quizinfo
                view.render("quizinfo", function () {   //viewclass render quizinfo
                    clicklistener();    //add eventlistner
                });
                break;
            case 2:  //case2 quizround
                view.render("quizround", function (quizrounddata) { //viewclass function render call, callback data
                    clicklistener();    //add eventlistener
                    quiz.startQuiz(quizrounddata);    //call quizstart with quizdata
                });
                break;
            case 3:
                view.render("quizend", function () {    //case3 quizend
                    //Aktualisieren der richtig Falsch antworten & Scalebar füllen
                    var percent = Math.round((sessionobject.points / sessionobject.maxpoints) * 100);
                    document.getElementById("JS_ScaleScore").style.width = percent + "%";   //filling the scalescorebar
                    document.getElementsByClassName("ss_score_balken")[0].setAttribute("data-value", "" + percent); //add data for animation
                    //Red/Green Icons füllen
                    var item = document.getElementById('JS_Score');   //adding of right/wrong icons
                    var redicon = '<div class="ss_score_point bg-red animated flash" ></div>';
                    var greenicon = '<div class="ss_score_point bg-green" ></div>';
                    var length = sessionobject.countquestions;
                    var fragencount = JSON.parse(sessionStorage.getItem('rs_fragen'));
                    for (var i = 0; i < fragencount.length; i++) {    //loop right/wrong
                        if (fragencount[i] === false) {
                            item.innerHTML += redicon;
                        } else {
                            item.innerHTML += greenicon;
                        }
                    }
                    clicklistener();    //add eventlistener
                });
                break;
            case 4:
                view.render("highscore", function () {  //case4: highscore
                    clicklistener();    //add eventlistener
                });
                break;
            default:
                view.render("quizoverview", function () { //case default: quizoverview
                    collapse.init();    //on ready init collapse/flickity
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
                    clicklistener();  //add evenlistener
                });
                break;
        }
    }

    function clicklistener() {
        var elements = document.querySelectorAll('.js-change-view');  //selector
        //Eventlistener zu jedem Link hinzufügen
        for (i = 0; i < elements.length; i++) {   //each element remove Eventlistener and then add Eventlistener
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
            if (document.getElementById("wa_Sidenav_mobil").getAttribute("data-navState") === "true") {
                $("#nav-icon4").trigger("click");
            }

            //data auslesen
            var click_quizid = e.currentTarget.getAttribute('data-quizID');
            var click_view = parseInt(e.currentTarget.getAttribute('data-view'));
            if (click_quizid === null || click_quizid === undefined) {
                sessionobject.quizID = 0;
            } else {
                sessionobject.quizID = click_quizid;
            }
            sessionStorage.setItem('quizid', sessionobject.quizID); //set quizid for lateron data
            if (click_view !== sessionobject.view) {
                sessionobject.view = click_view;
                sessionStorage.setItem('view', sessionobject.view); //set sessionobject.view on chance
            }
            viewSite();   //call viewsite function to get new view
        }
    }

    viewSite(); //call viewsite on finished loading once to generate default site.
});
