var path = require('path');
var webpack = require('webpack');

module.exports = function getWebpackConfig() {
    return {
        entry: {
            app: ['./app/app']
        },

        output: {},

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader?stage=1',
                    exclude: /node_modules/
                },

                {
                    test: /\.jsx$/,
                    loader: 'babel-loader?stage=1',
                    exclude: /node_modules/
                },

                {
                    test: /\.styl$/,
                    loader: 'style!css?sourceMap!autoprefixer!stylus'
                },

                {
                    test: /\.css$/,
                    loader: 'style!css?sourceMap!autoprefixer'
                },

                // https://msdn.microsoft.com/en-us/library/cc848897(v=vs.85).aspx
                {
                    test: /\.(png|svg)$/,
                    loader: 'url-loader?limit=32768&mimetype=image/png'
                },

                {
                    test: /\.jpg$/,
                    loader: 'file-loader'
                }
            ]
        },

        resolve: {
            // Allow to omit extensions when requiring these files
            extensions: ['', '.js', '.jsx', '.styl'],
            modulesDirectories: ['node_modules', 'bower_components'],

            alias: {
                react: path.join(__dirname, 'node_modules/react/'),
                'react-bootstrap': path.join(__dirname, 'node_modules/react-bootstrap'),
                'sdk': path.join(__dirname, 'bower_components/gooddata/gooddata')
            }
        },

        plugins: [
            new webpack.ProvidePlugin({
                React: 'react',
                $: 'jquery/jquery'
            })
        ]
    };
};
