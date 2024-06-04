// webpack.config.js
const path = require('path');

module.exports = {
    // Otras configuraciones
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer/"),
            "process": require.resolve("process/browser")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser',
        }),
    ],
    // Otras configuraciones
};
