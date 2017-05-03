'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantastic ' + chalk.red('generator-hybreed') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Write the name of the view'
    },
{
    type: 'list',
    name: 'type',
    message: 'What is the view type?',
        choices: [ "View", "CollectionView" ]
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
	this.fs.copyTpl(this.templatePath('view.js'),
              this.destinationPath(this.props.name+'.js'), {
                name: this.props.name,
		type: this.props.type
              });
	this.fs.copyTpl(this.templatePath('view.html'),
              this.destinationPath(this.props.name+'.html'), {
                name: this.props.name
              });
	this.fs.copyTpl(this.templatePath('view.scss'),
              this.destinationPath(this.props.name+'.scss'), {
                name: this.props.name
              });
  }
};
