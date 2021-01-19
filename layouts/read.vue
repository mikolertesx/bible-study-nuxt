<template>
  <div class="h-screen flex flex-row">
    <sidebar></sidebar>
    <div class="h-screen flex-grow flex flex-col overflow-hidden">
      <read-header></read-header>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import ReadHeader from '~/components/layout/Headers/ReadHeader.vue'
import Sidebar from '~/components/ui/sidebar.vue'
export default {
  components: { ReadHeader, Sidebar },
  mounted() {
    this.$store.dispatch('read/loadNotes')
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

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.content {
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  overflow: hidden;
}
</style>
