const common = require('./webpack.common');
const wMerge = require('webpack-merge');

module.exports = (env) => {
    const envConfig = require(`./webpack.${env.env}.js`);

    const config = wMerge.merge(common, envConfig);
    console.info(config);

    return config;
};
