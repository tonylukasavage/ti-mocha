var C = require('./constants'),
	fs = require('fs'),
	wrench = require('wrench');

function build() {

	// read the mocha template
	var content = fs.readFileSync(C.TEMPLATE_FILE, 'utf8');

	// remove all existing reporters, since most won't work with Titanium
	content = content.replace(/require\.register\("reporters\/((?!base).)*?\.js"[\s\S]+?\/\/ module: reporters\/(.+?)\.js[\r\n]*/g, '');

	// generate ti-mocha.js by adding the mocha.js.template
	var index = content.search(/\}\)\(\);$/g);
	if (index !== -1) {
		var titanium = fs.readFileSync(C.TITANIUM_FILE, 'utf8');
		content = content.slice(0, index) + titanium + content.slice(index);
	} else {
		throw new Error('Failed to find insertion point for titanium code in ' + C.TEMPLATE_FILE);
	}

	// write out the new file
	wrench.mkdirSyncRecursive(C.BUILD_DIR, 0755);
	fs.writeFileSync(C.BUILD_FILE, content);
}
module.exports = build;