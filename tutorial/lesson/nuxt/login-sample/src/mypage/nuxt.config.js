module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'mypage',
    titleTemplate: '%s | Nuxt.js tag items viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {

  },
  plugins:[
    '~/plugins/axios.js'
  ],
  // セキュリティ上、マシンの環境変数をアプリケーションに渡すことはない。
  // 渡したい場合、以下のように、明示的に渡す必要がある。
  env: {
    QIITA_TOKEN: process.env.QIITA_TOKEN
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    middleware: [
      'auth'
    ]
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}

