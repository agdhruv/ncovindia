var CURRENT_LANGUAGE = 'english';

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
	$("nav.navbar li a.nav-link").on('click', function (e) {
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
    	$('#faq-accordion > div.card').each(function () {
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

	// set up the language choices available in the select menu on the top right of the page
	supportedLanguages.forEach(function (value, i) {
		var text = value[0].toUpperCase() + value.substring(1); // capitalize first letter
		$languageSelector.append(`<option value="${value}">${text}</option>`);
	});

	// if the value was an unsupported language
	// or if there was no "language" parameter at all
	if (!supportedLanguages.includes(language)) {
		location.search = '?language=english';
		return;
	}

	// reaching here means we have some supported language for sure
	
	// set value of the selector
	$languageSelector.val(language);
	CURRENT_LANGUAGE = language;

	// set up handler on the selection menu to load new page upon change
	$languageSelector.on('change', function () {
		location.search = '?language=' + $(this).val();
		return;
	});
};

var displayFAQs = function (language) {

	$.getJSON(`assets/languages/${language}/faqs.json`, function(faqs) {
		var source = $("#faq-template").html();
		var template = Handlebars.compile(source);

		var theCompiledHtml = template(faqs);
		$("#faq-accordion").html(theCompiledHtml);
	});

};

var simpleEventHandlers = function () {

	// remove graph overlay on click
	$(".graph-overlay").on('click', function() {
		$(this).hide();
	});
};

var displayContent = function (CURRENT_LANGUAGE) {
	// handle displaying of the FAQs
	displayFAQs(CURRENT_LANGUAGE);

	if (CURRENT_LANGUAGE !== 'english') {
		// displayAdvice();
	}


};

$(document).ready(function () {
	// handle the language selection
	$.getJSON('assets/languages/metadata.json', function(data) {
		
		// set the CURRENT_LANGUAGE global
		setCurrentLanguage(data);

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

