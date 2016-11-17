var view = {
    availableViews: [
        "quizoverview",
        "quizinfo",
        "quizround",
        "quizend"
        //"highscore"
    ],
    name: "quizoverview",
    render: function (view, data) {
        var source = $("#" + view + "-template").html();
        var template = Handlebars.compile(source);
        var templatespaceholder = $("#templatespaceholder");
        templatespaceholder.empty();
        templatespaceholder.append(template(data));
    }
};