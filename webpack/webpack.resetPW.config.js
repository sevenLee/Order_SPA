var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var rootPath = path.join(__dirname, '..');

var ENV = process.env.npm_lifecycle_event.split(':')[0];
var isProd = (ENV === 'prod');

module.exports = function makeWebpackConfig(){
    var config = {};
    var productConfigList = [];

    config = {
        context: rootPath + '/js/src',
        entry: {
            app: './app.resetPW.js',
            vendor: [
                'angular',
                'angular-cookies',
                'angular-jwt',
                'angular-sanitize',
                'angular-translate',
                'angular-translate-loader-static-files',
                'angular-ui-router',
                'ngstorage',
                'html5shiv',
                'jquery-migrate',
                'jquery',
                'moment',
                'lodash',
                'crypto-js/core',
                'crypto-js/enc-base64',
                'crypto-js/md5',
                'crypto-js/sha256',
                'crypto-js/cipher-core',
                'crypto-js/aes',
                'crypto-js/mode-ecb',
                'crypto-js/pad-pkcs7'
            ]
        },
        output: {
            path: rootPath + '/build/resetPW',
            filename: 'app.bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: isProd ? ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') : 'style-loader!css-loader'
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    loaders: [
                        "html?" + JSON.stringify({
                            attrs: ["img:src", "img:ng-src"]
                        })
                    ]
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
            new webpack.ProvidePlugin({
                '$': "jquery",
                'window.jQuery': "jquery",
                'jQuery': "jquery",
                'moment': "moment",
                '_': "lodash",
                'CryptoJS': "crypto-js"
            })
        ],
        devServer: {
            contentBase: './build/resetPW'
        }
    };

    if(isProd) {
        productConfigList = [
            new ExtractTextPlugin('./css/app.all.css', { allChunks: true }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            })
        ];

        config.plugins = config.plugins.concat(productConfigList);
    }

    return config;
}();
