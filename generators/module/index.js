'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('generator-hybreed') + ': Module generator'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Write the name of the module'
    },
    {
        type: 'list',
        name: 'type',
        message: 'What is the views type?',
        choices: [ "View", "CollectionView" ]
    },
    {
      when: function (response) {
        return response.type == "CollectionView";
      },
      type: 'input',
      name: 'childName',
      message: 'Write the name of the child view'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
	this.fs.copyTpl(this.templatePath('index.js'),
              this.destinationPath(this.props.name+'/index.js'), {
                name: this.props.name
              });
	this.fs.copyTpl(this.templatePath('views/view.js'),
              this.destinationPath(this.props.name+"/views/"+this.props.name+'.js'), {
                name: this.props.name,
                childName: this.props.childName,
		        type: this.props.type
              });
     if(this.props.type == "CollectionView") {
        this.fs.copyTpl(this.templatePath('views/childView.html'),
            this.destinationPath(this.props.name+"/views/"+this.props.childName+'.html'), {
                childName: this.props.childName
        });
    }
	this.fs.copyTpl(this.templatePath('views/view.html'),
              this.destinationPath(this.props.name+"/views/"+this.props.name+'.html'), {
                name: this.props.name
              });
	this.fs.copyTpl(this.templatePath('views/view.scss'),
              this.destinationPath(this.props.name+"/views/"+this.props.name+'.scss'), {
                name: this.props.name
              });
	this.log(chalk.yellow('IMPORTANT: Do not forget import and export it in src/modules/modules.js'));
  }
};
