<template>
  <header class="fixed left-0 top-0 w-screen p-2 h-16">
    <nav class="flex justify-between box-border py-1 px-4 item-center h-full">
      <select v-model="selectedBook">
        <option v-for="option in options" :key="option.id" :value="option.name">
          {{ option.name }}
        </option>
      </select>
      <select v-if="chapters !== null" v-model="selectedChapter">
        <option v-for="chapter in chapters" :key="chapter" :value="chapter">
          {{ chapter }}
        </option>
      </select>
    </nav>
  </header>
</template>

<script>
// TODO Replace v-model, it's not a good solution when trying to sync it with Vuex
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
      return filteredBook.chapters
    },
  },
}
</script>

<style scoped>
header {
  background: #000000;
}
</style>