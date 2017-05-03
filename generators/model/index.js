'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('generator-hybreed') + ': Model generator'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Write the name of the model'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
	this.fs.copyTpl(this.templatePath('model.js'),
              this.destinationPath(this.props.name+'.js'), {
                name: this.props.name
              });
  }
};