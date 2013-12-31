var path = require('path');

exports.NAME = 'ti-mocha.js';

exports.TEMPLATE_FILE = path.join(__dirname, '..', 'src', 'mocha.js');

exports.TITANIUM_FILE = path.join(__dirname, '..', 'src', 'titanium.js');

exports.UTIL_FILE = path.join(__dirname, '..', 'src', 'util.js');

exports.LICENSE_FILE = path.join(__dirname, '..', 'LICENSE');

exports.BUILD_DIR = path.join(__dirname, '..', 'build');

exports.BUILD_FILE = path.join(exports.BUILD_DIR, exports.NAME);

exports.RELEASE_FILE = path.join(__dirname, '..', exports.NAME);
