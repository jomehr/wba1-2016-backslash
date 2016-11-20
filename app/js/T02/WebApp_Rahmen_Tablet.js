var id = 0;

function openNav() {
  if (id == 0) {
    document.getElementById("wa_Sidenav_mobil").style.width = "264px";
    id = 1;
  } else closeNav();
}

function closeNav() {
  document.getElementById("wa_Sidenav_mobil").style.width = "0";
  id = 0;
}

document.addEventListener('DOMContentLoaded', function () {
  var loginButton = document.querySelector('.js-login'),
    userNameBox = document.querySelector('.js-username-box'),
    inputUsername = document.querySelector('.js-input-username'),
    saveButton = document.querySelector('.js-save-username'),
    timer = null,
    loginButtonMobile = document.querySelector('.js-login-mobile'),
    userNameBoxMobile = document.querySelector('.js-username-box-mobile'),
    inputUsernameMobile = document.querySelector('.js-input-username-mobile'),
    saveButtonMobile = document.querySelector('.js-save-username-mobile');

  function showUsernameBox(element) {
    //display: block setzen
    element.classList.add('-displayblock');

    //Timer clearen
    clearTimeout(timer);

    //Nach display: Block, Element einblenden
    timer = setTimeout(function () {
      element.classList.add('-active');
    }, 20);

  }

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


  //Blendet Username Box ein
  loginButton.addEventListener('click', function () {

    var username = sessionStorage.getItem('username');
    if (username) {
      inputUsername.value = username;
    }
    showUsernameBox(userNameBox);

  });

  //Speichert Username in Local Storage
  saveButton.addEventListener('click', function () {
    var username = inputUsername.value;
    username = username.trim();

    if (username !== '') {
      sessionStorage.setItem('username', username);

      hideUsernameBox(userNameBox);

    }
  });
  
  
  //Blendet Username Box ein
  loginButtonMobile.addEventListener('click', function () {

    var username = sessionStorage.getItem('username');
    if (username) {
      inputUsernameMobile.value = username;
    }
    showUsernameBox(userNameBoxMobile);
    console.log('test');

  });

  //Speichert Username in Local Storage
  saveButtonMobile.addEventListener('click', function () {
    var username = inputUsernameMobile.value;
    username = username.trim();

    if (username !== '') {
      sessionStorage.setItem('username', username);

      hideUsernameBox(userNameBoxMobile);

    }
  });
  
});









//Polyfill für Trimfunktion
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}