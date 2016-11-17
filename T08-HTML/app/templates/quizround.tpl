{{#quiz}}
<div class="container">
    <!-- Erstellung der Content-Box mit weißem Hintergrund -->
    <div class="qr-content bg-white">
        <!-- Erstellung der Kopfzeile mit entsprechendem Thema -->
        <div class="qr-head row qr-no-margin">
            <div class="col-xs-12">
                <h1>Effzeh - mer wisse alles üvver dich</h1>
            </div>
        </div>
        <!-- Platzhalter für den Timer -->
        <div class="qr-timer row qr-no-margin">
            <div class="col-xs-12">
                <div class="qr-timer-item">
                    <h2>15</h2>
                    <svg width="160" height="160">
                        <g>
                            <title>Layer 1</title>
                            <circle id="circle" class="circle_animation" r="69.85699" cy="81" cx="81" stroke-width="12"
                                    stroke="#e9c20c" fill="none" style="stroke-dashoffset:880px;"/>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <!-- Hier wird die Frage abgebildet -->
        <div class="qr-question row qr-no-margin">
            <div class="col-xs-12">
                <p class="qr-text">"Welches dieser Zitate wird nicht Werders "Ostfriesen-Alemao" Dieter Eilts
                    zugeschrieben?</p>
            </div>
        </div>
        <!-- Erstellung der Antworten-Box -->
        <div class="qr-inner_box row qr-no-margin">
            <div class="col-x s-12">
                <!-- Button-Eigenschaften werden erstellt -->
                <!-- Farben für kleinen Button werden übergeben -->
                <!-- Farben für großen Button werden übergeben -->
                <!-- Schriften werden übergeben -->
                <div class="qr-answers font-secondary">
                    <button class="qr-fg-black bg-lightgrey">
                        <!-- kleine Box mit Answer-Key wird erstellt -->
                        <span class="qr-short bg-yellow">
                A
                </span>
                        <!-- große Box mit Antwort wird erstellt -->
                        <span class="qr-long bg-lightgrey" id="wrongAnswer1"
                              onclick="changeAnswerButtonColor('wrongAnswer1')">
                "Das interessiert mich jetzt wie eine geplatzte Currywust im ostfriesischen Wattenmeer."
                 </span>
                    </button>

                    <button class="qr-fg-black bg-lightgrey">
                <span class="qr-short bg-yellow">
                    B
                </span>
                        <span class="qr-long bg-lightgrey" id="wrongAnswer2"
                              onclick="changeAnswerButtonColor('wrongAnswer2')">
                    "Wir dürfen jetzt nicht den Sand in den Kopf stecken."
                </span>
                    </button>

                    <button class="qr-fg-black bg-lightgrey">
                <span class="qr-short bg-yellow">
                    C
                </span>
                        <span class="qr-long bg-lightgrey" id="wrongAnswer3"
                              onclick="changeAnswerButtonColor('wrongAnswer3')">
                    "Wenn meine Oma ein Bus wäre, dann könnte sie hupen."
                </span>
                    </button>

                    <button class="qr-fg-black bg-lightgrey">
                <span class="qr-short bg-yellow">
                    D
                </span>
                        <span class="qr-long bg-lightgrey" id="rightAnswer"
                              onclick="changeAnswerButtonColor('rightAnswer')">
                    "Moin moin, Gascoigne."
                </span>
                    </button>
                </div>

                <!-- Feedback-Icons werden erstellt -->
                <div class="qr-answer_icons">
                    <div class="qr-answer_icon bg-red"></div>
                    <div class="qr-answer_icon bg-red"></div>
                    <div class="qr-answer_icon bg-green"></div>
                    <div class="qr-answer_icon bg-red"></div>
                    <div class="qr-answer_icon bg-green"></div>
                    <div class="qr-answer_icon bg-green"></div>
                    <div class="qr-answer_icon bg-red"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon_last bg-mediumgrey"></div>
                </div>
                <!-- Button für das Beenden des Quizzes wird erstellt -->
                <div class="qr-button">
                    <button type="button" id="quiz_beenden">Quizrunde beenden</button>
                </div>
            </div>
            {{/quiz}}
        </div>
    </div>
</div>

<script type="application/javascript" src="js/lib/timerScript.min.js"></script>