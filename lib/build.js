var C = require('./constants'),
	fs = require('fs'),
	wrench = require('wrench');

function build() {

	// read the mocha template
	var content = fs.readFileSync(C.TEMPLATE_FILE, 'utf8');

	// remove all existing reporters, since most won't work with Titanium
	content = content.replace(/require\.register\("reporters\/((?!base).)*?\.js"[\s\S]+?\/\/ module: reporters\/(.+?)\.js[\r\n]*/g, '');

	// generate ti-mocha.js by adding the mocha.js.template


	// var timocha = template(content, {
	// TODO
	// });

	// write out the new file
	wrench.mkdirSyncRecursive(C.BUILD_DIR, 0755);
	fs.writeFileSync(C.BUILD_FILE, content);
}
module.exports = build;