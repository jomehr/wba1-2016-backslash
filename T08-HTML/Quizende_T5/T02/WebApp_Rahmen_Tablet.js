var id = 0;

function openNav() {
    if (id == 0) {
        document.getElementById("wa_Sidenav_mobil").style.width = "264px";
        id = 1;
    }
    else closeNav();
}

function closeNav() {
    document.getElementById("wa_Sidenav_mobil").style.width = "0";
    id = 0;
}