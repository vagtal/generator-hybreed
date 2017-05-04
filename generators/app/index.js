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
      'Welcome to the ' + chalk.red('generator-hybreed') + ' generator!'
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
      },
      {
        type: 'checkbox',
        name: 'plugins',
        message: 'What plugins do you want to install?',
        choices: [{
          name: 'cordova-plugin-geolocation',
          value: 'cordova-plugin-geolocation',
          checked: false
        }, {
          name: 'cordova-plugin-globalization',
          value: 'cordova-plugin-globalization',
          checked: false
        }, {
          name: 'cordova-plugin-inappbrowser',
          value: 'cordova-plugin-inappbrowser',
          checked: false
        }, {
          name: 'cordova-plugin-x-socialsharing',
          value: 'cordova-plugin-x-socialsharing',
          checked: false
        }, {
          name: 'cordova-plugin-file',
          value: 'cordova-plugin-file',
          checked: false
        }, {
          name: 'cordova-plugin-file-transfer',
          value: 'cordova-plugin-file-transfer',
          checked: false
        }, {
          name: 'cordova-plugin-device-orientation',
          value: 'cordova-plugin-device-orientation',
          checked: false
        }]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var done = this.async();

    remote('vagtal', 'hybreed', 'master', function(err, cachePath) {
      this.fs.copy(path.join(cachePath, '**/*'), this.destinationPath('.'));
      this.fs.copy(path.join(cachePath, '**/.*'), this.destinationPath('.'));
      this.fs.copyTpl(path.join(cachePath, 'package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name,
          version: this.props.version,
          description: this.props.description,
          author: this.props.author,
          license: this.props.license
        });


      this.fs.copyTpl(path.join(cachePath, 'config.xml'),
        this.destinationPath('config.xml'), {
          plugins: this.props.plugins
        });
      done();
    }.bind(this));

  }

  install() {
    this.installDependencies();
  }
};
