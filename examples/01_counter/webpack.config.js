module.exports = {
    entry: {
        index: './index.js'
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
                        'text/css': ['style-loader', 'css-loader'],
                        'javascript': 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
