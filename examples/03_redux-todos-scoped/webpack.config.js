const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: __dirname + "/public",
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.one$/,
                loader: 'one-loader',
                options: {
                    map: {
                        'text/scss': [MiniCssExtractPlugin.loader, 'css-loader?modules=true', 'sass-loader'],
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
        new MiniCssExtractPlugin({ filename: 'app.css' })
    ]
};
