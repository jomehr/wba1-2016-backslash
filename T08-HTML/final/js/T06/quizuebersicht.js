	/* Zur Initialisierung von zusätzlichen Schaltflächen
	   in Slideshows
	============================================================*/
	var slideshowNavi = {
		_slideShows: null,
		init: function (selector) {


			this._slideShows = selector;
			if (this._slideShows) {

				//Fuer Fullscreen Slider: Schaltflächen zum Vor- und Zurueckblaettern der Bilder neben den Punkten einfuegen
				this._slideShows.find('.flickity-page-dots')
					.prepend('<li class="button-item"><button class="button js-button-previous" type="button" aria-label="previous"><i class="ico-light-arrow-left"></i></button></li>');
				this._slideShows.find('.flickity-page-dots')
					.append('<li class="button-item"><button class="button js-button-next" type="button" aria-label="next"><i class="ico-light-arrow-right"></i></button></li>');

				//Eventlistener fuer die Schaltflaechen zum Vor- und Zurueckblaettern hinzufuegen
				this._slideShows.find('.flickity-page-dots .js-button-previous').off('click').on('click', function (event) {
					$(event.target).closest('.js-carousel').flickity('previous');
				});

				this._slideShows.find('.flickity-page-dots .js-button-next').off('click').on('click', function (event) {
					$(event.target).closest('.js-carousel').flickity('next');
				});

			}
		}
	}
