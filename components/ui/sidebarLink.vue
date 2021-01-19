<template>
  <nuxt-link
    :to="link"
    :exact="exact"
    class="block p-4"
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
