<template>
  <button
    class="px-4 rounded text-white h-full"
    :class="{
      'bg-blue-800': !enabled,
      'border-solid': !enabled,
      'bg-blue-500': enabled,
      'cursor-default': !enabled,
    }"
    :disabled="!enabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClick($e) {
      this.$emit('click', $e)
    },
  },
}
</script>
