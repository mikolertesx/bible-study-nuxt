<template>
  <div class="w-full">
    <p class="text-center mt-8">Tools</p>
    <div v-if="selectedVerses.length === 0">
      <p class="text-gray-600 text-center">No verse has been selected.</p>
    </div>
    <div v-else-if="selectedVerses.length === 1">
      <p class="text-center text-gray-600">One verse selected</p>
      <p>{{ selectedVerses[0].text }}</p>
    </div>
    <div v-else>
      <p class="text-center text-gray-600">Multiple verses were selected.</p>
      <p v-for="verse in selectedVerses" :key="verse.id">{{ verse.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedVerses() {
      return this.$store.getters['read/selectedVerses']
    },
  },
}
</script>
