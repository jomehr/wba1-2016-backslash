<div class="container">
    <!-- Erstellung der Content-Box mit weißem Hintergrund -->
    <div class="row qr-content bg-white">
        <!-- Erstellung der Kopfzeile mit entsprechendem Thema -->
        <div class="row qr-head qr-no-margin bg-yellow fg-black">
            <h1>{{quiz.titel}}</h1>
        </div>
        <!-- Platzhalter für den Timer -->
        <div class="qr-timer row qr-no-margin">
            <div class="col-xs-12">
                <div class="qr-timer-item">
                    <h2 class="js-counter">15</h2>
                    <svg width="160" height="160">
                        <g>
                            <title>Layer 1</title>
                            <circle id="circle" class="circle_animation" r="69.85699" cy="81" cx="81" stroke-width="12"
                                    stroke="#e9c20c" fill="none" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <!-- Hier wird die Frage abgebildet -->
        <div class="qr-question row qr-no-margin">
            <div class="col-xs-12">
                <p class="qr-text js-quizfrage"></p>
            </div>
        </div>
        <!-- Erstellung der Antworten-Box -->
        <div class="qr-inner_box row qr-no-margin">
            <div class="col-x s-12">
                <div class="qr-answers font-secondary">
                    <button class="qr-fg-black bg-lightgrey fg-black">
                        <span class="qr-short bg-yellow">A</span>
                        <span class="qr-long bg-lightgrey js-answer"></span>
                    </button>

                    <button class="qr-fg-black bg-lightgrey fg-black">
                        <span class="qr-short bg-yellow">B</span>
                        <span class="qr-long bg-lightgrey js-answer"></span>
                    </button>

                    <button class="qr-fg-black bg-lightgrey fg-black">
                        <span class="qr-short bg-yellow">C</span>
                        <span class="qr-long bg-lightgrey js-answer"></span>
                    </button>

                    <button class="qr-fg-black bg-lightgrey fg-black">
                        <span class="qr-short bg-yellow">D</span>
                        <span class="qr-long bg-lightgrey js-answer"></span>
                    </button>
                </div>

                <!-- Feedback-Icons werden erstellt -->
                <div class="qr-answer_icons">
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon bg-mediumgrey"></div>
                    <div class="qr-answer_icon_last bg-mediumgrey"></div>
                </div>
                <!-- Button für das Beenden des Quizzes wird erstellt -->
                <div class="qr-button">
                    <button type="button" class="js-change-view" id="quiz_beenden" data-view="3">Quizrunde beenden
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>