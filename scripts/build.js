const config = require('../config/webpack.prod.config');
const paths = require('../config/paths');

const webpack = require('webpack');
const chalk = require('chalk');
const fs = require('fs-extra');


// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(paths.appBuild);
// Merge with the public folder
copyPublicFolder();
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
    fs.copySync(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: file => file !== paths.appHtml,
    });
}
