'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('generator-hybreed') + ': View generator'
    ));

    const prompts = [{
        type: 'input',
        name: 'name',
        message: 'Write the name of the view (REQUIRED)'
      },
      {
        type: 'list',
        name: 'type',
        message: 'What is the view type?',
        choices: ["View", "CollectionView"]
      },
      {
        when: function(response) {
          return response.type == "CollectionView";
        },
        type: 'input',
        name: 'childName',
        message: 'Write the name of the child view (REQUIRED)'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  paths() {
    this.destinationRoot(this.contextRoot);
  }

  writing() {
    this.fs.copyTpl(this.templatePath('view.js'),
      this.destinationPath(this.props.name + '.js'), {
        name: this.props.name,
        type: this.props.type,
        childName: this.props.childName
      });
    this.fs.copyTpl(this.templatePath('view.html'),
      this.destinationPath(this.props.name + '.html'), {
        name: this.props.name
      });
    if (this.props.type == "CollectionView") {
      this.fs.copyTpl(this.templatePath('childView.html'),
        this.destinationPath(this.props.childName + '.html'), {
          childName: this.props.childName
        });
    }
    this.fs.copyTpl(this.templatePath('view.scss'),
      this.destinationPath(this.props.name + '.scss'), {
        name: this.props.name
      });
  }
};
