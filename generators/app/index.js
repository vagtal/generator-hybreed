'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs-extra');

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
    this.fs.copy(this.templatePath('static/**/*'), this.destinationPath('.'));
    this.fs.copy(this.templatePath('static/.babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('static/.DS_Store'), this.destinationPath('.DS_Store'));
    this.fs.copy(this.templatePath('static/.eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copy(this.templatePath('static/.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('static/resources/.DS_Store'), this.destinationPath('resources/.DS_Store'));
    this.fs.copy(this.templatePath('static/plugins/.gitkeep'), this.destinationPath('plugins/.gitkeep'));
    this.fs.copy(this.templatePath('static/platforms/.gitkeep'), this.destinationPath('platforms/.gitkeep'));
    this.fs.copy(this.templatePath('static/www/.gitkeep'), this.destinationPath('www/.gitkeep'));
    this.fs.copy(this.templatePath('static/test/js/.DS_Store'), this.destinationPath('test/js/.DS_Store'));
    this.fs.copyTpl(
              this.templatePath('_package.json'),
              this.destinationPath('package.json'), {
                name: this.props.name,
		version: this.props.version,
		description: this.props.description,
		author: this.props.author,
		license: this.props.license
              }
          );
  }

  install() {
    this.installDependencies();
  }
};
