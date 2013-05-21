
test/built.js: index.js test/*
	@node_modules/.bin/sourcegraph.js test/browser.js \
		--plugins mocha,nodeish \
		| node_modules/.bin/bigfile \
		 	--export null \
		 	--plugins nodeish > $@

install:
	npm install
