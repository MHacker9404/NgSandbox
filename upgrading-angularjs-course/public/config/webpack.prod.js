const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            name: true,
        },
    },
};
