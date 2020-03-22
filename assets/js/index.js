var CURRENT_LANGUAGE = 'english';
var LANGUAGES_METADATA;

var getUrlParameter = function getUrlParameter(sParam) {
	// https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var smoothScroll = function () {
	// when a navbar link is clicked, scroll to it
	$(document).on('click', "nav.navbar li a.nav-link:not(.dropdown-toggle)", function (e) {
		e.preventDefault();

		var $this = $(this),
			navHeight = $this.outerHeight(),
			scrollToElemSelector = 'section.index-section.' + $this.attr('href').substr(1),
			$scrollToElem = $(scrollToElemSelector);

		$("html, body").animate({
			scrollTop: $scrollToElem.offset().top - navHeight - parseInt($scrollToElem.css('padding-top'))
		}, 200);
	});
};

var faqSearch = function () {
	// source: https://codepen.io/Devikar/pen/oaYEMw
	// and then edited a little
	var searchTerm, cardContainerId;

	// Create a new contains that is case insensitive
	$.expr[':'].containsCaseInsensitive = function (n, i, m) {
		return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};
  
  	$('#faq-search-bar').on('change keyup paste click', function () {
    	searchTerm = $(this).val();
    	$('#faq-accordion div.card').each(function () {
      		cardContainerId = '#' + $(this).attr('id');
      		$(cardContainerId + ':not(:containsCaseInsensitive(' + searchTerm + '))').hide();
      		$(cardContainerId + ':containsCaseInsensitive(' + searchTerm + ')').show();
    	});
  	});
};

var setCurrentLanguage = function (data) {
	var supportedLanguages = data.supported,
		$languageSelector = $("#language-selector"),
		language = getUrlParameter('language');

	if (language) {
		language = language.toLowerCase();
	}

	// if the value was an unsupported language
	// or if there was no "language" parameter at all
	if (!supportedLanguages.includes(language)) {
		location.search = '?language=english';
		return;
	}

	// reaching here means we have some supported language for sure
	CURRENT_LANGUAGE = language;
};

var simpleEventHandlers = function () {

	// remove graph overlay on click
	$(".graph-overlay").on('click', function() {
		$(this).hide();
	});

	// toggle value of faq "See All button"
	$(".faq-seeall-btn").click(function () {
		var $this = $(this);
		var value = ($this.text() == "Show All") ? "Show Less" : "Show All";
		$this.text(value);
	});
};

var updateLanguageOptions = function () {
	var $languageSelector = $("#language-selector"),
		supportedLanguages = LANGUAGES_METADATA.supported;

	// set up the language choices available in the select menu on the top right of the page
	supportedLanguages.forEach(function (value, i) {
		var text = value[0].toUpperCase() + value.substring(1); // capitalize first letter
		$languageSelector.append(`<option value="${value}">${text}</option>`);
	});

	// set value of the selector
	$languageSelector.val(CURRENT_LANGUAGE);

	// set up handler on the selection menu to load new page upon change
	$languageSelector.on('change', function () {
		location.search = '?language=' + $(this).val();
		return;
	});

};

var displayFile = function (language, fileIdentifier, containerSelector, callback) {
	// loads assets/languages/<language>/<fileIdentifier>.txt
	// loads template in #<fileIdentifier>-template
	// displays HTML is #<containerSelector>
	$.getJSON(`assets/languages/${language}/${fileIdentifier}.txt`, function(data) {
		var source = $(`#${fileIdentifier}-template`).html();
		var template = Handlebars.compile(source);

		// file specific changes to object
		if (fileIdentifier === 'faqs') {
			// sort by "importance"
			data = data.sort(function (a, b) {
				var key1 = a.importance;
				var key2 = b.importance;

				if (key1 < key2) return -1;
				else if (key2 < key1) return 1;
				else return 0;
			});
			// insert a another parameter into the 10th item
			// called "startHiding: true" for Handlebars
			data[9].startHiding = true;
			data[data.length - 1].endHiding = true;
		}

		var theCompiledHtml = template(data);
		$(`${containerSelector}`).html(theCompiledHtml);
		if (callback) {
			callback();
		}
	});
};

var displayContent = function (CURRENT_LANGUAGE) {
	
	// nav is loaded by default in english
	// hence, we need to load this only if the language is anything else
	if (CURRENT_LANGUAGE !== 'english') {
		displayFile(CURRENT_LANGUAGE, 'nav', '#nav-container', updateLanguageOptions);
	}
	
	// FAQs and advice need to be loaded from the file even in English
	// (cuz there are too many lol)
	displayFile(CURRENT_LANGUAGE, 'advice', '#advice-container');
	displayFile(CURRENT_LANGUAGE, 'faqs', '#faq-accordion');
};

$(document).ready(function () {
	// handle the language selection
	$.getJSON('assets/languages/metadata.txt', function(data) {
		LANGUAGES_METADATA = data;
		
		// set the CURRENT_LANGUAGE global
		setCurrentLanguage(data);
		// for english, we update the language options here itself
		// for other languages, we first (re)load the nav, and then
		// update the language options (in displayContent())
		if (CURRENT_LANGUAGE == 'english') {
			updateLanguageOptions();
		}

		// one the language has been set, display everything
		displayContent(CURRENT_LANGUAGE);
	});

	// ### these are the things that are language independent ###
	
	// simple event handlers on different elements
	simpleEventHandlers();

	// smooth scroll for nav
	smoothScroll();

	// search function for the faqs
	faqSearch();
});

