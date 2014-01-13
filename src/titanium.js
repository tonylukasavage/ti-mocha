// stub location that mocha uses
global.location = {};

// reset the suites each time mocha is run
var _mochaRun = mocha.run;
mocha.run = function(fn) {
	_mochaRun.call(this, function() {
		mocha.suite.suites.length = 0;
		if (fn) { fn(); }
	});
};

mocha.reporter = function(r) {
	Mocha.prototype.reporter.call(this, r);
	this._ti_reporter = r;
	return this;
};

// Override the console functions with node.js-style formatting. This allows us to use some of mocha's existing
// reporters with only a few modifications, like I do with spec.
var console = {};
var types = ['info','log','error','warn','trace'];

// Use node.js-style util.format() for each console function call
function createConsoleLogger(type) {
	console[type] = function() {
		var util = require('titanium/util'),
			args = Array.prototype.slice.call(arguments, 0),
			isStudio = /\-studio$/.test(mocha._ti_reporter);

		if (args.length === 0) {
			if (isStudio) {
				args.push(util.cursor.reset + ' ' + util.cursor.reset);
			} else {
				args.push(util.cursor.resetLine);
			}

		} else {
			var prefix = util.cursor.resetLine;
			if (!isStudio) {
				// Clear the existing line of text using ANSI codes, get rid of those pesky [INFO] prefixes
				args[0] = prefix + (args[0] || '').toString().split(/(?:\r\n|\n|\r)/).join('\n' + prefix);
			}
		}

		// Use the util.js format() port to get node.js-like console functions
		Ti.API.log(type === 'log' ? 'info' : type, util.format.apply(this, args));
  };
}

for (var i = 0; i < types.length; i++) {
	createConsoleLogger(types[i]);
}

// set the ti-spec reporter by default
mocha.setup({
	ui: 'bdd',
	reporter: 'ti-spec'
});
