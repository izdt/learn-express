var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/scripts/index'],
    output: {
        path: __dirname + '/dist/scripts',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                include: path.join(__dirname, 'src'), 
                loaders: ['babel-loader']
            },
            { test: /(\.css)$/, loaders: ['style', 'css'] },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    devServer: {
        contentBase: './src'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
};