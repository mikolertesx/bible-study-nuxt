<template>
  <header class="fixed left-0 top-0 w-screen p-2">
    <nav class="flex justify-between px-4">
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
  data() {
    return {
      selectedBook: 'Psalms',
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
      if (this.selectedBook === '') {
        return null
      }
      const filteredBook = booksInOrder.find(
        (book) => book.name === this.selectedBook
      )
      return filteredBook.chapters
    },
  },
  watch: {
    selectedBook(newBook, oldBook) {
      if (newBook !== oldBook) {
        this.$store.dispatch('read/setCurrentBook', newBook)
        this.selectedChapter = '1'
      }
    },
    selectedChapter(value) {
      this.$store.dispatch('read/setCurrentChapter', value)
    },
    chapterState(value) {
      console.log('Chapter changed state wide')
      this.selectedChapter = value
    },
  },
}
</script>

<style scoped>
header {
  background: #000000;
}
</style>
