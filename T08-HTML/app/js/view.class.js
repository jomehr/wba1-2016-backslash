var view = {
    availableViews: [
        "quizoverview",
        "quizinfo",
        "quizround",
        "quizend"
        //"highscore"
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
    }
};