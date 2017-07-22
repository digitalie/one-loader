const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin('public/app.css');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: __dirname + "/public",
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.one$/,
                loader: '../../src',
                options: {
                    map: {
                        'text/scss': 'style-loader!css-loader!sass-loader',
                        'javascript': 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    // plugins: [
    //     extractSass
    // ]
};
