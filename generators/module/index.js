'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

function searchBaseDir(dir) {
  try {
    if (!this.fs.exists(dir + "/config.xml") || !this.fs.exists(dir + "/gulpfile.js")) {
      let actualPath = path.join(dir, '../');
      return (actualPath != dir) ?
        searchBaseDir.call(this, actualPath) :
        this.destinationPath();
    } else {
      return dir;
    }
  } catch (err) {
    return dir;
  }
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('generator-hybreed') + ': Module generator'
    ));

    const prompts = [{
        type: 'input',
        name: 'name',
        message: 'Write the name of the module (REQUIRED)'
      },
      {
        type: 'list',
        name: 'type',
        message: 'What is the views type?',
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
    if (!this.config.get("yoFile")) {
      this.destinationRoot(searchBaseDir.call(this, this.destinationPath()));
      console.log("Base path: " + this.destinationRoot());
    }
  }

  writing() {
    this.fs.copyTpl(this.templatePath('index.js'),
      this.destinationPath("src/modules/" + this.props.name + '/index.js'), {
        name: this.props.name
      });
    this.fs.copyTpl(this.templatePath('views/view.js'),
      this.destinationPath("src/modules/" + this.props.name + "/views/" + this.props.name + '.js'), {
        name: this.props.name,
        childName: this.props.childName,
        type: this.props.type
      });
    if (this.props.type == "CollectionView") {
      this.fs.copyTpl(this.templatePath('views/childView.html'),
        this.destinationPath("src/modules/" + this.props.name + "/views/" + this.props.childName + '.html'), {
          childName: this.props.childName
        });
    }
    this.fs.copyTpl(this.templatePath('views/view.html'),
      this.destinationPath("src/modules/" + this.props.name + "/views/" + this.props.name + '.html'), {
        name: this.props.name
      });
    this.fs.copyTpl(this.templatePath('views/view.scss'),
      this.destinationPath("src/modules/" + this.props.name + "/views/" + this.props.name + '.scss'), {
        name: this.props.name
      });

    let file = this.destinationRoot("src/modules") + "/modules.js";
    if (this.fs.exists(file)) {
      this.log(chalk.yellow('IMPORTANT: You must overwrite modules.js'));
      let modules = this.fs.read(file);
      let name = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
      modules = modules.replace("export {", "export {\r\n    " + name + "Controller,");
      this.fs.write(file, "import " + name + "Controller from '~/src/modules/" + this.props.name + "';\r\n" + modules);
    }
    this.log(chalk.yellow('IMPORTANT: Make sure that is imported and exported it in src/modules/modules.js'));
  }
};
