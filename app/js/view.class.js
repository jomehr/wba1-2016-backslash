var Quizobject = {};
var sessionobject = {};

var view = {
    availableViews: [
        "quizoverview", //0
        "quizinfo",     //1
        "quizround",    //2
        "quizend",      //3
        "highscore"     //4
    ],
    name: "quizoverview",
    render: function (view, callback) {
        if (this.availableViews.indexOf(view) > -1) {
            var pre_function = this["pre_" + view];
            if (typeof pre_function == "function") {
                pre_function(function (data) {
                    $.get("templates/" + view + ".tpl", function (source) {
                        var template = Handlebars.compile(source);
                        var templatespaceholder = $("#templatespaceholder");
                        templatespaceholder.empty();
                        templatespaceholder.append(template(data));
                        this.name = view;

                        if (typeof callback == "function") {
                            callback(data);
                        }
                    });
                });
            } else {
                $.get("templates/" + view + ".tpl", function (source) {
                    var template = Handlebars.compile(source);
                    var templatespaceholder = $("#templatespaceholder");
                    templatespaceholder.empty();
                    templatespaceholder.append(template());
                    this.name = view;

                    if (typeof callback == "function") {
                        callback(data);
                    }
                });
            }
        }
    },
    pre_quizoverview: function (callback) {
        //Random Quiz Vorschlag
        getQuizView(10);

        $(document).on("onQuizView", function (event, data) {
            Quizobject.quizes = data; //copy object

            if (typeof callback == "function") {
                callback(Quizobject);
            }
        });
    },
    pre_quizinfo: function (callback) {
        getQuizViewByID(sessionobject.quizID);

        $(document).on("onQuizViewByID", function (event, data) {
            Quizobject.quizinfo = data;
            Quizobject.sessionobject = sessionobject;

            if (typeof callback == "function") {
                callback(Quizobject);
            }
        });
    },
    pre_quizround: function (callback) {
        getQuizByID(sessionobject.quizID);

        $(document).on("onQuizData", function (event, data) {
            Quizobject.quiz = data;
            Quizobject.sessionobject = sessionobject;
            if (typeof callback == "function") {
                callback(Quizobject);
            }
        });
    },
    pre_quizend: function (callback) {
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

            if (typeof callback == "function") {
                callback(Quizobject);
            }
        });
    },
    pre_highscore: function (callback) {
        getHighscoreByID(sessionobject.quizID);

        $(document).on("onHighscoreData", function (event, data) {
            Quizobject = data;
            Quizobject.sessionobject = sessionobject;

            if (typeof callback == "function") {
                callback(Quizobject);
            }
        });
    }
};
