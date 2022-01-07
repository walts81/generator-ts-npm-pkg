'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('underscore.string');
const { github, git } = require('yeoman-generator/lib/actions/user');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the phenomenal ${chalk.red('@walts81/ts-npm-pkg')} generator!`));

    return github.username().then(username => {
      const prompts = [
        {
          type: 'string',
          name: 'name',
          message: 'Enter a name for this library:',
          default: 'My Excellent TS Library',
        },
        {
          type: 'string',
          name: 'desc',
          message: 'Enter a description for this library:',
          default: '',
        },
        {
          type: 'string',
          name: 'githubUser',
          message: 'Enter your github username:',
          default: username || '',
        },
        {
          type: 'string',
          name: 'gitUrl',
          message: 'Enter the url for your git repo:',
          default: '',
        },
        {
          type: 'string',
          name: 'author',
          message: `What's your name?`,
          default: git.name() || '',
        },
      ];

      return this.prompt(prompts).then(props => {
        // To access props later use this.props.someAnswer;
        props.slugged = _.slugify(props.name);
        props.title = _.titleize(props.name);
        props.namePrefix = '@' + props.githubUser + '/';
        props.fullSlugged = props.namePrefix + props.slugged;
        props.year = new Date().getFullYear().toString();
        this.props = props;
        this.destinationRoot(props.slugged);
      });
    });
  }

  writing() {
    this.fs.copy(this.templatePath('_devcontainer/'), this.destinationPath('.devcontainer/'));
    this.fs.copy(this.templatePath('_vscode/'), this.destinationPath('.vscode/'));
    this.fs.copy(this.templatePath('test/'), this.destinationPath('test/'));
    this.fs.copy(this.templatePath('dotfiles/.*'), this.destinationRoot());
    this.fs.copyTpl(this.templatePath('root/*'), this.destinationRoot(), this.props);
    this.fs.copy(this.templatePath('src/'), this.destinationPath('src/'));
  }

  install() {
    this.npmInstall(
      [
        '@types/chai',
        '@types/mocha',
        '@types/node',
        '@types/sinon',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'chai',
        'coveralls',
        'del',
        'eslint',
        'eslint-config-prettier',
        'gulp',
        'gulp-typescript',
        'mocha',
        'nyc',
        'sinon',
        'source-map-support',
        'ts-node',
        'typescript',
      ],
      { 'save-dev': true }
    );
  }
};
