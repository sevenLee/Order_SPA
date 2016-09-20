var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var globalConfig = require('./global.config');

var rootPath = path.join(__dirname, '..');
var ENV = process.env.npm_lifecycle_event.split(':')[0];
var isProd = (ENV === 'prod');

var setFreeVar = function(key, value){
    var env = {};
    env[key] = JSON.stringify(value);
    return env;
};

var setGlobalEnv = function(){
    return setFreeVar('globalENV', globalConfig[ENV]);
};

module.exports = function makeWebpackConfig(){
    var config = {};
    var productConfigList = [];

    config = {
        context: rootPath + '/js/src',
        entry: {
            app: './app.changePW.js',
            vendor: [
                'angular',
                'oclazyload',
                'angular-cookies',
                'angular-sanitize',
                'angular-translate',
                'angular-translate-loader-static-files',
                'ngstorage',
                'html5shiv',
                'jquery-migrate'
            ]
        },
        output: {
            path: rootPath + '/build/changePW',
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
                '_': "lodash"
            }),
            new webpack.DefinePlugin(setGlobalEnv())
        ],
        devServer: {
            contentBase: './build/changePW'
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
