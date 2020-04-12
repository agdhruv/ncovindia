<?php 

include('utilfuncs.php');

// load metadatafile
$languageMetadata = loadJSONFile('assets/languages/metadata.txt');
// get what is the current language
$language = getLanguageInput();

// if unsupported language, go to english
if (!isSupportedLanguage($languageMetadata, $language)) {
	header('Location: /?language=english');
}

// read files for this language
$filePath = sprintf('assets/languages/%s/misc.txt', $language);
$miscTranslations = loadJSONFile($filePath);

// read english misc file for backup
$miscEnglishTranslations = loadJSONFile('assets/languages/english/misc.txt');

$filePath = sprintf('assets/languages/%s/nav.txt', $language);
$navTranslations = loadJSONFile($filePath);

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>
		Novel Coronavirus Knowledgebase
	</title>
	<link rel="icon" href="assets/img/favicon.png" type="image/png">

	<!-- Primary Meta Tags -->
<meta name="description" content="Latest numbers, common questions, and detailed graphs about COVID-19. We are translating into more and more Indian languages! This is an effort to fight misinformation surrounding COVID-19.">
<meta name="keywords" content="COVID-19, coronavirus, knowledgebase, frequently asked questions, common questions, advice, graphs, regional languages">
<meta name="robots" content="index, follow">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://ncovindia.com/">
<meta property="og:title" content="Novel Coronavirus Knowledgebase">
<meta property="og:description" content="Latest numbers, common questions, and detailed graphs about COVID-19. We are translating into more and more Indian languages! This is an effort to fight misinformation surrounding COVID-19.">
<meta property="og:image" content="https://ncovindia.com/assets/img/favicon.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://ncovindia.com/">
<meta property="twitter:title" content="Novel Coronavirus Knowledgebase">
<meta property="twitter:description" content="Latest numbers, common questions, and detailed graphs about COVID-19. We are translating into more and more Indian languages! This is an effort to fight misinformation surrounding COVID-19.">
<meta property="twitter:image" content="https://ncovindia.com/assets/img/favicon.png">
	
	<!-- css -->
		<!-- import bootstrap css -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<link rel="stylesheet" href="assets/css/index.css">
	
	<!-- essential js -->
		<!-- import fontawesome -->
	<script src="https://kit.fontawesome.com/631f0a2cf3.js" crossorigin="anonymous"></script>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-161819065-1"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-161819065-1');
	</script>
</head>
<body>
	
	<script id="nav-template" type="text/x-handlebars-template">
	
	
	<a class="navbar-brand" href="">
		{{title.text}}
	</a>

	<div class="collapse navbar-collapse" id="navbarToggler">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item">
				<a class="nav-link" href="{{faqs.href}}">{{faqs.text}}</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="{{advice.href}}">{{advice.text}}</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="{{graphs.href}}">{{graphs.text}}</a>
			</li>
			<!-- <li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="{{more.href}}" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			        {{more.text}}
			    </a>
		        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
					<a class="dropdown-item" href="#">
						Estimates
					</a>
					<a class="dropdown-item" href="#">
						Sources
					</a>
		        </div>
			</li> -->
		</ul>
	</div>

	<form class="form-inline">
		<div class="input-group">
			<div class="input-group-prepend">
				<span class="input-group-text" id="language-select">
					<i class="fas fa-language"></i>
				</span>
	      	</div>
	    	<select class="custom-select" aria-describedby="language-select" id="language-selector">
	    	</select>
	    </div>
	</form>

	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	
</script>

<!-- Navbar -->
<nav class="navbar navbar-expand-md fixed-top navbar-dark" id="nav-container">

	<a class="navbar-brand" href="">
		COVID-19
	</a>

	<div class="collapse navbar-collapse" id="navbarToggler">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item">
				<a class="nav-link" href="#faqs">FAQs</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#advice">Advice</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#graphs">Graphs</a>
			</li>
			<!-- <li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			        More...
			    </a>
		        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
					<a class="dropdown-item" href="#">
						Estimates
					</a>
					<a class="dropdown-item" href="#">
						Sources
					</a>
		        </div>
			</li> -->
		</ul>	
	</div>

	<form class="form-inline">
		<div class="input-group">
			<div class="input-group-prepend">
				<span class="input-group-text" id="language-select">
					<i class="fas fa-language"></i>
				</span>
	      	</div>
	    	<select class="custom-select" aria-describedby="language-select" id="language-selector">
	    	</select>
	    </div>
	</form>

	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
