'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs-extra');
const remote = require('yeoman-remote');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tiptop ' + chalk.red('generator-hybreed') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name:',
      default: this.appname
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: '0.0.1'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Your project description:',
      default: ''
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:',
      default: ''
    },
    {
      type: 'input',
      name: 'license',
      message: 'Your project license:',
      default: ''
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
	 var done = this.async();

    remote('vagtal', 'hybreed', 'master', function (err, cachePath) {
	this.fs.copy(path.join(cachePath, '**/*'), this.destinationPath('.'));
    	this.fs.copy(path.join(cachePath, '.babelrc'), this.destinationPath('.babelrc'));
  	   this.fs.copy(path.join(cachePath, '.DS_Store'), this.destinationPath('.DS_Store'));
  	   this.fs.copy(path.join(cachePath, '.eslintrc'), this.destinationPath('.eslintrc'));
  	   this.fs.copy(path.join(cachePath, '.gitignore'), this.destinationPath('.gitignore'));
 	   this.fs.copy(path.join(cachePath, 'resources/.DS_Store'), this.destinationPath('resources/.DS_Store'));
 	   this.fs.copy(path.join(cachePath, 'plugins/.gitkeep'), this.destinationPath('plugins/.gitkeep'));
 	   this.fs.copy(path.join(cachePath, 'platforms/.gitkeep'), this.destinationPath('platforms/.gitkeep'));
 	   this.fs.copy(path.join(cachePath, 'www/.gitkeep'), this.destinationPath('www/.gitkeep'));
 	   this.fs.copy(path.join(cachePath, 'test/js/.DS_Store'), this.destinationPath('test/js/.DS_Store'));
 	   this.fs.copyTpl(
              path.join(cachePath, 'package.json'),
              this.destinationPath('package.json'), {
                name: this.props.name,
		version: this.props.version,
		description: this.props.description,
		author: this.props.author,
		license: this.props.license
              }
          );
      done();
    }.bind(this));
    
  }

  install() {
    this.installDependencies();
  }
};
