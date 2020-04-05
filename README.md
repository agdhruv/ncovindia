# ncovindia

### How to run

Initially, this was a fully client-side website. Hence, I used Jekyll to build it. A static-site generator like Jekyll allowed me to use `include`s etc. without having to use a server-side language like PHP. Whatever content had to be loaded dynamically was done just using AJAX.

Later, there was a need to use some little snippets of PHP here and there (basically, for convenience). Hence, now the site is built in a slightly complicated way.

- Run `jekyll build --watch` in the root directory.
	- Normally, you would run `jekyll serve` and Jekyll would spin up a server on port `4000` where you would see the HTML page that Jekyll build for you. But now, this page has PHP and the server that Jekyll runs cannot execute PHP code.
	- With `jekyll build --watch`, whenever a change is made to the source code, Jekyll will build the site and make it available to us in the `_site` directory (like it usually does).
	- But now, this site has some PHP code, so it needs to be run using a PHP server.
- Run `php -S localhost:9000` on `_site`.
	- This ensures that the PHP code in the site built using Jekyll is executed.
- The site will now be available on `localhost:9000`.