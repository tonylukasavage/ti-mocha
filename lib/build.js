var C = require('./constants'),
	fs = require('fs'),
	template = require('lodash-template'),
	wrench = require('wrench');

function build() {

	// read the template
	var content = fs.readFileSync(C.TEMPLATE_FILE, 'utf8');

	// make build directory
	wrench.mkdirSyncRecursive(C.BUILD_DIR, 0755);

	// generate ti-mocha.js based on mocha template
	var timocha = template(content, {
		// TODO
	});

	// write out the new file
	fs.writeFileSync(C.BUILD_FILE, timocha);
}
module.exports = build;