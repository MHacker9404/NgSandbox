module.exports = {
    devtool: 'source-map',
    mode: 'development',
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
