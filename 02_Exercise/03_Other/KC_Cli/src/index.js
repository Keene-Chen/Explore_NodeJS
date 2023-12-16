#!/usr/bin/env node

/**
 * @file index.js
 * @desc KeeneChen's Cli Program
 * @author KeeneChen <keenechen@qq.com>
 * @since  2023.12.13-21:43:46
 */

import { program } from 'commander';
import inquirer from 'inquirer';
import fs from 'node:fs';
import { checkPath, downloadTemp } from './utils.js';

let json = fs.readFileSync('./package.json', 'utf-8');
json = JSON.parse(json);

// 命令行工具的基本信息
program
  .name('kc-cli')
  .description('🌟 create a new project')
  .version(json.version, '-v, --version', 'output the current version')
  .helpOption('-h, --help', 'output usage information');

// 添加 create 命令和别名 cr 以及描述与执行完成之后的动作
program
  .command('create <project>')
  .alias('cr')
  .action(project => {
    //命令行交互工具
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'project name',
          default: project,
        },
        {
          type: 'confirm',
          name: 'isTs',
          message: '是否支持typeScript',
          default: false,
        },
      ])
      .then(answers => {
        if (checkPath(answers.projectName)) {
          console.log('文件已存在');
          return;
        }

        if (answers.isTs) {
          downloadTemp('ts', answers.projectName);
        } else {
          downloadTemp('js', answers.projectName);
        }
      });
  });

program.parse(process.argv);
