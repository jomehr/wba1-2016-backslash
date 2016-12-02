var collapse = {
    init: function () {
        var elements = document.querySelectorAll('.js-collapse-section');
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var link = element.querySelector('.js-collapse-link');

            link.addEventListener('click', collapse.toogle);
            link.classList.add('-collapsed');

            var details = element.querySelector('.js-collapse-details');
            details.classList.add('-collapsed');
            details.style.height = '0px';
        }
    },

    toogle: function (e) {
        var link = e.currentTarget;
        var section = link.closest('.js-collapse-section');
        var details = section.querySelector('.js-collapse-details');
        var summary = section.querySelector('.js-quiz-summary');

        e.preventDefault();

        if (hasClass(details, '-collapsed')) {
            link.classList.remove('-collapsed');

            details.classList.remove('-collapsed');
            details.classList.add('-active');
            summary.classList.add('-active');

            var prevHeight = details.style.height;
            details.style.height = 'auto';

            var endHeight = getComputedStyle(details).height;
            details.style.height = prevHeight;
            details.style.transition = 'height .3s ease-in-out';
            details.offsetHeight; // force repaint
            details.style.height = endHeight;
            details.addEventListener('transitionend', handleTransitionEnd);

        } else {

            link.classList.add('-collapsed');
            details.classList.add('-collapsed');
            details.classList.remove('-active');
            summary.classList.remove('-active');

            details.style.transition = 'height .3s ease-in-out';

            //Animation muss via JavaScript 'zu Fuß' erstellt werden, da man height: auto via CSS nicht animieren kann
            details.style.height = getComputedStyle(details).height;
            details.offsetHeight; // force repaint
            details.style.height = '0px';
            details.removeEventListener('transitionend', handleTransitionEnd, false);


        }
    }
};

function handleTransitionEnd(e) {
    var element = e.target;
    element.style.transition = '';
    element.style.height = 'auto';
    element.removeEventListener('transitionend', handleTransitionEnd, false);
}

// closest polyfill (von http://plain.js)
this.Element && function (ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest ||
        function (selector) {
            var el = this;
            while (el.matches && !el.matches(selector)) el = el.parentNode;
            return el.matches ? el : null;
        }
}(Element.prototype);

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}