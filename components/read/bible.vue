<template>
  <div class="bg-white rounded-lg rounded-r-none h-full">
    <div v-if="!isLoading" class="h-full overflow-y-scroll">
      <p
        v-for="(verse, index) in verses"
        :key="verse.id"
        :style="{ backgroundColor: verse.background || 'none' }"
        class="align-text-bottom select-none cursor-text mb-1 p-4 text-lg"
        :class="{ 'ml-2': index !== 0, 'ml-0': index === 0, inline: false }"
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
    <div v-else class="flex justify-center items-center min-h-screen">
      <spinner></spinner>
    </div>
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
  computed: {
    isLoading() {
      return this.$store.getters['read/loading']
    },
  },
  methods: {
    selectVerse(id) {
      this.$store.dispatch('read/selectVerse', id)
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