</nav>

	<div class="container-fluid">

		<script id="aboutus-template" type="text/x-handlebars-template">
	
	<div class="col-12">
		<p class="text-center m-0 px-2 px-md-4 text-light mb-4 shout-message">
			{{shoutmessage}}
		</p>
		<p class="text-center m-0 px-2 px-md-4 text-light lead">
			{{{whatisthis}}}
			<a href="https://twitter.com/ncovindia" target="_blank">
				<i class="fab fa-twitter" style="color: #00acee;"></i>
			</a>
		</p>
		<p class="text-center mx-0 mt-4 mb-0">
			<iframe src="globe/globe.html" frameborder="0" height="300px" width="100%"></iframe>
		</p>
		
		<p class="text-center text-light mb-4">
			<small>
				{{{disclaimer}}}
			</small>
		</p>
	</div>

	<div class="col-12">
		<div class="row" id="ticker-container">
		</div>
	</div>
	
</script>

<script id="ticker-template" type="text/x-handlebars-template">
	
	
	<div class="col-12 col-sm-5 offset-sm-1 col-md-4 offset-md-2 mb-3 mb-sm-0">
		<div class="card border-danger" id="ticker-india">
			<div class="card-header">
				{{translations.india}} {{translations.cases}} <sup><a href="https://www.mohfw.gov.in/">{{translations.source}}</a></sup>
			</div>
			<div class="card-body">
				<div class="row no-gutters">
					<div class="col col-ticker yesterday">
						<div class="ticker-number cases">
							{{tickerData.india.cases.yesterday}}
						</div>
						<div class="ticker-day">
							{{translations.yesterday}}
						</div>
						<div class="ticker-number deaths">
							{{tickerData.india.deaths.yesterday}}
						</div>
					</div>
					<div class="col-5 col-ticker today">
						<div class="ticker-number cases">
							{{tickerData.india.cases.today}}
							{{setVar "value" tickerData.india.cases.percentageIncrease}}
							<small class="ticker-percentage-increase" style="color: {{tickerPercentageColor value}};">
								<span class="arrow">{{{tickerPercentageArrow value}}}</span>
								{{value}}%
							</small>
						</div>
						<div class="ticker-day">
							{{translations.today}}
						</div>
						<div class="ticker-number deaths">
							{{tickerData.india.deaths.today}}
							{{setVar "value" tickerData.india.deaths.percentageIncrease}}
							<small class="ticker-percentage-increase" style="color: {{tickerPercentageColor value}};">
								<span class="arrow">{{{tickerPercentageArrow value}}}</span>
								{{value}}%
							</small>
						</div>
					</div>
					<div class="col col-ticker unverified">
						<div class="ticker-number cases">
							{{tickerData.india.cases.unverified}}
						</div>
						<div class="ticker-day">
							{{translations.unverified}}
						</div>
						<div class="ticker-number deaths">
							{{tickerData.india.deaths.unverified}}
						</div>
					</div>
				</div>
			</div>
			<div class="card-header">
				{{translations.india}} {{translations.deaths}}
			</div>
		</div>
	</div>

	<div class="col-12 col-sm-5 col-md-4">
		<div class="card border-danger" id="ticker-world">
			<div class="card-header">
				{{translations.world}} {{translations.cases}} <sup><a href="https://coronavirus.jhu.edu/">{{translations.source}}</a></sup>
			</div>
			<div class="card-body">
				<div class="row no-gutters">
					<div class="col col-ticker yesterday">
						<div class="ticker-number cases">
							{{tickerData.world.cases.yesterday}}
						</div>
						<div class="ticker-day">
							{{translations.yesterday}}
						</div>
						<div class="ticker-number deaths">
							{{tickerData.world.deaths.yesterday}}
						</div>
					</div>
					<div class="col-5 col-ticker today">
						<div class="ticker-number cases">
							{{tickerData.world.cases.today}}
							{{setVar "value" tickerData.world.cases.percentageIncrease}}
							<!-- <small class="ticker-percentage-increase" style="color: {{tickerPercentageColor value}};">
								<span class="arrow">{{{tickerPercentageArrow value}}}</span>
								{{value}}%
							</small> -->
						</div>
						<div class="ticker-day">
							{{translations.today}}
						</div>
						<div class="ticker-number deaths">
							{{tickerData.world.deaths.today}}
							{{setVar "value" tickerData.world.deaths.percentageIncrease}}
							<!-- <small class="ticker-percentage-increase" style="color: {{tickerPercentageColor value}};">
								<span class="arrow">{{{tickerPercentageArrow value}}}</span>
								{{value}}%
							</small> -->
						</div>
					</div>
					<div class="col col-ticker unverified">
						<div class="ticker-number cases">
							{{tickerData.world.cases.unverified}}
						</div>
						<div class="ticker-day">
							{{translations.unverified}}
						</div>
						<div class="ticker-number deaths">
							{{tickerData.world.deaths.unverified}}
						</div>
					</div>
				</div>
			</div>
			<div class="card-header">
				{{translations.world}} {{translations.deaths}}
			</div>
		</div>
	</div>

	
