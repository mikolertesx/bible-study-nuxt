<template>
  <div class="h-full flex-grow flex justify-center items-center">
    <div class="flex-1 hidden lg:block h-full bible-background"></div>
    <form
      class="flex-1 h-full p-8 shadow-xl flex-shrink-0 flex flex-col justify-center"
      @submit.prevent="onSubmit"
    >
      <div class="flex items-center mb-12">
        <div class="w-24 inline-block">
          <label for="username">Username</label>
        </div>
        <input
          v-model="username"
          name="username"
          type="text"
          class="border p-4 flex-auto"
          @input="onUpdateInput"
        />
      </div>
      <div class="flex items-center mb-12">
        <div class="w-24 inline-block">
          <label for="password">Password</label>
        </div>
        <input
          v-model="password"
          name="password"
          type="password"
          class="border p-4 flex-auto"
          @input="onUpdateInput"
        />
      </div>
      <div v-if="mode === 'register'" class="flex items-center mb-12">
        <div class="w-24 inline-block">
          <label for="confirmPassword">Confirm password</label>
        </div>
        <input
          type="password"
          name="confirmPassword"
          class="border p-4 flex-auto"
          placeholder="confirm password"
        />
      </div>
      <p v-if="error" class="text-red-800">{{ error }}</p>
      <div
        class="flex flex-col lg:flex-row w-full justify-around space-y-4 lg:space-y-0 lg:space-x-4"
      >
        <app-button type="submit" class="p-4 flex-1">
          {{ mode === 'register' ? 'Register' : 'Login' }}
        </app-button>
        <app-button
          class="p-4 flex-1"
          color="bg-green-500"
          @click.prevent="changeMode(null)"
        >
          {{ mode === 'register' ? 'login' : 'register' }} instead
        </app-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      mode: 'login',
      username: '',
      password: '',
      error: null,
    }
  },
  mounted() {
    if (this.$route.query.mode === 'register') {
      this.mode = 'register'
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async onSubmit() {
      let url = 'register-user'
      if (this.mode !== 'register') {
        url = 'login-user'
      }
      try {
        const response = await this.$axios.$post(`api/auth/${url}`, {
          username: this.username,
          password: this.password,
        })
        if (response.error) {
          throw new Error(response.error)
        }
        this.login({ username: this.username, token: response.id })
        this.$router.push('/read')
      } catch (err) {
        this.error = err.message
      }
    },
    changeMode(newMode = null) {
      if (newMode === null) {
        this.mode = this.mode === 'login' ? 'register' : 'login'
      } else {
        this.mode = newMode
      }
    },
    onUpdateInput() {
      this.error = null
    },
  },
}
</script>

<style>
.bible-background {
  background-image: url('/bg/bible-bg.jpg');
  background-size: cover;
}
</style>
