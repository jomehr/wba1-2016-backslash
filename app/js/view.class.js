var Quizobject = {};
var sessionobject = {};
var prefstate = 0;
function fnc_reloadssobject(callback) {
    sessionobject = {
        "points": sessionStorage.getItem('points'),
        "maxpoints": sessionStorage.getItem('maxpoints'),
        "countright": sessionStorage.getItem('correctanswers'),
        "countquestions": sessionStorage.getItem('amountquestions'),
        "quizID": sessionStorage.getItem('quizid'),
        "username": sessionStorage.getItem('username'),
        "view": sessionStorage.getItem('view')
    };
    if (typeof callback == "function") {
        callback("justheretosayimready");
    }
}

var view = {
    templatespaceholder: null,
    availableViews: [
        "quizoverview", //0
        "quizinfo",     //1
        "quizround",    //2
        "quizend",      //3
        "highscore"     //4
    ],
    init: function () {
        view.templatespaceholder = $("#templatespaceholder");
    },
    name: "quizoverview",
    render: function (view, callback) {
        //reset quizround mobile optimizations for all views
        $("body").removeClass("qr-mobile-body");
        var that = this;
        if (this.availableViews.indexOf(view) > -1) {
            var pre_function = this["pre_" + view];
            if (typeof pre_function == "function") {
                pre_function(function (data) {
                    $.get("templates/" + view + ".tpl", function (source) {

                        var template = Handlebars.compile(source);
                        that.templatespaceholder.empty();
                        that.templatespaceholder.append(template(data));
                        this.name = view;

                        if (typeof callback == "function") {
                            callback(data);
                        }
                    });
                });
            } else {
                $.get("templates/" + view + ".tpl", function (source) {
                    var template = Handlebars.compile(source);
                    var template = Handlebars.compile(source);
                    that.templatespaceholder.empty();
                    that.templatespaceholder.append(template(data));
                    this.name = view;

                    if (typeof callback == "function") {
                        callback(data);
                    }
                });
            }
        }
    },
    pre_quizoverview: function (callback) {
        Quizobject = {};
        prefstate = 0; // setting state before executing to stop multiple callbacks
        view.dat_QuizView(function (data) {

            if (prefstate === 0) {
                Quizobject.quizsuggestion = data; //copy object

                if (typeof callback == "function") {
                    callback(Quizobject);
                }
            }
        });
    },
    pre_quizinfo: function (callback) {
        Quizobject = {};
        prefstate = 1;
        view.dat_QuizViewByID(sessionobject.quizID, function (data) {
            if (prefstate === 1) {
                Quizobject.quizinfo = data;
                Quizobject.sessionobject = sessionobject;

                if (typeof callback == "function") {
                    callback(Quizobject);
                }
            }
        });
    },
    pre_quizround: function (callback) {
        var doCallback = true;

        Quizobject = {};
        prefstate = 2;
        view.dat_QuizByID(sessionobject.quizID, function (data) {
            if (prefstate === 2) {
                Quizobject.quiz = data;
                Quizobject.sessionobject = sessionobject;
                Quizobject.quiz.titel = "Quiztitel"; //TODO: get from API
                view.dat_QuizViewByID(sessionobject.quizID, function (data) {
                  if(prefstate === 2) {
                    Quizobject.quiz.titel = data.titel;
                    if (typeof callback == "function" && doCallback) {
                        doCallback = false;
                        callback(Quizobject);
                    }
                  }
                });
            }
        });
    },
    pre_quizend: function (callback) {
        var doCallback = true;

        Quizobject = {};
        prefstate = 3;
        fnc_reloadssobject(function (ready) {
            view.dat_QuizViewByID(sessionobject.quizID, function (data) {
                if (prefstate === 3) {
                    Quizobject.datquiz = data;
                    var quizInfo = {};
                    view.dat_getHighscorePositions(sessionobject.quizID, sessionobject.username, sessionobject.points, function (data) {
                        if (prefstate === 3) {
                            $.extend(Quizobject.datquiz, data);
                            view.dat_QuizView(function (data) {
                                if (prefstate === 3) {
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

                                    if (typeof callback == "function" && doCallback) {
                                        doCallback = false;
                                        callback(Quizobject);
                                    }
                                }
                            });
                        }

                    });
                }

            });
        });
    },
    pre_highscore: function (callback) {
        Quizobject = {};
        prefstate = 4;
        view.dat_HighscoreByID(sessionobject.quizID, function (data) {
            if (prefstate === 4) {
                Quizobject = data;
                Quizobject.sessionobject = sessionobject;

                if (typeof callback == "function") {
                    callback(Quizobject);
                }
            }
        });
    },
    dat_QuizViewByID: function (quizID, callback) {
        getQuizViewByID(quizID);
        $(document).on("onQuizViewByID", function (event, data) {

            if (typeof callback == "function") {
                callback(data);
            }
        });
    },
    dat_QuizByID: function (quizID, callback) {
        getQuizByID(quizID);
        $(document).on("onQuizData", function (event, data) {
            if (typeof callback == "function") {
                callback(data);
            }
        });
    },
    dat_QuizView: function (callback) {
        getQuizView(10);
        $(document).on("onQuizView", function (event, data) {
            if (typeof callback == "function") {
                callback(data);
            }
        });
    },
    dat_HighscoreByID: function (quizID, callback) {
        getHighscoreByID(quizID);
        $(document).on("onHighscoreData", function (event, data) {
            if (typeof callback == "function") {
                callback(data);
            }
        });
    },
    dat_getHighscorePositions: function (quizID, username, points, callback) {
        getHighscorePositions(quizID, username, points);
        $(document).on("onHighscorePositions", function (event, data) {
            if (typeof callback == "function") {
                callback(data);
            }
        });
    }
};
