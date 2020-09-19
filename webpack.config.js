// pathモジュールを読み(output.pathに絶対パスを指定するため)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const outputPath = path.resolve(__dirname, 'public');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // モードの設定。指定可能な値は、none, development ,production（デフォルト）
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development',
    // アプリケーションが実行を開始されるポイント(エントリーポイント)
    // 配列で指定すると、すべての項目が実行される
    // https://webpack.js.org/configuration/entry-context/#entry
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        // ビルド後のファイルが出力される"絶対パス"ディレクトリ
        // https://webpack.js.org/configuration/output/#outputpath
        path: outputPath
    },
    devServer: {
        contentBase: outputPath
    },
    // https://webpack.js.org/configuration/module/#rule-conditions
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                },
                'css-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader', //loader名
                options: { //Babelの設定
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.scss$/i,
            use: [{
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            outputStyle: 'expanded',
                        },
                    },
                },
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({}),
        new HtmlWebpackPlugin({
            title: 'My app',
            originalHeader: 'original header title',
            meta: [{
                    viewport: 'width=device-width, initial-scale=1'
                },
                {
                    'http-equiv': 'X-UA-Compatible',
                    content: 'IE=edge'
                }
            ],
            template: './src/index.html',
            filename: 'index.html',
            hash: true,
        })
    ]
};