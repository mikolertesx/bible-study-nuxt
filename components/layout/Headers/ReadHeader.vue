<template>
  <header class="w-full p-2 h-16 flex-none">
    <nav class="flex justify-between box-border py-1 px-4 item-center h-full">
      <select v-model="selectedBook">
        <option v-for="option in options" :key="option.id" :value="option.name">
          {{ option.name }}
        </option>
      </select>
      <div>
        <app-button :enabled="!isFirstChapter" @click="goPrev">Back</app-button>
        <select
          v-if="chapters !== null"
          v-model="selectedChapter"
          class="h-full"
        >
          <option v-for="chapter in chapters" :key="chapter" :value="chapter">
            {{ chapter }}
          </option>
        </select>
        <app-button :enabled="!isLastChapter" @click="goNext">Next</app-button>
      </div>
    </nav>
  </header>
</template>

<script>
import { booksInOrder } from '~/util/bibleBooks'
export default {
  computed: {
    options() {
      return booksInOrder.map((book, index) => {
        return {
          id: index,
          name: book.name,
          chapters: book.chapters,
        }
      })
    },
    selectedBook: {
      get() {
        return this.$store.getters['read/book']
      },
      set(value) {
        return this.$store.dispatch('read/setCurrentBook', value)
      },
    },
    selectedChapter: {
      get() {
        return this.$store.getters['read/chapter']
      },
      set(value) {
        return this.$store.dispatch('read/setCurrentChapter', value)
      },
    },
    chapters() {
      if (this.selectedBook === '') {
        return null
      }
      const filteredBook = booksInOrder.find(
        (book) => book.name === this.selectedBook
      )
      return filteredBook ? filteredBook.chapters : null
    },
    isLastChapter() {
      return this.$store.getters['read/isLastChapter']
    },
    isFirstChapter() {
      return this.$store.getters['read/isFirstChapter']
    },
  },
  methods: {
    goNext() {
      this.$store.dispatch('read/nextChapter')
    },
    goPrev() {
      this.$store.dispatch('read/previousChapter')
    },
  },
}
</script>

<style scoped>
header {
  background: #000000;
}
</style>
