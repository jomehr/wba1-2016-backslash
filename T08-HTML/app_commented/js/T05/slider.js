/**
 * Slider Object
 * @author Tobias Ulber tobias.ulber@gmail.com
 */
var Slider = {
    //Interval für Slider.next aufruf
    interval: 10000,

    //Enthält später den interval
    intervalFunc: 0,

    //Welche DOM Element soll gewächselt werden
    element: ".ss_slider_content",

    //Objekt das alle Slider Elemente enthält
    elements: {},

    //Enthält das Aktive Element
    activeElement: 0,

    //Enthält alle Menüpunkte
    menuPoints: {},

    //Enthält aktiven Menüpunkt
    activeMenuPoint: 0,

    //Anzahl der Elemente
    itemLength: 0,

    //Element was next triggern soll
    nextElement: ".ss_slider_menu_right",

    //Element was previous triggern soll
    previousElement: ".ss_slider_menu_left",

    //Element was ein Menüpunkt triggern soll
    menuElement: ".ss_slider_bt",

    //Element das später das menü enthalten soll
    menuParentElement: ".ss_slider_menu_left",

    //Farbe eines nicht aktive Menüpunktes
    menuPointColor: "#ccc",

    //Farbe eines aktiven Menüpunktes
    menuPointActiveColor: "#504f48",

    //Gibt an ob bei einem Menüpunkt klick der Slider nicht mehr
    //automatisch weiter machen soll
    onMenuClickStop: true,

    slide: function () {
        this.elements = document.querySelectorAll(this.element);
        this.itemLength = this.elements.length - 1;

        var menuPlace = document.querySelector(this.menuParentElement);
        var i;

        //Erstellt das Slider Menü
        for (i = 0; i <= this.itemLength; i++) {
            var menuPoint = document.createElement("div");
            menuPoint.className = this.menuElement.replace(".", "");
            menuPlace.parentNode.insertBefore(menuPoint, menuPlace.nextSibling);
        }

        this.menuPoints = document.querySelectorAll(this.menuElement);
        for (i = 0; i < this.menuPoints.length; i++) {
            this.menuPoints[i].addEventListener("click", function (e) {
                Slider.menuPointClick(e);
            });
        }

        document.querySelector(this.nextElement).addEventListener("click", function () {
            Slider.next();
        });
        document.querySelector(this.previousElement).addEventListener("click", function () {
            Slider.previous();
        });

        this.next();
        this.start();
    },

    next: function () {
        if (this.activeElement == 0) {
            this.activeElement = this.elements[0];
            this.activeElement.style.display = "block";

            this.activeMenuPoint = this.menuPoints[0];
            this.activeMenuPoint.style.backgroundColor = this.menuPointActiveColor;
        }
        else {
            var index = [].indexOf.call(this.elements, this.activeElement);

            this.activeElement.style.display = "none";
            this.activeMenuPoint.style.backgroundColor = this.menuPointColor;

            if (typeof this.elements[index + 1] === "undefined") {

                this.activeElement = this.elements[0];
                this.activeElement.style.display = "block";

                this.activeMenuPoint = this.menuPoints[0];
                this.activeMenuPoint.style.backgroundColor = this.menuPointActiveColor;
            }
            else {
                this.activeElement = this.elements[index + 1];
                this.activeElement.style.display = "block";

                this.activeMenuPoint = this.menuPoints[index + 1];
                this.activeMenuPoint.style.backgroundColor = this.menuPointActiveColor;
            }
        }
        this.reset();
    },

    previous: function () {
        var index = [].indexOf.call(this.elements, this.activeElement);

        this.activeElement.style.display = "none";
        this.activeMenuPoint.style.backgroundColor = this.menuPointColor;
        if (index == 0) {
            this.activeElement = this.elements[this.elements.length - 1];
            this.activeElement.style.display = "block";

            this.activeMenuPoint = this.menuPoints[this.elements.length - 1];
            this.activeMenuPoint.style.backgroundColor = this.menuPointActiveColor;
        }
        else {
            this.activeElement = this.elements[index - 1];
            this.activeElement.style.display = "block";

            this.activeMenuPoint = this.menuPoints[index - 1];
            this.activeMenuPoint.style.backgroundColor = this.menuPointActiveColor;
        }
        this.reset();
    },

    stop: function () {
        clearInterval(this.intervalFunc);
    },

    start: function () {
        this.intervalFunc = setInterval(function () {
            Slider.next()
        }, this.interval);
    },

    reset: function () {
        this.stop();
        if (!this.onMenuClickStop)
            this.start();
    },

    menuPointClick: function (e) {
        //Chrome = e.srcElement | Other Browser e.target
        var index = [].indexOf.call(this.menuPoints, e.srcElement || e.target);

        this.activeElement.style.display = "none";
        this.activeMenuPoint.style.backgroundColor = this.menuPointColor;

        this.activeElement = this.elements[index];
        this.activeElement.style.display = "block";

        this.activeMenuPoint = this.menuPoints[index];
        this.activeMenuPoint.style.backgroundColor = "#504f48";
        this.reset();
    }
};