document.getElementsByTagName("BODY")[0].onresize = function() {moveScoreText()};
document.getElementsByTagName("BODY")[0].onload = function() {moveScoreText()};

function moveScoreText() {
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
	var scoreTxt =  document.querySelectorAll(".ss_score_txt p");
	var scoreTxtMobile = document.querySelectorAll(".ss_score p");
	if(x <= 992) {
		if(scoreTxt[0].innerHTML != "") {
			scoreTxtMobile[0].innerHTML = scoreTxt[0].innerHTML;
			scoreTxtMobile[1].innerHTML = scoreTxt[1].innerHTML;
			scoreTxt[0].innerHTML = "";
			scoreTxt[1].innerHTML = "";
		}
	}
	else if(x > 992) {
		if(scoreTxtMobile[0].innerHTML != "") {
			scoreTxt[0].innerHTML = scoreTxtMobile[0].innerHTML;
			scoreTxt[1].innerHTML = scoreTxtMobile[1].innerHTML;
			scoreTxtMobile[0].innerHTML = "";
			scoreTxtMobile[1].innerHTML = "";
		}
	}
}