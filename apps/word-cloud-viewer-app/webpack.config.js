const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");


module.exports = options => {
  return {
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      publicPath: "http://localhost:4204/",
      uniqueName: "word-cloud-generator_app"
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: ['@babel/react', '@babel/env']
              }
            },
          ],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "word-cloud-generator_app",
        filename: "remoteEntry.js",
        exposes: {
          './web-components': './src/app.js',
        },
        library: { type: "var", name: "word-cloud-generator_app" },
        shared: ["react", "react-dom"]
      })
    ],
    devServer: {
      port: 4204
    }
  }
}
