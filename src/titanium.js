/**
 * NOTES
 *
 * - In these notes, I include "log()" when I refer to "Ti.API calls".
 * - "◦" and "✓" character are handled inconsistently by Ti.API calls, used plain normal characters instead.
 * - Leading whitespace is trimmed in Ti.API calls. A workaround is to wrap the whitespace with a color.
 *
 */

// Create a titanium compatible reporter based on spec
require.register("reporters/ti-spec.js", function(module, exports, require){

/**
 * Module dependencies.
 */

var Base = require('./base'),
	color = Base.color;

/**
 * Expose `Spec`.
 */

exports = module.exports = TiSpec;

/**
 * Initialize a new `TiSpec` test reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function TiSpec(runner) {
	Base.call(this, runner);

	var self = this,
		stats = this.stats,
		indents = 0,
		n = 0;

	function CR() {
		return '\u001b[2K' + '\u001b[0G';
	}

	function NL() {
		log(color('pass', ''));
	}

	function upOne() {
		return '\u001b[1F' + CR();
	}

	function indent() {
		return new Array(indents).join('  ');
	}

	function log(msg) {
		console.log(CR() + msg);
	}

	runner.on('start', function(){
		NL();
	});

	runner.on('suite', function(suite){
		++indents;
		log(color('suite', indent() + suite.title));
	});

	runner.on('suite end', function(suite){
		--indents;
		if (1 === indents) { NL(); }
	});

	runner.on('test', function(test){
		log(color('pass', indent() + '  o ' + test.title + ': '));
	});

	runner.on('pending', function(test){
		log(color('pending', indent() + '  - ' + test.title));
	});

	runner.on('pass', function(test){
		if ('fast' === test.speed) {
			log(upOne() + color('checkmark', indent() + '  +') + color('pass', ' ' + test.title + ' '));
		} else {
			log(upOne() + color('checkmark', indent() + '  +') + color('pass', ' ' + test.title + ' ') +
				color(test.speed, '(' + test.duration + 'ms)'));
		}
	});

	runner.on('fail', function(test, err){
		log(color('fail', upOne() + indent() + '  ' + (++n) + ') ' + test.title));
	});

	runner.on('end', function() {
		self.epilogue();
	});
}

/**
 * Inherit from `Base.prototype`.
 */

function F(){}
F.prototype = Base.prototype;
TiSpec.prototype = new F();
TiSpec.prototype.constructor = TiSpec;

}); // module: reporters/ti-spec.js

// stub location that mocha uses
global.location = {};

// Override the console functions with node.js-style formatting. This allows us to use some of mocha's existing
// reporters with only a few modifications, like I do with spec.
var console = {};
var types = ['info','log','error','warn','trace'];
var LINE_RESET = '\u001b[2K' + '\u001b[0G';
for (var i = 0; i < types.length; i++) {
  var type = types[i];
  console[type] = function() {

  	var args = Array.prototype.slice.call(arguments, 0);
  	if (args.length === 0) {
  		args.push(LINE_RESET);
  	} else {
  		// Clear the existing line of text using ANSI codes, get rid of those pesky [INFO] prefixes
  		args[0] = LINE_RESET + args[0].toString().split(/(?:\r\n|\n|\r)/).join('\n' + LINE_RESET);
  	}

  	// Use the util.js format() port to get node.js-like console functions
    Ti.API.log(type === 'log' ? 'info' : type, require('titanium/util').format.apply(this, args));
  };
}
