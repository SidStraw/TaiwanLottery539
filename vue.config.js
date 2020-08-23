const path = require('path')
module.exports = {
  runtimeCompiler: true,
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [path.join(__dirname, 'src')],
          options: {
            fix: true,
          },
        },
      ],
    },
  },
}
