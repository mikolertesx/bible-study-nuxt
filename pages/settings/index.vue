<template>
  <div>
    <p>Settings page!</p>
    <app-button @click="logoff">Log off</app-button>
  </div>
</template>

<script>
// Add middleware to check whether or not you're authenticated
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
  },
  watch: {
    isLoggedIn(loggedIn) {
      if (!loggedIn) {
        this.$router.push('/')
      }
    },
  },
  methods: {
    ...mapActions('auth', ['logoff']),
  },
}
</script>
