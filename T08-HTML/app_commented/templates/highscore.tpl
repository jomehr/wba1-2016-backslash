<div id="hs-highscore" class="container font-secondary bg-white">
    <header id="hs-title" class="bg-yellow fg-black row">
        <h1>Effzeh - mer wesse alles üvver dich</h1>
    </header>
    <article class="row bg-darkgrey hs-search">
        <div class="col-sm-4 col-xs-hidden">
            <h2 class="fg-white">
                Highscore
            </h2>
        </div>
        <div class="col-sm-4">
            <select class="hs-select-box bg-white" title="Sortierung">
                <option>Position</option>
                <option>Punkte</option>
                <option>Spieler</option>
            </select>
        </div>
        <div class="col-sm-4">
            <input type="text" class="hs-search-box bg-white fg-black" maxlength="30" placeholder="suchen" id="hs-search-input"/>
        </div>
    </article>
    <article class="hs-table">
        <table>
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
            <a href="javascript:void(0)" class="btn js-change-view" data-view=0>
                Übersicht
            </a>
        </div>
        <div id="btn-play" class="col-md-4">
            <a href="javascript:void(0)" class="btn js-change-view" data-view=2>
                Dieses Quiz spielen!
            </a>
        </div>
    </article>
</div>