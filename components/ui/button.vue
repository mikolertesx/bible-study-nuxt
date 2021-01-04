<template>
  <button
    class="px-4 rounded text-white h-full"
    :class="{
      'bg-blue-800': !enabled,
      'border-solid': !enabled,
      'bg-blue-500': enabled,
      'cursor-default': !enabled,
    }"
    :disabled="enabled"
    @click="click"
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
    click: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
