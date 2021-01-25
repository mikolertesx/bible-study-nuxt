<template>
  <div class="bg-white rounded-lg rounded-r-none h-full">
    <template v-if="error">
      <p class="pt-16 text-center">An error ocurred.</p>
      <p class="text-red-700 text-6xl text-center">{{ error }}</p>
    </template>
    <template v-else-if="!isLoading">
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
    </template>
    <div v-else class="flex justify-center items-center h-full">
      <spinner></spinner>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    verses: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
  computed: {
    ...mapGetters('read', {
      isLoading: 'loading',
      error: 'error',
    }),
  },
  methods: {
    ...mapActions('read', ['selectVerse']),
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
