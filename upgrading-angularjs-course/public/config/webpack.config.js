const path = require('path');
const wMerge = require('webpack-merge');

module.exports = (env) => {
    const common = {
        entry: './app.ts',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/',
        },
        mode: 'development',
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
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'dist/',
                            },
                        },
                        {
                            loader: '@peterek/extract-loader',
                        },
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
    };

    const dev = {
        devtool: 'source-map',
        devServer: {
            contentBase: './',
            port: 9000,
            proxy: {
                '/api': {
                    target: 'http://[::1]:9100',
                    secure: false,
                },
            },
        },
    };

    const config = wMerge.merge(common, env.env === 'dev' ? dev : null);

    console.info(config);
    return config;
};
