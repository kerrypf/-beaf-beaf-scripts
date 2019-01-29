const config = require('../config/webpack.prod.config');
const webpack = require('webpack');
const chalk = require('chalk');
let compiler = webpack(config);
compiler.run((err, stats) => {
    if (err) {
        console.log(err)
        process.exit(1);
    }
})

function build(previousFileSizes) {
    console.log('Creating an optimized production build...');
  
    let compiler = webpack(config);
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(err);
        }
        // const messages = formatWebpackMessages(stats.toJson({}, true));
        // if (messages.errors.length) {
        //   // Only keep the first error. Others are often indicative
        //   // of the same problem, but confuse the reader with noise.
        //   if (messages.errors.length > 1) {
        //     messages.errors.length = 1;
        //   }
        //   return reject(new Error(messages.errors.join('\n\n')));
        // }
        // if (
        //   process.env.CI &&
        //   (typeof process.env.CI !== 'string' ||
        //     process.env.CI.toLowerCase() !== 'false') &&
        //   messages.warnings.length
        // ) {
        //   console.log(
        //     chalk.yellow(
        //       '\nTreating warnings as errors because process.env.CI = true.\n' +
        //       'Most CI servers set it automatically.\n'
        //     )
        //   );
        //   return reject(new Error(messages.warnings.join('\n\n')));
        // }
  
        const resolveArgs = {
          stats,
        //   previousFileSizes,
        //   warnings: messages.warnings,
        };
        // if (writeStatsJson) {
        //   return bfj
        //     .write(paths.appBuild + '/bundle-stats.json', stats.toJson())
        //     .then(() => resolve(resolveArgs))
        //     .catch(error => reject(new Error(error)));
        // }
  
        return resolve(resolveArgs);
      });
    });
  }