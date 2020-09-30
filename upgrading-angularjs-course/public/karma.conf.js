const commonConfig = require('./config/webpack.common');
const devConfig = require('./config/webpack.dev');
const wMerge = require('webpack-merge');
const wpConfig = wMerge.merge(commonConfig, devConfig);

console.info(wpConfig);

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['webpack.tests.js'],
        // exclude: ['node_modules/**/*.spec.js'],
        preprocessors: {
            'webpack.tests.js': ['webpack'],
        },
        webpack: {
            mode: wpConfig.mode,
            resolve: wpConfig.resolve,
            module: wpConfig.module,
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity,
    });
};
