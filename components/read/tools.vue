<template>
  <div class="w-full">
    <p class="text-center mt-8">Tools</p>
    <div v-if="selected.length === 0">
      <p class="text-gray-600 text-center">No verse has been selected.</p>
    </div>
    <div v-else-if="selected.length === 1">
      <p class="text-center">Verse {{ selected }} selected.</p>
    </div>
    <div v-else>
      <p class="text-center">Multiple verses were selected.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>
