---

---
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

	{% include metatags.html %}
	
	<!-- css -->
	{% include imports/bootstrap_css.html %}
	<link rel="stylesheet" href="assets/css/index.css">
	
	<!-- essential js -->
	{% include imports/fontawesome.html %}
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
	
	{% include navbar.html %}

	<div class="container-fluid">

		{% include aboutus.html %}

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
				{% include faqs.html %}
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

			{% include advice.html %}
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
				{% include graphs/archit.html %}
			</div> -->
			<div class="col-12 col-md-10 offset-md-1 mb-4">
				{% include graphs/d3_greater_60.html %}
			</div>
			<div class="col-12 col-md-10 offset-md-1 mb-4">
				{% include graphs/d3_world_total_cases.html %}
			</div>

			<div class="col-12 col-md-10 offset-md-1 mb-4">
				{% include graphs/d3_doubling_days.html %}
			</div>
			<!-- <div class="col-12 col-md-8 offset-md-2 mb-4">
				{% include graphs/aastha.html %}
			</div>
			<div class="col-12 col-md-8 offset-md-2">
				{% include graphs/doubling.html %}
			</div> -->

		</section>
		
		{% include footer.html %}

	</div>
	
	<!-- rest of js -->
	{% include imports/jquery.html %}
	{% include imports/bootstrap_js.html %}
	{% include imports/handlebars_js.html %}
	{% include imports/d3_js.html %}
	<script src="assets/js/index.js"></script>
	<script src="assets/js/initgraphs.js"></script>
</body>
</html>