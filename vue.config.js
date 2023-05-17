const fs = require('fs')
module.exports = {
  devServer: {
    proxy : 'https://api.example.com:4000',
    host: 'example.com',
    port:443,
    disableHostCheck: true,
    https: true,
    key: fs.readFileSync('./ssl/example.com.key'),
    cert: fs.readFileSync('./ssl/example.com.crt'),
    hotOnly: false,
  },
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },

  lintOnSave: false,
}
