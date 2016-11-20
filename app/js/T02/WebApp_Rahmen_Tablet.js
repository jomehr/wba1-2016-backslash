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