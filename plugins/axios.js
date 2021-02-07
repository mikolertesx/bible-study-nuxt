export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (process.server) return
    config.headers.token = store.getters['auth/token']
    return config
  })
}
