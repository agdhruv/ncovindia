<?php 

function getLanguageInput() {
	$url = $_SERVER['REQUEST_URI'];
	$parts = parse_url($url);
	parse_str($parts['query'], $query);

	if (array_key_exists('language', $query)) {
		return $query['language'];
	}
	// if there is no language parameter return false
	return false;
}

function loadJSONFile($filePath) {
	$str = file_get_contents($filePath);
	$json = json_decode($str, true);
	
	return $json;
}


function isSupportedLanguage($languageMetadata, $language) {
	$supportedLanguages = $languageMetadata["supported"];
	if ($language) {
		$language = strtolower($language);
	}

	if (in_array($language, $supportedLanguages)) {
		return true;
	}

	return false;
}


 ?>