<template>
  <div class="bg-white min-h-screen rounded-lg rounded-r-none overflow-hidden">
    <p
      v-for="(verse, index) in verses"
      :key="verse.id"
      :style="{ backgroundColor: verse.background || 'none' }"
      class="align-text-bottom select-none cursor-text mb-1 p-4 text-lg"
      :class="{ 'ml-2': index !== 0, 'ml-0': index === 0 }"
      @click="selectVerse(verse.id)"
    >
      <span
        class="no-underline mr-4"
        :class="{
          'text-6xl': index === 0,
          'text-xl': index !== 0,
          'bordered-cage': index === 0,
        }"
      >
        {{ index + 1 }}
      </span>
      <span
        :class="{
          'text-wavy': verse.selected,
        }"
      >
        {{ verse.text }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    verses: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
  methods: {
    selectVerse(id) {
      const selectedVerse = this.verses.find((verse) => verse.id === id)
      selectedVerse.selected = !selectedVerse.selected
    },
  },
}
</script>

<style scoped>
.text-wavy {
  text-decoration-style: solid;
  text-decoration-color: '#222444';
  text-decoration-line: underline;
  text-decoration-thickness: 5px;
  text-decoration-skip-ink: none;
  text-underline-position: under;
}
.bordered-cage {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
