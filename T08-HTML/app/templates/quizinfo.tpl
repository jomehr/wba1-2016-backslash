<!-- body with title, information text, username -->
{{#quizinfo}}
<div class="container st_box">
    <!-- <section class="st_box bg-white"> -->
    <div class="row bg-yellow" id="header">
        <div class="col-xs-12">
            <h1>{{titel}}</h1>
        </div>
    </div>
    <div class="row" id="pic">
        <img src="{{bild}}" alt="teaserbild" class="st-teaserbild">
    </div>
    <div class="row st_erg st_box_content">
        <div class="st_left_col col-lg-8 col-xs-12">
            <p>{{text}}</p>
        </div>
        <div class="st_right_col col-lg-4 col-xs-12">
            <div class="row">
                <div class="font-bold st_right2 st_rightdown col-xs-6 col-lg-12">
                    <p>{{datum}}</p>
                    <p>{{autor}}</p>
                </div>
                <div class="st_right1 col-xs-6 col-lg-12">
                    <p><strong>{{spielzahl}}</strong> mal gespielt</p>
                </div>
            </div>

        </div>
    </div>

    <!-- buttons  -->
    <div class="row st_buttons">
        <div class="col-lg-4">
            <a class="btn js-change-view" data-view=”0” href="">Übersicht</a>
        </div>
        <div class="col-lg-4">
            <a class="btn js-change-view" data-view=4 data-quizID="{{quizID}}" href="">Highscoreliste</a>
        </div>
        <div class="col-lg-4">
            <a class="btn js-change-view" data-view=2 data-quizID="{{quizID}}" href="">Jetzt spielen!</a>
        </div>
    </div>
    {{/quizinfo}}
    <!-- </section> -->
</div>