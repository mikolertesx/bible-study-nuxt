<template>
  <div class="h-screen flex flex-row">
    <sidebar></sidebar>
    <div class="h-screen flex-grow flex flex-col">
      <read-header></read-header>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ReadHeader from '~/components/layout/Headers/ReadHeader.vue'
import Sidebar from '~/components/ui/sidebar.vue'
export default {
  components: { ReadHeader, Sidebar },
  mounted() {
    this.loadNotes()
  },
  methods: {
    ...mapActions('read', ['loadNotes']),
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
