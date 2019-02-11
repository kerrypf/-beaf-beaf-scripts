const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ManifestPlugin = require("webpack-manifest-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var dashboard = new Dashboard();

const paths = require("./paths");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    require.resolve("babel-polyfill"),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: "static/js/bundle.js",
    publicPath: "/",
    chunkFilename: "static/js/[name].chunk.js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: true
    },
    runtimeChunk: true
  },
  resolve: {
    modules: ["node_modules", paths.appNodeModules],
    // alias: {
    //   assets: paths.appAssets,
    // },
    extensions: [".js", ".json", ".vue", ".css", ".scss"]
  },
  externals: {
    // 'vue': 'Vue',
    // 'vuex': 'Vuex',
    // 'vue-router': 'VueRouter',
    // 'axios': 'axios'
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   // loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       options: {
      //         // formatter: eslintFormatter,
      //         parser: "babel-eslint",
      //         eslintPath: require.resolve("eslint"),
      //         // baseConfig: {
      //         //   extends: [require.resolve("eslint-config-react-app")]
      //         // },
      //         ignore: false,
      //         useEslintrc: false
      //       },
      //       loader: require.resolve("eslint-loader")
      //     }
      //   ],
      // },
      
      // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "stage-2"],
            plugins: [
              "transform-runtime",
              "syntax-dynamic-import",
              "syntax-jsx",
              [
                "component",
                {
                  libraryName: "element-ui",
                  styleLibraryName: "theme-chalk"
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader"],
          // 在开发环境使用 style-loader
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|(jpe?g)|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/image/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader"
      },
      // {
      //   exclude: [/\.(js|jsx|mjs|vue)$/, /\.html$/, /\.json$/],
      //   loader: require.resolve("file-loader"),
      //   options: {
      //     name: "static/media/[name].[hash:8].[ext]"
      //   }
      // }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      // Also generate a index.html
      title: "create beaf",
      inject: true,
      filename: "index.html",
      template: "public/index.html",
      favicon: "public/favicon.ico"
    }),
    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename: "static/css/[name].[hash:8].css"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.VUE_ENV": '"client"'
    }),
    // webpack-dev-server 强化插件
    // new DashboardPlugin(dashboard.setData),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),

    new ManifestPlugin({
      fileName: "asset-manifest.json"
    })
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false
};
