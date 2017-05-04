'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('generator-hybreed') + ': Controller generator'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Write the name of the controller (REQUIRED)'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  paths() {
    this.destinationRoot(this.contextRoot);
  }

  writing() {
    this.fs.copyTpl(this.templatePath('index.js'),
      this.destinationPath(this.props.name + '.js'), {
        name: this.props.name
      });
  }
};
