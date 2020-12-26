<template>
  <header class="fixed left-0 top-0 w-screen p-2">
    <nav class="flex justify-between px-4">
      <select v-model="selectedVerse">
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
import { booksInOrder } from '~/util/bibleBooks'
export default {
  data() {
    return {
      selectedVerse: 'Psalms',
      selectedChapter: '119',
    }
  },
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
    chapters() {
      if (this.selectedVerse === '') {
        return null
      }
      const selectedBook = booksInOrder.find(
        (book) => book.name === this.selectedVerse
      )
      return selectedBook.chapters
    },
  },
}
</script>

<style scoped>
header {
  background: #000000;
}
</style>
