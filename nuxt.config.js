export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'study-bible',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: ['~plugins/core-components.js'],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/axios'],

  axios: {},

  build: {},

  env: {
    key: process.env.BIBLE_KEY,
  },
}
