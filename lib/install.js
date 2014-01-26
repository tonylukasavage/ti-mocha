var C = require('./constants'),
	fs = require('fs'),
	path = require('path');

function install(dir) {
	dir = dir || process.cwd();
	var copyTo, location;

	// alloy app
	if (fs.existsSync((location = path.join(dir, 'app')))) {
		copyTo = path.join(location, 'lib');
		if (!fs.existsSync(copyTo)) { fs.mkdirSync(copyTo, 0755); }

	// tradtional titanium app
	} else if (fs.existsSync((location = path.join(dir, 'Resources')))) {
		copyTo = location;
	}

	if (copyTo) {
		fs.writeFileSync(path.join(copyTo, 'ti-mocha.js'), fs.readFileSync(C.RELEASE_FILE, 'utf8'));
	}

	return copyTo;
}
module.exports = install;

// if invoked from install script
if (require.main === module) {
	var location = install(path.join(process.cwd(), '..', '..'));
	if (location) {
		console.log('ti-mocha.js installed to ' + location);
	}
}
