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


$(function () {
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
	
    function viewSite() {
        switch (sessionobject.view) {
            case 1:
                view.render("quizinfo", function () {

                });
                break;
            case 2:
                view.render("quizround", function (quizrounddata) {
                    quiz.startQuiz(quizrounddata);
                    //hier muss noch eine art callback rein.
                    //viewSite();

                    $("#templatespaceholder").on("transitionend", function () {
                        //console.log("sth");
                    });
                });
                break;
            case 3:
                view.render("quizend", function () {
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
            case 4:
                view.render("highscore", function () {

                });
                break;
            default:
                view.render("quizoverview", function () {
                    collapse.init();
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

        //console.log("Bitte sessionStorage.setItem('view','id') in die Console eingeben. \n id info : \n 0 = default \n 1 = quizinfo \n 2 = quiz(undefined) \n 3 = quizend \n 4 = highscore(undefined)");
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

    function sortonchange() {
        var elements = document.querySelectorAll('.js_sort');
        //Eventlistener zu jedem Link hinzufügen
        for (i = 0; i < elements.length; i++) {
            var sort_eventcheck = elements[i].getAttribute('sortevent');
            if (sort_eventcheck === null) {
                elements[i].setAttribute('sortevent', "true");
                elements[i].removeEventListener('change', handleSort);
                elements[i].addEventListener('change', handleSort);
            }

        }

        function handleSort(e) {
            var sortoption = document.getElementById('js_sort').value;
            var searchString = document.getElementById('js_sort_text').value;
            switch (sortoption) {
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
            getQuizView(10, searchString, sortoption);
            $(document).on("onQuizView", function( event, data ) {

            });
        }
    }

    viewSite();
});