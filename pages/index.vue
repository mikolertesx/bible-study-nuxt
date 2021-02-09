<template>
  <div class="container">
    <h1 class="title text-3xl md:text-6xl">Have a reading club!</h1>
    <p class="subtitle">Gather up and have fun reading the bible</p>
    <p>In this hard times there's no better use of your time</p>
    <div
      class="controls flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 mx-auto mt-4 w-3/4 justify-center"
    >
      <app-button
        v-if="!isLoggedIn"
        :class="buttonClass"
        @click="$router.push({ path: '/auth', query: { mode: 'register' } })"
        >Register</app-button
      >
      <app-button
        v-if="!isLoggedIn"
        :class="buttonClass"
        @click="$router.push({ path: '/auth', query: { mode: 'login' } })"
        >Login</app-button
      >
      <app-button :class="buttonClass" @click="$router.push('/read')"
        >Start reading</app-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      buttonClass: 'px-4 py-4 flex-grow',
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
  },
  methods: {
    redirect(newAdress, redirect = false) {
      if (redirect) {
        alert('This route is not yet fully implemented.')
      }
      this.$router.push(newAdress)
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  /* font-size: 100px; */
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
