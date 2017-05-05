# generator-hybreed [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Generator for Hybreed, https://github.com/atSistemas/hybreed Hybreed is a framework to develop swift and good looking hybrid mobile apps. It&#39;s Cordova based and use the latest front-end techologies: Gulp, ES6, Browserify, BrowserSync, SASS...

## Installation

First, install [Yeoman](http://yeoman.io) and generator-hybreed using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-hybreed
```

Then generate your new project:

```bash
yo hybreed
```

## Usage
### App
Sets up a new Hybreed app, generating all the boilerplate you need to get started. The app generator also installs everything you need, gulp, sass...

Example:
```bash
yo hybreed
gulp develop
```

### CMS
Generates an entire CMS with one model, and import/export it in `src/modules/modules.js`.

Example:
```bash
yo hybreed:cms
```

Produces `src/modules/CMS/index.js`, `src/modules/CMS/models/modelName.js` with all the basics to start developing with this CMS.

**IMPORTANT: Make sure that is imported and exported it in `src/modules/modules.js`**

### Model
Generates a model in `src/modules/CMS/models`, you only need to import/export it in `.src/modules/CMS/index.js`.

Example:
```bash
yo hybreed:model
```

Produces src/modules/CMS/models/modelName.js` with all the basics to start developing with this model.

**IMPORTANT: You need to import and export this functions in `src/modules/modules.js`**

### Module
Generates an entire module with controller and view and import/export it in `src/modules/modules.js`.

Example:
```bash
yo hybreed:module
```

Produces `src/modules/moduleName/index.js`, `src/modules/moduleName/view/moduleName.js`, `src/modules/moduleName/view/moduleName.html`, `src/modules/moduleName/view/moduleName.css` with all the basics to start developing.

**IMPORTANT: Make sure that is imported and exported it in src/modules/modules.js**

### Controller
Generates a controller in the actual folder.

Example:
```bash
yo hybreed:controller
```

Produces `controllerName.js`, with all the basics to start developing.

### View
Generates an entire view in the actual folder.

Example:
```bash
yo hybreed:view
```

Produces `viewName.js`, `viewName.html`, `viewName.css` with all the basics to start developing.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [atSistemas]()


[npm-image]: https://badge.fury.io/js/generator-hybreed.svg
[npm-url]: https://npmjs.org/package/generator-hybreed
[travis-image]: https://travis-ci.org/atSistemas/generator-hybreed.svg?branch=master
[travis-url]: https://travis-ci.org/atSistemas/generator-hybreed
[daviddm-image]: https://david-dm.org/atSistemas/generator-hybreed.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/atSistemas/generator-hybreed
[coveralls-image]: https://coveralls.io/repos/atSistemas/generator-hybreed/badge.svg
[coveralls-url]: https://coveralls.io/r/atSistemas/generator-hybreed
