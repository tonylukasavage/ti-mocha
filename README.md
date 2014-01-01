# ti-mocha [![Build Status](https://travis-ci.org/tonylukasavage/ti-mocha.png?branch=master)](https://travis-ci.org/tonylukasavage/ti-mocha) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Simple and reliable support for [mocha](https://github.com/visionmedia/mocha) testing with Appcelerator's [Titanium](http://www.appcelerator.com/titanium/) SDK. Check below for a quick start. For full details, read the [documentation](http://tonylukasavage.com/ti-mocha/).

## Installation

1. Download [ti-mocha.js](https://raw.github.com/tonylukasavage/ti-mocha/master/ti-mocha.js).
2. Copy `ti-mocha.js` into your project's `Resources` folder.

## Example

```javascript
// creates the "mocha" global necessary to run a test suite anywhere in your app
require('ti-mocha');

// create the test suite
describe('ti-mocha', function() {

	describe('suite 1', function() {

		it('shows passing tests with fast result', function(){});

		it('shows passing asynchronous tests with slow result', function(done){
			setTimeout(done, 1500);
		});

	});

	describe('suite 2', function() {

		it('shows pending tests');

		it('fails a test', function() {
			throw new Error('this shoud fail');
		});

	});

});

// run the tests
mocha.run();
```

## Development

1. Install [node.js]().
2. Install [grunt](): `sudo npm install -g grunt-cli`
3. `cd ti-mocha && npm install`

#### Build

```
grunt build
```

This process will generate a new `ti-mocha.js` file based on the files in `src`. See [lib/build.js](lib/build.js) for details of the simple build process. Please note that _no_ modifications are made in the [src/mocha.js](src/mocha.js) file in order to make the port as simple to maintain as possible. All work is done in the other files in the `src` folder, particularly [src/titanium.js](src/titanium.js).

#### Testing

```
grunt test
```

## Issues and Contributing

Please report issues, new features/reporters, or requests in this repo's [issue tracker](https://github.com/tonylukasavage/ti-mocha/issues). Bear in mind that this is a straight-up, minimal porting effort to make mocha work with Titanium. If you want additional features or functionality in mocha itself, please report them in the [mocha](https://github.com/visionmedia/mocha) repository.

## TODO

* Only tested in iOS/Android simulator on Mac OSX so far. The code should be platform-agnostic, but it would be good to get some testing done on other mobile and host OSes.
* More robust testing for build script, should at least verify the validity of the resulting ti-mocha.js file.
* Testing in Studio. All testing done on CLI so far.
* Improvements to ti-spec output and/or an in-app reporter.

## License

Distributed under [MIT License](LICENSE).
