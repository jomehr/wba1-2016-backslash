{{#datquiz}}
<section class="container ss_box bg-white">
    <header class="row bg-yellow">
        <h1 id="JS_Titel">{{titel}}</h1>
    </header>
    <div class="ss_erg ss_box_content row">
        <div class="ss_left col-md-8 col-xs-12">
            <h2>Dein Ergebnis</h2>
            <div class="ss_score row">
                <div class="ss_score_sp col-md-7 col-xs-12">
                    <p class="ss_mobile_points_txt"></p>
                    <div class="ss_score_balken bg-mediumgrey">
                        <!-- 10% as defult value for score, changed by main logic -->
                        <div class="ss_scale_score bg-yellow" id="JS_ScaleScore">
                        </div>
                    </div>
                    <p class="ss_mobile_answer_txt"></p>
                    <div class="ss_score_points animated slideInLeft" id="JS_Score">
                    </div>
                </div>

                <div class="ss_score_txt col-md-5">
                    <p id=JS_punkte>{{points}} von {{maxpoints}}</p>
                    <p id=JS_richtig>{{countright}} von {{countquestions}}</p>
                </div>
            </div>
            <p>Ich will mehr zu diesem Thema wissen</p>
            <div class="ss_scoreboard">
                <p>Neue Position</p>
                <table class="font-bold table">
                    {{#each highscore}}
                    <tr>
                        <td>{{this.position}}</td>
                        <td>{{this.name}}</td>
                        <td>{{this.punktzahl}} Punkte</td>
                    </tr>
                    {{/each}}
                </table>

            </div>
        </div>
        <div class="ss_right col-md-4 col-xs-12">
            <figure>
                <img src="{{bild}}" alt="Fan1.jpg" class="img-responsive" id="{{bild}}"/>
                <figcaption>

                    <p id="JS_Text">{{text}}</p>

                </figcaption>
            </figure>
        </div>
    </div>


    <div class="ss_buttons ss_box_content row">
        <div class="col-sm-4">
            <a class="btn js-change-view" data-view=0 href="">Übersicht</a>
        </div>
        <div class="col-sm-4">
            <a class="btn js-change-view" data-view=4 data-quizID="{{quizID}}" href="">Highscoreliste</a>
        </div>
        <div class="col-sm-4">
            <a class="btn js-change-view" data-view=2 data-quizID="{{quizID}}" href="">Jetzt spielen!</a>
        </div>
    </div>
    {{/datquiz}}
</section>

<section class="container ss_box bg-white ss_slider">
    <header>
        <h2>Das könnte dir auch gefallen</h2>
    </header>
    {{#each quizes}}
    <!--  Sliderelement  -->
    <div class="ss_slider_content row">
        <!--  linke Seite vom Slider  -->
        <div class="col-md-4">
            <h2>{{this.titel}}</h2>
            <img class="img-responsive" src="{{this.bild}}" alt="{{this.bild}}"/>
        </div>
        <!--  Mitte vom Slider  -->
        <div class="col-md-6 ss_slider_text">
            <p>{{this.text}}</p>
            <div class="ss_slider_author font-bold">
                {{this.datum}}<br/>
                {{this.autor}}
            </div>
        </div>
        <!--  rechte Seite vom Slider  -->
        <div class="col-md-2 ss_slider_right">
            <p><span class="font-bold">{{this.spielzahl}}</span> mal gespielt</p>
            <div class="ss_slider_points fg-white bg-darkgrey font-bold">8 / 10 Punkten</div>
            <a class="btn js-change-view" data-view=2 data-quizid="{{this.quizID}}" href="">Jetzt spielen!</a>
        </div>
    </div>
    {{/each}}

    <!--  Slider Menüpunkte  -->
    <div class="ss_slider_menu">
        <div class="ss_slider_menu_elemente">
            <i class="ss_slider_menu_left ico-light-arrow-left"></i>
            <i class="ss_slider_menu_right ico-light-arrow-right"></i>
        </div>
    </div>
</section>

<script type="application/javascript" src="js/T05/slider.js"></script>
<script type="application/javascript" src="js/T05/script.js"></script>