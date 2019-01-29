const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const paths = require("./paths");


module.exports = {
    mode: "production",
    // Don't attempt to continue if there are any errors.
    bail: true,
  
    devtool: false,
    entry: [require.resolve("babel-polyfill"), paths.appIndexJs],
  
    output: {
      path: paths.appBuild,
      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      // We don't currently advertise code splitting but Webpack supports it.
      filename: "static/js/[name].[chunkhash:8].js",
      chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: '/',
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: info => path.resolve(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/")
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            parse: {
              // we want uglify-js to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true
            }
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({
          // 启用 cssnano safe模式
          // https://github.com/freshesx/mogul-scripts/issues/1
          cssProcessorOptions: {
            safe: true
          }
        })
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: "all",
        name: true
      },
      // Keep the runtime chunk seperated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true
    },
    resolve: {
      modules: ["node_modules", paths.appNodeModules],
      extensions: [".js", ".json", ".vue", ".css", ".scss"],
    //   plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
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
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
                "style-loader",
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            require('postcss-preset-env')({
                              autoprefixer: {
                                flexbox: 'no-2009',
                              },
                              stage: 3,
                            }),
                        ],
                        sourceMap:false
                    }
                }
            ]
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
            exclude: [/\.(js|jsx|mjs|vue)$/, /\.html$/, /\.json$/],
            loader: require.resolve("file-loader"),
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
    },
    plugins: [
      new ProgressBarPlugin(),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(Object.assign({}, {
        createTime: new Date().toString()
      }, {
        inject: true,
        template: paths.appHtml,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      } )),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV was set to production here.
      // Otherwise React will be compiled in the very slow development mode.
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "production"
          ),
        "process.env.VUE_ENV": '"server"'
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
      }),
      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: "asset-manifest.json"
      }),
    //   new BuildInfoPlugin({
    //     name: "build.json",
    //     info: {
    //       gitLogs:gitLogs,
    //       changeLogs:changeLogs,
    //       createTime: moment().toISOString()
    //     }
    //   }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    node: {
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    },
    performance: false
  };