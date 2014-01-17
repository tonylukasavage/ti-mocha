var C = require('./constants'),
	fs = require('fs'),
	path = require('path'),
	wrench = require('wrench');

function build() {

	// read the mocha template
	var content = fs.readFileSync(C.TEMPLATE_FILE, 'utf8');

	// generate ti-mocha.js by adding the mocha.js.template
	var index = content.search(/\}\)\(\);$/g);
	if (index !== -1) {
		var srcs = [];

		// get all the reporters
		wrench.readdirSyncRecursive(C.REPORTERS_DIR).forEach(function(reporter) {
			srcs.push(fs.readFileSync(path.join(C.REPORTERS_DIR, reporter), 'utf8'));
		});

		// get the titanium-specific code
		srcs.push(fs.readFileSync(C.UTIL_FILE, 'utf8'));
		srcs.push(fs.readFileSync(C.TITANIUM_FILE, 'utf8'));

		// add it to the end of the inner function containing mocha
		content = content.slice(0, index) + srcs.join('\n') + content.slice(index);
	} else {
		throw new Error('Failed to find insertion point for titanium code in ' + C.TEMPLATE_FILE);
	}

	// write out the new file
	wrench.mkdirSyncRecursive(C.BUILD_DIR, 0755);
	fs.writeFileSync(C.BUILD_FILE, fs.readFileSync(C.LICENSE_FILE, 'utf8') + fs.readFileSync(C.MOCHA_LICENSE_FILE, 'utf8') + content);
}
module.exports = build;
