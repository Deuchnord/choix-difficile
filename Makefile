node_modules:
	npm install

# Use this to install on production environment.
install: node_modules
	cp node_modules/jquery/dist/jquery.min.js src/jquery.js

# Use this to install on development environment.
install-dev: node_modules
	ln node_modules/jquery/dist/jquery.js src/jquery.js

clean:
	rm -rf node_modules
	rm -f src/jquery.js
