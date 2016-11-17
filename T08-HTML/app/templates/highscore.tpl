<div id="hs-highscore" class="container">
    <header id="hs-title">
        <div class="hs-ueberschriften">Effzeh - mer wesse alles üvver dich</div>
    </header>
    <article id="hs-search" class="row">
        <div class="col-sm-4 col-xs-12">
            <div class="hs-search-element">
                <p>Highscore</p>
            </div>
        </div>
        <div class="col-sm-4 col-xs-12">
            <select class="hs-search-feld" name="sortieren nach" title="Sortierung">
                <option>Position</option>
                <option>Punkte</option>
                <option>Spieler</option>
            </select>
        </div>
        <div class="col-sm-4 col-xs-12">
            <input class="hs-search-element" id="hs-search-input" name="suche" placeholder="Spieler suche"/>
        </div>
    </article>
    <article>
        <table class="hs_fixed_headers">
            <thead>
            <tr class="hs-fixed-headers-title">
                <th>Position</th>
                <th> Spieler</th>
                <th> Punkte</th>
            </tr>
            </thead>
            {{#each highscore}}
            <tr>
                <td>{{this.position}}</td>
                <td>{{this.name}}</td>
                <td>{{this.punktzahl}}</td>
            </tr>
            {{/each}}
        </table>
    </article>
    <article class="row">
        <div id="btn-uebersicht" class="col-sm-4 col-xs-12 col-sm-offset-4">
            <div>
                <a href="#" class="btn hs-option_button js-change-view" data-view=0> Übersicht</a>
            </div>
        </div>
        <div id="btn-play" class="col-sm-4 col-xs-12">
            <div>
                <a href="#" class="btn hs-option_button js-change-view" data-view=2> Dieses Quiz spielen !</a>
            </div>
        </div>
    </article>
</div>
