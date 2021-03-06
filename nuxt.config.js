export default {
  head: {
    title: 'study-bible',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Read the bible with your friends!',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['@/assets/global.css'],
  plugins: [
    '~plugins/core-components.js',
    '~plugins/document-listener.js',
    '~plugins/initial-setup.js',
    '~plugins/axios.js',
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxt-hero-icons/outline/nuxt',
    '@nuxt-hero-icons/solid/nuxt',
  ],
  modules: ['@nuxtjs/axios'],
  axios: { baseUrl: process.env.baseUrl || '' },
  env: {
    baseUrl: process.env.baseUrl || '',
  },
  build: {},
  serverMiddleware: ['~/api/index.js'],
}