</script>

<section class="row index-section about-us">

</section>

		<section class="row index-section faqs">
			<div class="col-12 mb-4">
				<h1 class="display-6 my-sec-heading">
					<?php
					$value = $navTranslations['faqs']['fullform'];
					echo ($value) ? $value : "Frequently Asked Questions";
					 ?>
				</h1>
			</div>
			
			<div class="col-12 col-md-8 offset-md-2 mb-4">
				<input class="form-control" type="text" placeholder="Search" id="faq-search-bar">
			</div>

			<div class="col-12 col-md-8 offset-md-2">
				<script id="faqs-template" type="text/x-handlebars-template">
	
	{{#each this}}
	{{#if startHiding}}
		<div class="accordion collapse" id="collapse-faqs">
	{{/if}}
	<div class="card" id="card-container{{@index}}">
		<div class="card-header" id="heading{{@index}}">
	  		<h2 class="mb-0">
				<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse{{@index}}" aria-expanded="true" aria-controls="collapse{{@index}}">
		  			{{{question}}}
				</button>
	  		</h2>
		</div>
		<div id="collapse{{@index}}" class="collapse" aria-labelledby="heading{{@index}}" data-parent="#faq-accordion">
	  		<div class="card-body">
				{{{answer}}}
				<p>
					{{#if sources.length}}
					Sources: 
					{{#each sources}}
						<a href='{{this}}'>{{this}}</a>{{~#if @last~}}{{~else~}}, {{/if}}
					{{/each}}
					{{/if}}
				</p>
	  		</div>
		</div>
  	</div>
  	{{#if endHiding}}
		</div>
	{{/if}}
  	{{/each}}
	
</script>

<div class="accordion" id="faq-accordion">
</div>
			</div>

			<div class="col-12 col-md-8 offset-md-2 mt-4 text-center">
				<button class="btn btn-primary btn-lg faq-seeall-btn" type="button" data-toggle="collapse" data-target="#collapse-faqs" aria-expanded="false" aria-controls="collapse-faqs">
					<?php
					$value = $miscTranslations['showall'];
					$elseValue = $miscEnglishTranslations['showall'];
					echo ($value) ? $value : $elseValue;
					 ?>
				</button>
			</div>

			
		</section>

		<section class="row index-section advice">
			<div class="col-12 mb-4">
				<h1 class="display-6 my-sec-heading text-white">
					<?php
					$value = $navTranslations['advice']['text'];
					echo ($value) ? $value : "Advice";
					 ?>
				</h1>
			</div>

			<script id="advice-template" type="text/x-handlebars-template">
	

	<div class="col-12 col-md-3">
		<div class="list-group" id="advice-list" role="tablist">
		{{#each this}}
			<a class="list-group-item list-group-item-action {{#if @first}}active{{/if}}" id="list-{{sectionID}}-list" data-toggle="list" href="#list-{{sectionID}}" role="tab" aria-controls="{{sectionID}}">
				{{this.sectionName}}
			</a>
	  	{{/each}}
		</div>
	</div>

	<div class="col-12 col-md-9">
	  	<div class="tab-content bg-white p-4" id="advice-tabContent">
			
			{{#each this}}
			<div class="tab-pane fade {{#if @first}}show active{{/if}}" id="list-{{sectionID}}" role="tabpanel" aria-labelledby="list-
			{{sectionID}}-list">
	    		{{{writeup}}}
	    		<p class="text-wrap text-truncate">
					{{#if sources.length}}
					Sources: 
					{{#each sources}}
						<a href='{{this}}'>{{this}}</a>{{~#if @last~}}{{~else~}}, {{/if}}
					{{/each}}
					{{/if}}
				</p>
	    	</div>
	    	{{/each}}
		</div>
	</div>

	
</script>

<div class="col-12">
	<div class="row" id="advice-container">
		<div class="col-12 col-md-3">
			<div class="list-group" id="advice-list" role="tablist">
				<a class="list-group-item list-group-item-action active" id="list-symptoms-list" data-toggle="list" href="#list-symptoms" role="tab" aria-controls="symptoms">
					Symptoms
				</a>
				<a class="list-group-item list-group-item-action" id="list-adveveryone-list" data-toggle="list" href="#list-adveveryone" role="tab" aria-controls="adveveryone">
					Advice for Everyone
				</a>
				<a class="list-group-item list-group-item-action" id="list-advsick-list" data-toggle="list" href="#list-advsick" role="tab" aria-controls="advsick">
					If you are sick
				</a>
				<a class="list-group-item list-group-item-action" id="list-exposed-list" data-toggle="list" href="#list-exposed" role="tab" aria-controls="exposed">
					If you were exposed
				</a>
			</div>
		</div>

		<div class="col-12 col-md-9">
		  	<div class="tab-content bg-white p-4" id="advice-tabContent">
				<div class="tab-pane fade show active" id="list-symptoms" role="tabpanel" aria-labelledby="list-symptoms-list">
		    		<p>Fever, a dry cough, fatigue, and difficulty breathing or shortness of breath. Sneezing is usually relatively mild/rare.</p>
<p>The symptoms take 2-14 days to show up.</p>
<p>These symptoms are usually mild. Some don't develop any symptoms; about 80% recover from the disease without needing treatment.</p>
<p>Around 1 in 6 become seriously ill and develop difficulty breathing. Older people, and those with underlying medical problems like high blood pressure, heart problems, or diabetes, are more susceptible.</p>
		    	</div>
		    	<div class="tab-pane fade" id="list-adveveryone" role="tabpanel" aria-labelledby="list-adveveryone-list">
		    		You should:
<ul>
	<li>Stay home when you are sick.</li>
	<li>Wash your hands often with soap and water for at least 20 seconds, especially before you eat.</li>
	<li>Cover your cough and sneezes with a tissue and discard in a closed container.</li>
	<li>Clean frequently touched surfaces and objects.</li>
	<li>Avoid close contact with people who are sick. Keep a distance of at least 6 feet to help slow the spread of COVID-19.</li>
	<li>Avoid unnecessary travel.</li>
</ul>

Keep informed and follow the advice of the local authorities, including any restrictions put in place on travel and gatherings. See <a href="https://www.mohfw.gov.in" target="_blank">https://www.mohfw.gov.in</a>.
		    	</div>
		    	<div class="tab-pane fade" id="list-advsick" role="tabpanel" aria-labelledby="list-advsick-list">
			    	You should:
<ul>
	<li>Stay home.</li>
	<li>If you have a fever, stay home for at least 24 hours after your fever is gone without the use of fever-reducing medicines, such as acetaminophen.</li>
	<li>Keep sick household members away from others. If you have a separate room that is best.</li>
	<li>Avoid sharing personal items.</li>
</ul>
		    	</div>
		    	<div class="tab-pane fade" id="list-exposed" role="tabpanel" aria-labelledby="list-exposed-list">
			    	<li>If you think you have been exposed to COVID-19 and develop a fever and symptoms, such as cough or difficulty breathing, call your healthcare provider for medical advice.</li>
<li>Even if you don’t experience the typical symptoms, observe a self-quarantine for 14 days (the incubation period for the virus)</li>

		    	</div>
			</div>
		</div>
	</div>
</div>
		</section>

		<section class="row index-section graphs">
			<div class="col-12 mb-4">
				<h1 class="display-6 my-sec-heading">
					<?php
					$value = $navTranslations['graphs']['text'];
					echo ($value) ? $value : "Graphs";
					 ?>
				</h1>
			</div>

			<!-- <div class="col-12 col-md-8 offset-md-2 mb-4">
				<div class="graph-overlay"></div>

<h4 class="text-center">
    <?php
        $value = $miscTranslations['graphs']['archit']['heading'];
        $elseValue = $miscEnglishTranslations['graphs']['archit']['heading'];
        echo ($value) ? $value : $elseValue;
    ?> <sup><a href="https://ourworldindata.org/coronavirus-source-data">
        <?php
        $value = $miscTranslations['source'];
        $elseValue = $miscEnglishTranslations['source'];
        echo ($value) ? $value : $elseValue;
         ?>
    </a></sup>
</h4>

<div class='tableauPlaceholder' id='viz1585076590223' style='position: relative'>
    <noscript>
        <a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;K_&#47;K_Graph&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a>
    </noscript>
    <object class='tableauViz' style='display:none;'>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='site_root' value='' />
        <param name='name' value='K_Graph&#47;Dashboard1' />
        <param name='tabs' value='no' />
        <param name='toolbar' value='yes' />
        <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;K_&#47;K_Graph&#47;Dashboard1&#47;1.png' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
    </object>
</div>
<script type='text/javascript'>
    var divElement = document.getElementById('viz1585076590223');
    var vizElement = divElement.getElementsByTagName('object')[0];
    if (divElement.offsetWidth > 800) {
        vizElement.style.width = '100%';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } else if (divElement.offsetWidth > 500) {
        vizElement.style.width = '100%';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } else {
        vizElement.style.width = '100%';
        vizElement.style.height = '727px';
    }
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
</script>
			</div> -->
			<div class="col-12 col-md-10 offset-md-1 mb-4">
				<h4 class="text-center">
    <?php
        $value = $miscTranslations['graphs']['archit']['heading'];
        $elseValue = $miscEnglishTranslations['graphs']['archit']['heading'];
        echo ($value) ? $value : $elseValue;
    ?> <sup><a href="https://ourworldindata.org/coronavirus-source-data">
        <?php
        $value = $miscTranslations['source'];
        $elseValue = $miscEnglishTranslations['source'];
        echo ($value) ? $value : $elseValue;
         ?>
    </a></sup>
</h4>

<div class="d3-graph-container">
    <div id="graph_d3_greater_60" class="d3-graph">
    </div>
    <div id="graph_d3_greater_60-checkboxes"></div>
</div>
			</div>
			<div class="col-12 col-md-10 offset-md-1 mb-4">
				<div class="row no-gutters">
	
	<div class="col-6 pr-1">
		<div class="d3-graph-container">
			<select id="graph_d3_dropdown_country1_select_button" class="custom-select d3_country_dropdown"></select>
		    <div id="graph_d3_dropdown_country1" class="d3-graph">
		    </div>
		</div>
	</div>
	<div class="col-6 pl-1">
		<div class="d3-graph-container">
			<select id="graph_d3_dropdown_country2_select_button" class="custom-select d3_country_dropdown"></select>
		    <div id="graph_d3_dropdown_country2" class="d3-graph">
		    </div>
		</div>
	</div>

</div>

			</div>
			<div class="col-12 col-md-10 offset-md-1 mb-4">
				<h4 class="text-center">
    <?php
        $value = $miscTranslations['graphs']['doubling']['heading'];
        $elseValue = $miscEnglishTranslations['graphs']['doubling']['heading'];
        echo ($value) ? $value : $elseValue;
    ?> <sup><a href="https://ourworldindata.org/coronavirus-source-data">
        <?php
        $value = $miscTranslations['source'];
        $elseValue = $miscEnglishTranslations['source'];
        echo ($value) ? $value : $elseValue;
         ?>
    </a></sup>
</h4>

<div class="d3-graph-container">
    <div id="graph_d3_doubling_days" class="d3-graph">
    </div>
    <div id="graph_d3_doubling_days-checkboxes"></div>
</div>
			</div>
			<!-- <div class="col-12 col-md-8 offset-md-2 mb-4">
				<div class="graph-overlay"></div>

<h4 class="text-center">
    <?php
        $value = $miscTranslations['graphs']['aastha']['heading'];
        $elseValue = $miscEnglishTranslations['graphs']['aastha']['heading'];
        echo ($value) ? $value : $elseValue;
    ?> <sup><a href="https://www.worldometers.info/coronavirus/">
        <?php
        $value = $miscTranslations['source'];
        $elseValue = $miscEnglishTranslations['source'];
        echo ($value) ? $value : $elseValue;
         ?>
    </a></sup>
</h4>

<div class='tableauPlaceholder' id='viz1585658580412' style='position: relative'>
    <noscript>
        <a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ne&#47;new_map_15855755894370&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a>
    </noscript>
    <object class='tableauViz' style='display:none;'>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='site_root' value='' />
        <param name='name' value='new_map_15855755894370&#47;Dashboard1' />
        <param name='tabs' value='no' />
        <param name='toolbar' value='yes' />
        <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ne&#47;new_map_15855755894370&#47;Dashboard1&#47;1.png' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='filter' value='publish=yes' />
    </object>
</div>
<script type='text/javascript'>
    var divElement = document.getElementById('viz1585658580412');
    var vizElement = divElement.getElementsByTagName('object')[0];
    if (divElement.offsetWidth > 800) {
        vizElement.style.width = '100%';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } else if (divElement.offsetWidth > 500) {
        vizElement.style.width = '100%';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } else {
        vizElement.style.width = '100%';
        vizElement.style.height = '727px';
    }
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
</script>
			</div>
			<div class="col-12 col-md-8 offset-md-2">
				<div class="graph-overlay"></div>

<h4 class="text-center">
    <?php
        $value = $miscTranslations['graphs']['doubling']['heading'];
        $elseValue = $miscEnglishTranslations['graphs']['doubling']['heading'];
        echo ($value) ? $value : $elseValue;
    ?> <sup><a href="https://ourworldindata.org/coronavirus-source-data">
        <?php
        $value = $miscTranslations['source'];
        $elseValue = $miscEnglishTranslations['source'];
        echo ($value) ? $value : $elseValue;
         ?>
    </a></sup>
</h4>

<div class='tableauPlaceholder' id='viz1585658448296' style='position: relative'>
    <noscript>
        <a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Bo&#47;Book2_15854996580350&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a>
    </noscript>
    <object class='tableauViz' style='display:none;'>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='site_root' value='' />
        <param name='name' value='Book2_15854996580350&#47;Dashboard1' />
        <param name='tabs' value='no' />
        <param name='toolbar' value='yes' />
        <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Bo&#47;Book2_15854996580350&#47;Dashboard1&#47;1.png' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='filter' value='publish=yes' />
    </object>
</div>
<script type='text/javascript'>
    var divElement = document.getElementById('viz1585658448296');
    var vizElement = divElement.getElementsByTagName('object')[0];
    if (divElement.offsetWidth > 800) {
        vizElement.style.width = '100%';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } else if (divElement.offsetWidth > 500) {
        vizElement.style.width = '100%';
        vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px';
    } else {
        vizElement.style.width = '100%';
        vizElement.style.height = '727px';
    }
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
</script>
			</div> -->

		</section>
		
		<footer class="row">
	<div class="col-12">
		<p class="text-center text-light py-4 px-2 px-md-4 m-0">
			<?php
				$value = $miscTranslations['contactus'];
				$elseValue = $miscEnglishTranslations['contactus'];
				echo ($value) ? $value : $elseValue;
			 ?>: <a href="mailto:contact@ncovindia.com" class="text-warning">contact@ncovindia.com</a><br>
			<a href="assets/data/suggested_citation.txt" target="_blank" class="text-warning">
				<?php
					$value = $miscTranslations['citeus'];
					$elseValue = $miscEnglishTranslations['citeus'];
					echo ($value) ? $value : $elseValue;
				 ?>!
			</a> | <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" class="text-warning">CC-BY</a> 
		</p>
	</div>
</footer>

	</div>
	
	<!-- rest of js -->
		<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.3/handlebars.min.js"></script>
	<script src="https://d3js.org/d3.v5.min.js"></script>
	<script src="assets/js/index.js"></script>
	<script src="assets/js/initgraphs.js"></script>
</body>
</html>