'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

function searchBaseDir(dir){
    try {
        if(!this.fs.exists(dir+"/config.xml") || !this.fs.exists(dir+"/gulpfile.js")){
            let actualPath = path.join(dir, '../');
            return (actualPath != dir) ?
                searchBaseDir.call(this, actualPath) :
                this.destinationPath();
        }else {
            return dir;
        }
    } catch(err) {
        return dir;
    }
}

module.exports = class extends Generator {

  paths() {
    if(!this.config.get("yoFile")) {
        this.destinationRoot(searchBaseDir.call(this, this.destinationPath()));
        console.log("Base path: " + this.destinationRoot());
    }
  }

  prompting() {

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('generator-hybreed') + ': CMS generator'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Write the name of the model (REQUIRED)'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    if(this.fs.exists(this.destinationPath("src/modules/CMS")+"/index.js")){
      this.log(chalk.red('src/modules/CMS already exists'));
      throw "src/modules/CMS already exists";
    }
	this.fs.copyTpl(this.templatePath('index.js'),
              this.destinationPath('src/modules/CMS/index.js'), {
                name: this.props.name
              });

	this.fs.copyTpl(this.templatePath('models/model.js'),
              this.destinationPath("src/modules/CMS/models/"+this.props.name+'.js'), {
                name: this.props.name
              });

    let file = this.destinationRoot("src/modules")+"/modules.js";
    if(this.fs.exists(file)){
	    this.log(chalk.yellow('IMPORTANT: You must overwrite modules.js'));
        let modules = this.fs.read(file);
        modules = modules.replace("export {", "export {\r\n    CMS,");
        this.fs.write(file, "import CMS from '~/src/modules/CMS';\r\n"+modules);
    }
	this.log(chalk.yellow('IMPORTANT: Do not forget import and export it in src/modules/modules.js'));
  }
};
