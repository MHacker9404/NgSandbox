const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './app.ts',
    entry: {
        app: './app.ts',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            // minSize: 20000,
            // maxSize: 0,
            // minChunks: 1,
            // maxAsyncRequests: 30,
            // maxInitialRequests: 30,
            // automaticNameDelimiter: '~',
            // enforceSizeThreshold: 50000,
            // cacheGroups: {
            //     defaultVendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -10,
            //     },
            //     default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true,
            //     },
            // },
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: '[name].[ext]',
                    //     },
                    // },
                    // {
                    //     loader: '@peterek/extract-loader',
                    // },
                    {
                        loader: 'html-loader',
                    },
                ],
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
};
