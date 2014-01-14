# ti-mocha [![Build Status](https://travis-ci.org/tonylukasavage/ti-mocha.png?branch=master)](https://travis-ci.org/tonylukasavage/ti-mocha) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Simple and reliable support for [mocha](https://github.com/visionmedia/mocha) testing with Appcelerator's [Titanium](http://www.appcelerator.com/titanium/) SDK. For full details on installation and usage, read the [documentation](http://tonylukasavage.com/ti-mocha/).

## Contributing

1. Install [node.js]().
2. Install [grunt](): `sudo npm install -g grunt-cli`
3. `git clone https://github.com/tonylukasavage/ti-mocha.git && cd ti-mocha && npm install`

#### Build

```
grunt build
```

This process will generate a new `ti-mocha.js` file based on the files in `src`. See [lib/build.js](lib/build.js) for details of the simple build process. Please note that _no_ modifications are made directly in the [src/mocha.js](src/mocha.js) file in order to make the port as simple to maintain as possible.

#### Testing

```
grunt test
```

## Issues

Please report issues, new features/reporters, or requests in this repo's [issue tracker](https://github.com/tonylukasavage/ti-mocha/issues). Bear in mind that this is a straight-up, minimal porting effort to make mocha work with Titanium. If you want additional features or functionality in mocha itself, please report them in the [mocha](https://github.com/visionmedia/mocha) repository.

## License

Distributed under [MIT License](LICENSE).
