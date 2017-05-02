// Karma configuration
'use strict'

module.exports = function (config) {
  //let customBrowsers = ['Chrome', 'Safari', 'Firefox', 'PhantomJS']
  let customBrowsers = ['PhantomJS']

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      'src/main.js',
      'src/common/**/*.js',
      'src/modules/**/*.js',
      'test/js/*.js'
    ],

    // list of files to exclude
    exclude: [
      'src/vendor/**/*.js'
    ],

    plugins: [
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sinon-chai'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/js/*.spec.js': ['browserify']
    },

    // Browserify configuration
    // The coverage command goes here instead of the preprocessor because we need it to work with browserify
    browserify: {
      debug: true,
      transform: [
        [
          'babelify',
          {
            presets: 'es2015',
            plugins: ["transform-html-import-to-string","babel-root-import"]
          }
        ], [
          'browserify-istanbul',
          {
            instrumenterConfig: {
              embedSource: true
            }
          }
        ]
      ]
    },

    // optionally, configure the reporter
    // text displays it within the console (alternative: text-summary)
    // lcov creates a codecov compatible report
    coverageReporter: {
      reporters: [
        {'type': 'text', dir: 'test/coverage'},
        {'type': 'html', dir: 'test/coverage'},
        {'type': 'lcov', dir: 'test/coverage'}
      ],
      includeAllSources: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // coverage is from karma-coverage and provides Istanbul code coverage reports
    reporters: ['mocha', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: customBrowsers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
