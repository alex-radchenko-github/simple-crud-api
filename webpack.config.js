const path = require('path');

module.exports = {
    entry: './index.js',
    mode: 'production',
    target: 'node',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true,
    },
};