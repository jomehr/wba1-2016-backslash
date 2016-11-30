<!-- Quizübersicht -->
<main class="container qo-content-box bg-white">
    <!-- Headline -->
    <header class="row bg-yellow fg-black qo-headline-box">
        <div class="col-sm-4">
            <h1 class="qo-headline">Quizzübersicht</h1>
        </div>

        <!-- Dropdown sortieren -->
        <div class="col-sm-4">
            <div class="qo-wrapper-select-box">
                <select id="js_sort" class="qo-select-box bg-white js_sort" title="Sortieren">
                    <option value="datum">nach Erscheinungsdatum</option>
                    <option value="alphabetisch">alphabetisch</option>
                    <option value="beliebtheit">nach Beliebtheit</option>
                </select>
            </div>
        </div>
        <!-- End Dropdown sortieren -->

        <!-- Suchfeld -->
        <div class="col-sm-4">
            <input type="text" id="js_sort_text" class="qo-search-box bg-white fg-black js_sort" maxlength="30" placeholder="suchen">
        </div>
        <!-- End Suchfeld -->
    </header>
    <!--End Headline -->

    <!-- Auflistung Quizspiele -->
    <section>
        <ul>
            <!-- Quizspiel -->
            {{#each quizsuggestion}}
            <li class="js-collapse-section">
                <div class="row qo-quiz-summary js-quiz-summary">

                    <!-- Headline -->
                    <div class="col-sm-8">
                        <a href="#" class="qo-collapse-link js-collapse-link fg-black"><i
                                    class="qo-arrow ico-light-arrow-right"></i>
                            <h2 class="qo-subheadline">{{titel}}</h2></a>
                    </div>
                    <div class="col-sm-4 _hidden-xs">
                        <p class="qo-infos"><strong>{{spielzahl}}</strong> mal gespielt</p>
                    </div>
                </div>


                <div class="row qo-quiz-details js-collapse-details _same-height-sm">
                    <!-- Quizbild -->
                    <div class="col-sm-6 col-md-4">
                        <img class="qo-image" src="{{bild}}" alt="{{titel}}">
                    </div>
                    <!-- End Quizbild -->

                    <!-- Quizinfos -->
                    <div class="col-sm-6 col-md-8">
                        <div class="row">
                            <div class="col-sm-12 col-md-10">
                                <p class="qo-text">{{text}}</p>
                            </div>
                        </div>

                        <div class="row qo-quizinfo-box _same-height-xs">
                            <div class="col-xs-6 col-sm-4 col-md-6">
                                <p class="qo-time">
                                    <time>{{datum}}</time>
                                </p>
                                <p class="qo-author">{{autor}}</p>
                            </div>
                            <div class="col-xs-6 _visible-xs-block qo-counter">
                                <p><strong>{{spielzahl}}</strong> mal gespielt</p>
                            </div>
                            <div class="col-sm-8 col-md-6 _hidden-xs">
                                <a data-view="1" href="#" data-quizid="{{this.quizID}}"
                                   class="btn qo-button js-change-view">Jetzt spielen!</a>
                            </div>
                        </div>
                        <div class="row qo-quizinfo-box">
                            <div class="col-xs-12 _visible-xs-block">
                                <a data-view="1" href="#" data-quizid="{{this.quizID}}"
                                   class="btn qo-button js-change-view">Jetzt spielen!</a>
                            </div>
                        </div>
                    </div>
                    <!-- End Quizinfos -->
                </div>
            </li>
            {{/each}}
            <!-- End Quizspiel -->

        </ul>
    </section>
    <!--End Auflistung Quizspiele -->
</main>
<!-- End Quizübersicht -->

<!-- Zuletzt gespielt -->
<section class="container qo-content-box qo-box-last-played bg-white">
    <div class="row">

        <!-- Healine -->
        <div class="col-xs-12">
            <h1 class="qo-headline -smallcentered font-primary">Zuletzt gespielt</h1>
        </div>
        <!-- End Headline -->
    </div>

    <!-- Carousel -->
    <div class="js-carousel">

        <!-- Carousel Cell-->
        <div class="js-carousel-cell">

            <div class="row qo-quiz-summary">

                <!-- Headline -->
                <div class="col-sm-8">
                    <h2 class="qo-subheadline -withoutmargin">Das Stadion Quizz</h2>
                </div>
                <div class="col-sm-4 _hidden-xs ">
                    <p class="qo-infos"><strong>67</strong> mal gespielt</p>
                </div>

                <!-- End Headline -->
            </div>


            <div class="row qo-quiz-details  _same-height-sm">
                <!-- Quizbild -->
                <div class="col-sm-6 col-md-4">
                    <img class="qo-image" src="old/img/stadion5-klein.jpg" alt="Fußballstadion">
                </div>
                <!--End Quizbild -->

                <!-- Quizinfos -->
                <div class="col-sm-6 col-md-8">
                    <div class="row">
                        <div class="col-sm-12 col-md-10">
                            <p class="qo-text">Die größten, bedeutensten, modernsten und wichtigsten Stadien der
                                Welt. Kaum etwas ist bei großen Verienen so bedeutend wie das Stadion. Es ist nicht
                                nur ein Statussymbol für jeden erfolgreichen Verein, sondern oft auch ein Denkmal
                                für große Ereignisse in der Historie eines Vereiens. Hier findest Fragen zu den
                                Stadien der Welt. Auf geht's! </p>
                        </div>
                    </div>

                    <div class="row qo-quizinfo-box _same-height-xs">
                        <div class="col-xs-6 col-sm-4 col-md-6">
                            <p class="qo-time">
                                <time datetime="2016-06-17">17.06.2016</time>
                            </p>
                            <p class="qo-author">Hennes48</p>
                        </div>
                        <div class="col-xs-6 _visible-xs-block qo-counter">
                            <p><strong>37</strong> mal gespielt</p>
                        </div>
                        <div class="col-sm-8 col-md-6 _hidden-xs">
                            <p class="qo-points">8 / 10 Punkten</p>
                            <a href="#" class="btn qo-button js-change-view" data-view=2 data-quizid="0">Erneut
                                spielen!</a>
                        </div>
                    </div>
                    <div class="row qo-quizinfo-box">
                        <div class="col-xs-12 _visible-xs-block">
                            <p class="qo-points">beendet mit 8/10 Punkte</p>
                            <a href="#" class="btn qo-button js-change-view" data-view=2 data-quizid="0">Erneut
                                spielen!</a>
                        </div>
                    </div>

                </div>
                <!-- End Quizinfos -->
            </div>
        </div>
        <!-- End Carousel Cell-->
        <!-- Carousel Cell-->
        <div class="js-carousel-cell">
            <div class="row qo-quiz-summary">

                <!-- Headline -->
                <div class="col-sm-8">
                    <h2 class="qo-subheadline -withoutmargin">EffZeh</h2>
                </div>
                <div class="col-sm-4 _hidden-xs ">
                    <p class="qo-infos"><strong>67</strong> mal gespielt</p>
                </div>

                <!-- End Headline -->
            </div>


            <div class="row qo-quiz-details  _same-height-sm">
                <!-- Quizbild -->
                <div class="col-sm-6 col-md-4">
                    <img class="qo-image" src="old/img/stadion8-klein.jpg" alt="Fußballstadion">
                </div>
                <!--End Quizbild -->

                <!-- Quizinfos -->
                <div class="col-sm-6 col-md-8">
                    <div class="row">
                        <div class="col-sm-12 col-md-10">
                            <p class="qo-text">Wenn du ein FC Fan bist, ist das das Quiz nach dem du suchst. Kein weiterer Text notwendig, spiel es einfach. Alaaf </p>
                        </div>
                    </div>

                    <div class="row qo-quizinfo-box _same-height-xs">
                        <div class="col-xs-6 col-sm-4 col-md-6">
                            <p class="qo-time">
                                <time datetime="2016-11-03">03.11.2016</time>
                            </p>
                            <p class="qo-author">DerEineDing</p>
                        </div>
                        <div class="col-xs-6 _visible-xs-block qo-counter">
                            <p><strong>510</strong> mal gespielt</p>
                        </div>
                        <div class="col-sm-8 col-md-6 _hidden-xs">
                            <p class="qo-points">7 / 10 Punkten</p>
                            <a href="#" class="btn qo-button js-change-view" data-view=0>Erneut spielen!</a>
                        </div>
                    </div>
                    <div class="row qo-quizinfo-box">
                        <div class="col-xs-12 _visible-xs-block">
                            <p class="qo-points">beendet mit 7/10 Punkte</p>
                            <a href="#" class="btn qo-button js-change-view" data-view=0>Erneut spielen!</a>
                        </div>
                    </div>

                </div>
                <!-- End Quizinfos -->
            </div>
        </div>
        <!-- End Carousel Cell-->
        <!-- Carousel Cell-->
        <div class="js-carousel-cell">
            <div class="row qo-quiz-summary">

                <!-- Headline -->
                <div class="col-sm-8">
                    <h2 class="qo-subheadline -withoutmargin">Verrückte Bälle rollen weit</h2>
                </div>
                <div class="col-sm-4 _hidden-xs ">
                    <p class="qo-infos"><strong>67</strong> mal gespielt</p>
                </div>

                <!-- End Headline -->
            </div>


            <div class="row qo-quiz-details  _same-height-sm">
                <!-- Quizbild -->
                <div class="col-sm-6 col-md-4">
                    <img class="qo-image" src="old/img/ballm-nurklein.jpg" alt="Fußballstadion">
                </div>
                <!--End Quizbild -->

                <!-- Quizinfos -->
                <div class="col-sm-6 col-md-8">
                    <div class="row">
                        <div class="col-sm-12 col-md-10">
                            <p class="qo-text">Oh damn Bälle, Bälle sind rund und rund und rund und rund und rund und rund und rund rund und vor allem sehr besonders Rund.</p>
                        </div>
                    </div>

                    <div class="row qo-quizinfo-box _same-height-xs">
                        <div class="col-xs-6 col-sm-4 col-md-6">
                            <p class="qo-time">
                                <time datetime="2012-01-01">01.01.2012</time>
                            </p>
                            <p class="qo-author">Bollocks</p>
                        </div>
                        <div class="col-xs-6 _visible-xs-block qo-counter">
                            <p><strong>12000</strong> mal gespielt</p>
                        </div>
                        <div class="col-sm-8 col-md-6 _hidden-xs">
                            <p class="qo-points">9 / 10 Punkten</p>
                            <a href="#" class="btn qo-button js-change-view" data-view=0>Erneut spielen!</a>
                        </div>
                    </div>
                    <div class="row qo-quizinfo-box">
                        <div class="col-xs-12 _visible-xs-block">
                            <p class="qo-points">beendet mit 79/10 Punkte</p>
                            <a href="#" class="btn qo-button js-change-view" data-view=0>Erneut spielen!</a>
                        </div>
                    </div>

                </div>
                <!-- End Quizinfos -->
            </div>
        </div>
        <!-- End Carousel Cell-->
        
    </div>
</section>
<!--End Zuletzt gespielt -->

<script type="application/javascript" src="js/T06/collapse.js"></script>
<script type="application/javascript" src="js/lib/flickity.pkgd.min.js"></script>