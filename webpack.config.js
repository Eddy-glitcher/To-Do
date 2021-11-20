/* // hay que isntalar esto:
//$ npm i -D html-loader html-webpack-plugin

const HtmlWebpackPlugin = require('html-webpack-plugin'); //Para cargar archivos de otros paquetes
const MiniCssExtract = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true // Borra todo en dist y lo vuelve a crear en la carpeta dist
    },

    module: {
        rules: [ // Las reglas sirven para decirle al webpack que hacer con sierto tipooos de archivos
            {
                test: /\.html$/i, //la condicion a evaluar cuando webpack tiene que hacer cuadno evalue archivo por archivo mediante expresiones regulares
                loader: 'html-loader',
                options: {
                    minimize:false,
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: '/styles.css$/',
                use: ['style-loader','css-loader']
            },
            {
                test: /\.css$/i,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Mi Webpack App',
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),

        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        })
    ]
} 
 */

const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
 
    mode: 'development',
    module: {
        rules:[
            {
                test: /\.css$/,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MinicssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            },
                {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    sources: false,
                },
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MinicssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" }
            ],
          }),
    ]
 
}