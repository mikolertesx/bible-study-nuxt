<template>
  <nuxt-link
    v-if="!disabled"
    :to="link"
    :exact="exact"
    class="w-full block p-4 outline-none border-2 border-transparent hover:border-blue-400"
    active-class="bg-blue-400"
  >
    <slot></slot>
  </nuxt-link>
  <a
    v-else
    class="w-full block p-4 outline-none border-2 border-transparent bg-gray-700"
  >
    <slot></slot>
  </a>
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
