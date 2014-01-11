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

// Override the console functions with node.js-style formatting. This allows us to use some of mocha's existing
// reporters with only a few modifications, like I do with spec.
var console = {};
var types = ['info','log','error','warn','trace'];

// Use node.js-style util.format() for each console function call
function createConsoleLogger(type) {
	console[type] = function() {
		var util = require('titanium/util'),
			args = Array.prototype.slice.call(arguments, 0);

		if (args.length === 0) {
			args.push(util.cursor.resetLine);
		} else {
			// Clear the existing line of text using ANSI codes, get rid of those pesky [INFO] prefixes
			args[0] = util.cursor.resetLine + (args[0] || '').toString().split(/(?:\r\n|\n|\r)/).join('\n' + util.cursor.resetLine);
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
