<template>
  <button
    class="px-4 rounded text-white h-full"
    :class="{
      [disabledColor]: !enabled,
      'border-solid': !enabled,
      [color]: enabled,
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
    color: {
      type: String,
      default: 'bg-blue-500',
    },
    disabledColor: {
      type: String,
      default: 'bg-blue-800',
    },
  },
  methods: {
    onClick($e) {
      this.$emit('click', $e)
    },
  },
}
</script>
