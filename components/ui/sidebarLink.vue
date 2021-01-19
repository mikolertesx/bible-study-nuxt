<template>
  <nuxt-link
    :to="link"
    :exact="exact"
    class="w-full block p-4 outline-none border-2 border-transparent hover:border-blue-400"
    active-class="bg-blue-400"
  >
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: '/',
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
