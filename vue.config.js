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
  pwa: {
    name: '539',
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
    },
  },
}
