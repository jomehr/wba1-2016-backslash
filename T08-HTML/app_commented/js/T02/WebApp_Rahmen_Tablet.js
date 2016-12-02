var navState = false;

function openNav() {
    var nav = document.getElementById("wa_Sidenav_mobil");

    if (navState === false) {
        nav.style.width = "264px";
        navState = true;
    } else {
        closeNav(nav);
    }

    nav.setAttribute("data-navState", "" + navState);
}

function closeNav(nav) {
    nav.style.width = "0";
    navState = false;
}

document.addEventListener('DOMContentLoaded', function () {

    //desktop
    var loginButton = document.querySelector('.js-login'),
        userNameBox = document.querySelector('.js-username-box'),
        inputUsername = document.querySelector('.js-input-username'),
        saveButton = document.querySelector('.js-save-username');

    //mobile
    var loginButtonMobile = document.querySelector('.js-login-mobile'),
        userNameBoxMobile = document.querySelector('.js-username-box-mobile'),
        inputUsernameMobile = document.querySelector('.js-input-username-mobile'),
        saveButtonMobile = document.querySelector('.js-save-username-mobile'),
        timer = null;

    var username = sessionStorage.getItem('username');

    //Blendet Username Box ein
    function showUsernameBox(element, input) {
        var username = sessionStorage.getItem('username');
        if (username) {
            input.value = username;
        }

        //display: block setzen
        element.classList.add('-displayblock');

        //Timer clearen
        clearTimeout(timer);

        //Nach display: Block, Element einblenden
        timer = setTimeout(function () {
            element.classList.add('-active');
        }, 20);
    }

    //Blendet Username Box aus
    function hideUsernameBox(element) {
        //Timer clearen
        clearTimeout(timer);

        element.classList.remove('-active');
        element.addEventListener('transitionend', handleTransitionEnd);
    }

    function handleTransitionEnd(e) {
        e.target.classList.remove('-displayblock', 500);
        e.target.removeEventListener('transitionend', handleTransitionEnd);
    }

    //Speichert Username in Local Storage
    function saveUsernameInLocalStorage(input, box) {
        var username = input.value;
        username = username.trim();

        if (username !== '') {
            sessionStorage.setItem('username', username);
            hideUsernameBox(box);
        }
    }

    //Blendet Username Box ein
    loginButton.addEventListener('click', function () {
        showUsernameBox(userNameBox, inputUsername);
    });
    loginButtonMobile.addEventListener('click', function () {
        showUsernameBox(userNameBoxMobile, inputUsernameMobile);
    });

    //Speichert Username in Local Storage
    saveButton.addEventListener('click', function () {
        saveUsernameInLocalStorage(inputUsername, userNameBox);
    });
    saveButtonMobile.addEventListener('click', function () {
        saveUsernameInLocalStorage(inputUsernameMobile, userNameBoxMobile);
    });
});