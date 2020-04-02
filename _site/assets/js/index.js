// ##### Handlebars helpers #####

Handlebars.registerHelper("setVar", function(varName, varValue, options) {
	options.data.root[varName] = varValue;
});

Handlebars.registerHelper('tickerPercentageArrow', function (percentage) {
	if (percentage < 0) {
		return "&#x25BC;";
	} else if (percentage > 0) {
		return "&#x25B2;";
	} else {
		return "-";
	}
});

Handlebars.registerHelper('tickerPercentageColor', function (percentage) {
	if (percentage < 0) {
		return "green";
	} else if (percentage > 0) {
		return "rgba(255,255,255,0.7);";
	} else {
		return "";
	}
});

// ##### Handlebars helpers #####

var CURRENT_LANGUAGE = 'english';
var LANGUAGES_METADATA;
var MISC_TRANSLATIONS;

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
			navHeight = 56,
			scrollToElemSelector = 'section.index-section.' + $this.attr('href').substr(1),
			$scrollToElem = $(scrollToElemSelector);

		$("html, body").animate({
			scrollTop: Math.ceil($scrollToElem.offset().top - navHeight)
		}, 200);

		// if the click on the link was in on mobile,
		// we need to detect that and collapse the menu
		$this.closest('div.navbar-collapse.collapse.show').toggleClass('show');
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
  
  	$('#faq-search-bar').on('change keyup paste', function () {
    	
    	searchTerm = $(this).val();
    	var $seeAllButton = $('.faq-seeall-btn');

    	// if searchterm is empty and FAQs are expanded, collapse them
    	if (!searchTerm && $seeAllButton.text() == 'Show Less') {
    		$('.faq-seeall-btn').click();
    	}

    	// if all FAQs are collapsed, show all, and then run the search
    	if(searchTerm && $seeAllButton.text() == "Show All") {
    		$('.faq-seeall-btn').click();
    	}
    	
    	$('#faq-accordion div.card').each(function () {
      		cardContainerId = '#' + $(this).attr('id');
      		$(cardContainerId + ':not(:containsCaseInsensitive(' + searchTerm + '))').hide();
      		$(cardContainerId + ':containsCaseInsensitive(' + searchTerm + ')').show();
    	});
  	});
};

var setCurrentLanguage = function (data) {
	var supportedLanguages = data.supported,
		language = getUrlParameter('language');

	if (language) {
		language = language.toLowerCase();
	}

	// ### this will not happen anymore as being handled by PHP now.
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

var displayFile = function (language, fileIdentifier, templateIdentifier, containerSelector, callback) {
	// loads assets/languages/<language>/<fileIdentifier>.txt
	// loads template in #<templateIdentifier>-template
	// displays HTML is #<containerSelector>
	$.getJSON(`assets/languages/${language}/${fileIdentifier}.txt`, function(data) {
		var source = $(`#${templateIdentifier}-template`).html();
		var template = Handlebars.compile(source);

		if (fileIdentifier === 'misc') {
			if (!MISC_TRANSLATIONS) {
				MISC_TRANSLATIONS = data;
			}
		}

		// file specific changes to object
		if (templateIdentifier === 'faqs') {
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
			data[10].startHiding = true;
			data[data.length - 1].endHiding = true;
		}

		var theCompiledHtml = template(data);
		$(`${containerSelector}`).html(theCompiledHtml);
		if (callback) {
			callback();
		}
	});
};

var displayTickerData = function () {
	if (!MISC_TRANSLATIONS) throw new Error("Misc translations not available");

	$.getJSON('assets/data/ticker.json', function (tickerData) {

		// calculate increase percentage of deaths and cases
		// india
		tickerData.india.cases.percentageIncrease = parseInt((tickerData.india.cases.today/tickerData.india.cases.yesterday - 1) * 100);
		tickerData.india.deaths.percentageIncrease = parseInt((tickerData.india.deaths.today/tickerData.india.deaths.yesterday - 1) * 100);
		// world
		tickerData.world.cases.percentageIncrease = parseInt((tickerData.world.cases.today/tickerData.world.cases.yesterday - 1) * 100);
		tickerData.world.deaths.percentageIncrease = parseInt((tickerData.world.deaths.today/tickerData.world.deaths.yesterday - 1) * 100);

		var mergedData = {
			translations: MISC_TRANSLATIONS,
			tickerData: tickerData
		};
		var source = $('#ticker-template').html();
		var template = Handlebars.compile(source);
		var theCompiledHtml = template(mergedData);
		$(`#ticker-container`).html(theCompiledHtml);
	});
};

var displayContent = function (CURRENT_LANGUAGE) {
	
	// nav is loaded by default in english
	// hence, we need to load this only if the language is anything else
	if (CURRENT_LANGUAGE !== 'english') {
		displayFile(CURRENT_LANGUAGE, 'nav', 'nav', '#nav-container', updateLanguageOptions);
	}
	
	// FAQs and advice need to be loaded from the file even in English
	// (cuz there are too many lol)
	displayFile(CURRENT_LANGUAGE, 'misc', 'aboutus', 'section.index-section.about-us', displayTickerData);
	displayFile(CURRENT_LANGUAGE, 'advice', 'advice', '#advice-container');
	displayFile(CURRENT_LANGUAGE, 'faqs', 'faqs', '#faq-accordion');
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

