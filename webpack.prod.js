
const HtmlWebPackPlugin         = require('html-webpack-plugin');                           //      Permite mover el archivo index.html a la carpeta DIST
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');                       //      Ayuda a tener el archivo CSS como archivo independiente
const OptimizeCssAssetsPlugin   = require('optimize-css-assets-webpack-plugin');            //      Para que el archivo CSS esta minimizado
const CopyPlugin                = require('copy-webpack-plugin');                           //      Antes, la carga de las imagenes funcionaban con el file loader
const MinifyPlugin              = require('babel-minify-webpack-plugin');                   //      Ahora necesitare otro paquete para pasarlos al DIST
const { CleanWebpackPlugin }    = require('clean-webpack-plugin');                          //      Al ponerlo entre llaves quuiere decir que de ese plugin, solo quiero esa funcion :      CleanWebpackPlugin
                                                                                            //      Es decir. lo estoy desestructurizando
module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
        filename: 'main.[contenthash].js'
        //  path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                //      Como Babel trabaja en base a JavaScript, solo afectara a los archivos de JavaScript
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
            {
                //      Aqui se configura a los archivos CSS
                test: /\.css$/,
                //      Ahora debo excluir el archiov styles.css de la evaluacion general CSS en style-loader
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                /*
                    Aunque sea un archivo CSS, debo manejarlo de manera diferente
                    Esto se aplicara solo con este archivo
                */
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                },
            },
            {
                //      Aqui pondre una regla que evalue cualquier imagen
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        //      Escribo una nota, salio error y es porque Herrera no escribio patterns
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ]
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()                                                                //      Plugin agregado para limpiar la carpeta DIST
    ]
}
