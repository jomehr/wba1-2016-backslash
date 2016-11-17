{{#datquiz}}
<div class="container ss_box">
    <header class="bg-yellow">
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
                        <div class="ss_scale_score" id="JS_ScaleScore">
                        </div>
                    </div>
                    <p class="ss_mobile_answer_txt"></p>
                    <div class="ss_score_points" id="JS_Score">
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
</div>

<!--  allgemeine mit Inhalt des Sliders  -->
<div class="container ss_box ss_slider">

    <h2>Das könnte dir auch gefallen</h2>

    <!-- Carousel -->
    <div class="js-carousel">
        {{#each quizes}}
        <!-- Carousel Cell-->
        <div class="js-carousel-cell">
            <div class="ss_slider_content row">
                <!--  linke Seite vom Slider  -->
                <div class="col-md-4">
                    <h2 id="JS_SliderTitel">{{this.titel}}</h2>
                    <img class="img-responsive" src="{{this.bild}}" alt="Stadion10" id="JS_SliderBild"/>
                </div>
                <!--  Mitte vom Slider  -->
                <div class="col-md-6 ss_slider_text">
                    <p id="JS_SliderText">{{this.text}}</p>
                    <div class="ss_slider_author font-bold" id="JS_SliderDU">
                        {{this.datum}}<br/>
                        {{this.autor}}
                    </div>
                </div>
                <!--  rechte Seite vom Slider  -->
                <div class="col-md-2 ss_slider_right">
                    <p><span class="font-bold" id="JS_SliderPlayed">{{this.spielzahl}}</span> mal gespielt</p>
                    <div class="ss_slider_points fg-white bg-darkgrey font-bold">8 / 10 Punkten</div>
                    <a class="btn js-change-view" data-view=2 data-quizid="{{this.quizID}}" href="">Jetzt
                        spielen!</a>
                </div>
            </div>
        </div>
        {{/each}}
    </div>
</div>