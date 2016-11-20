<div id="hs-highscore" class="container font-secondary bg-white">
    <header id="hs-title" class="bg-yellow fg-black row">
        <div class="hs-ueberschriften">Effzeh - mer wesse alles üvver dich</div>
    </header>
    <article id="hs-search" class="row bg-darkgrey">
        <div class="col-sm-4 col-xs-12">
            <div class="hs-search-element fg-white">
                <p>Highscore</p>
            </div>
        </div>
        <div class="col-sm-4 col-xs-12">
            <select class="hs-search-feld fg-darkgrey" name="sortieren nach" title="Sortierung">
                <option>Position</option>
                <option>Punkte</option>
                <option>Spieler</option>
            </select>
        </div>
        <div class="col-sm-4 col-xs-12">
            <input class="hs-search-element fg-darkgrey" id="hs-search-input" name="suche" placeholder="Spieler suche"/>
        </div>
    </article>
    <article>
        <table class="hs_fixed_headers">
            <thead class="fg-black">
            <tr class="hs-fixed-headers-title">
                <th class="font-primary">Position</th>
                <th class="font-primary">Spieler</th>
                <th class="font-primary">Punkte</th>
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
    <article class="row hs-buttons">
        <div id="btn-uebersicht" class="col-md-4 col-md-offset-4">
            <a href="javascript:void(0)" class="btn hs-option_button js-change-view" data-view=0> Übersicht</a>
        </div>
        <div id="btn-play" class="col-md-4">
            <a href="javascript:void(0)" class="btn hs-option_button js-change-view" data-view=2> Dieses Quiz spielen!</a>
        </div>
    </article>
</div>