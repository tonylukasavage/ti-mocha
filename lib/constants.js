var path = require('path');

exports.NAME = 'ti-mocha.js';

exports.TEMPLATE_FILE = path.join(__dirname, '..', 'src', 'mocha.js');

exports.BUILD_DIR = path.join(__dirname, '..', 'build');

exports.BUILD_FILE = path.join(exports.BUILD_DIR, exports.NAME);

exports.RELEASE_FILE = path.join(__dirname, '..', exports.NAME);
