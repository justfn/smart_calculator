
const path = require("path")

module.exports = {
  entry: {
    main: './src/main.js', 
  },
  // output: {
  //   publicPath: './',
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'window.$fd_compile' },],
              '@babel/plugin-proposal-class-properties',
            ]
          },
        }, 
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // modules: true, 
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: '0.0.0.0',
    port: 9001,
    open: true, 
  },
}



