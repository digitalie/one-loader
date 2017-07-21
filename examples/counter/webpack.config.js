module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.one$/,
                loader: '../../src',
                options: {
                    map: {
                        'text/css': 'style-loader!css-loader',
                        javascript: 'babel-loader'
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
