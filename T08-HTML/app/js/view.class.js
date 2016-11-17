var view = {
    availableViews: [
        "quizoverview",
        "quizinfo",
        "quizround",
        "quizend",
        "highscore"
    ],
    name: "quizoverview",
    render: function (view, data, callback) {
        if (this.availableViews.indexOf(view) > -1) {
            $.get("templates/" + view + ".tpl", function (source) {
                var template = Handlebars.compile(source);
                var templatespaceholder = $("#templatespaceholder");
                templatespaceholder.empty();
                templatespaceholder.append(template(data));
                this.name = view;

                if (typeof callback == "function") {
                    callback();
                }
            });
        } else {
            //debug
            console.log("undefined view: " + view);
        }
    },
    quizinfo: function() {
        getQuizViewByID(sessionobject.quizID);
        $(document).on("onQuizViewByID", function (event, data) {
            Quizobject.quizinfo = data;
            Quizobject.sessionobject = sessionobject;

            view.render("quizinfo", Quizobject, function () {
            clicklistener();
            });
        });
    },
    highscore: function() {
      getHighscoreByID(sessionobject.quizID);
      $(document).on( "onHighscoreData", function( event, data ) {
          Quizobject = data;
          Quizobject.sessionobject = sessionobject;
          console.log(Quizobject);
          view.render("highscore", Quizobject, function () {
          clicklistener();
          });
      });
    },
    quizoverview : function() {
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
        clicklistener();
        });
      });
    },
    quizend : function() {
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

            view.render("quizend", Quizobject, function(){
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
        });
    },
    quiz: function() {
        getQuizByID(sessionobject.quizID);
        $(document).on("onQuizData", function (event, data) {
            Quizobject.quiz = data;
            Quizobject.sessionobject = sessionobject;

            view.render("quizround", Quizobject);

            clicklistener();
        });
    }


};
