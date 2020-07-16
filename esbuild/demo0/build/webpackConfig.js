const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');

const time = new Date().getTime();

const minify = false;

webpack({
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle_webpack.js',
        path: path.resolve(__dirname, '../dist/')
    },
    optimization: {
        minimize: minify
    },
    module: {
        rules: [
            { test: /.js$/, use: ['babel-loader'] },
        ]
    }
}, (err, stats) => {
    if (err) {
        console.log(err);
    }
    console.log(chalk.green(`【webpack】${minify ? '（压缩后）' : ''}耗时`, new Date().getTime() - time + 'ms'));
    console.log('');
})