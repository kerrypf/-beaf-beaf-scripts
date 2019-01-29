const webpack = require('webpack');
const config = require('../webpack.config.js');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require("path");


fs.emptyDirSync(path.resolve(__dirname, '../lib'));
// Merge with the public folder
// copyPublicFolder();
console.log('building for production...')
webpack(config, function (err, stats) {
    
    if (err) {
        throw err
    }
    console.log(chalk.green('Compiled successfully.\n'));
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
})


function copyPublicFolder() {
    fs.copySync(path.resolve(__dirname, '../lib'), {
      dereference: true
    });
}