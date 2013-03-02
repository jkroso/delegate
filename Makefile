
test/built.js: index.js test/*
	@node_modules/.bin/sourcegraph.js test/browser.js \
		--plugins mocha,nodeish,javascript \
		| node_modules/.bin/bigfile \
		 	--export null \
		 	--plugins nodeish,javascript > test/built.js
		 	