'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-hybreed:createModule', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/createModule'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
