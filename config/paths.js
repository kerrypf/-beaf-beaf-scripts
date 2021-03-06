const paths = require('path');
const url = require('url');

const resolveApp = relativePath => paths.resolve(process.cwd(), relativePath);
module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    // appAssets: resolveApp('src/app/assets'),
    // servedPath: getServedPath(resolveApp('package.json'))
};