var path = require('path');

exports.NAME = 'ti-mocha.js';

var srcDir = exports.SRC_DIR = path.join(__dirname, '..', 'src');

exports.REPORTERS_DIR = path.join(srcDir, 'reporters');

exports.TEMPLATE_FILE = path.join(__dirname, '..', 'node_modules', 'mocha', 'mocha.js');

exports.TITANIUM_FILE = path.join(srcDir, 'titanium.js');

exports.UTIL_FILE = path.join(srcDir, 'util.js');

exports.MOCHA_LICENSE_FILE = path.join(srcDir, 'mocha.LICENSE');

exports.LICENSE_FILE = path.join(__dirname, '..', 'LICENSE');

var buildDir = exports.BUILD_DIR = path.join(__dirname, '..', 'build');

exports.BUILD_FILE = path.join(buildDir, exports.NAME);

exports.RELEASE_FILE = path.join(__dirname, '..', exports.NAME);
