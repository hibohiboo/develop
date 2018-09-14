const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const history = require('koa-connect-history-api-fallback');
// const convert = require('koa-connect');
// const proxy = require('http-proxy-middleware');

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

// to extract the css as a separate file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var MODE = process.env.npm_lifecycle_event === "prod" ? "production" : "development";
const filename = MODE == "production" ? "[name]-[hash].js" : "[name].js";
const files = {index:"./src/index.js", card:"./src/card.js"};

var common = {
    mode: MODE,
    entry: files,
    output: {
        path: path.join(__dirname, "dist"),
        // webpack -p automatically adds hash when building for production
        filename: filename
    },
    plugins: [
        new HTMLWebpackPlugin({
            // Use this template to get basic responsive meta tags
            template: "src/index.html",
            // inject details of output file at end of body
            inject: "body",
            chunks:['index']
        }),
        new HTMLWebpackPlugin({
          filename: "card.html",
          template: "src/html/card.html",
          inject: false
        })
    ],
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"],
        extensions: [".js", ".elm", ".scss", ".png"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [/elm-stuff/, /node_modules/],
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff"
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [/elm-stuff/, /node_modules/],
                loader: "file-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader"
            }
        ]
    },
};

if (MODE === "development") {
    console.log("Building for dev...");
    module.exports = merge(common, {
        plugins: [
            // Suggested for hot-loading
            new webpack.NamedModulesPlugin(),
            // Prevents compilation errors causing the hot loader to lose state
            new webpack.NoEmitOnErrorsPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.elm$/,
                    exclude: [/elm-stuff/, /node_modules/],
                    use: [
                        { loader: 'elm-hot-webpack-loader' },
                        {
                            loader: "elm-webpack-loader",
                            options: {
                                // add Elm's debug overlay to output
                                debug: true,
                                forceWatch: true,
                                // optimize: true debugと同時には使えない
                            }
                        }
                    ]
                }
            ]
        },
        serve: {
            inline: true,
            stats: "errors-only",
            content: [path.join(__dirname, "src/assets")],
            add: (app, middleware, options) => {
                // routes /xyz -> /index.html
                app.use(history());
                // e.g.
                // app.use(convert(proxy('/api', { target: 'http://localhost:5000' })));
            },
            // windowsとvirtual boxとdockerを組み合わせている場合、ファイルの変更の検知にポーリングが必要(webpack-serve時)
            devMiddleware: {
              watch:true, 
              watchOptions:{
                aggregateTimeout: 300,
                poll:1000
              }
            },
            hotClient:{
              host: {
                client: '192.168.50.10', // 仮想環境のIPアドレス
                server: '0.0.0.0',       // Dockerのコンテナ上で動かすのでワイルドカードIPアドレスを指定
              },
              // hot-reloadで使われるポートを固定
              port:{
                server:3002,
                client: 3002
                }
            },
        },
      // windowsとvirtual boxとdockerを組み合わせている場合、ファイルの変更の検知にポーリングが必要(webpack時)
      watch:true,
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        // ５秒毎にポーリング
        poll: 5000
      },
    });
}

if (MODE === "production") {
    console.log("Building for Production...");
    module.exports = merge(common, {
        plugins: [
            // Delete everything from output directory and report to user
            new CleanWebpackPlugin(["dist"], {
                root: __dirname,
                exclude: [],
                verbose: true,
                dry: false
            }),
            new CopyWebpackPlugin([
                {
                    from: "src/assets"
                }
            ]),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name]-[hash].css"
            })
        ],
        module: {
            rules: [
                {
                    test: /\.elm$/,
                    exclude: [/elm-stuff/, /node_modules/],
                    use: [
                        { loader: "elm-webpack-loader", options:{optimize: true} }
                    ]
                },
            {
                test: /\.css$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.scss$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
            ]
        }
    });
}
