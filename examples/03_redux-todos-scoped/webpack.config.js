const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin('app.css');

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
                loader: 'one-loader',
                options: {
                    map: {
                        'text/scss': extractSass.extract('css-loader?modules=true!sass-loader'),
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
    plugins: [
        extractSass
    ]
};
