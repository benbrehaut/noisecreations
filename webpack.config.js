const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ["./web/assets/src/js/main.js"],
    output: { 
        path: __dirname + "/web/assets/dist/js",
        filename: 'main.js' 
    },
    devtool: "sourcemap",
    externals: {
        
    },    
    module: {   
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    }
}