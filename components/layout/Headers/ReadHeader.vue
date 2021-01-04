<template>
  <header class="fixed left-0 top-0 w-screen p-2 h-16">
    <nav class="flex justify-between box-border py-1 px-4 item-center h-full">
      <select v-model="selectedBook">
        <option v-for="option in options" :key="option.id" :value="option.name">
          {{ option.name }}
        </option>
      </select>
      <div>
        <button
          class="px-4 rounded text-white h-full"
          :class="{
            'bg-blue-800': isFirstChapter,
            'border-solid': isFirstChapter,
            'bg-blue-500': !isFirstChapter,
            'cursor-default': isFirstChapter,
          }"
          :disabled="isFirstChapter"
          @click="goPrev"
        >
          Back
        </button>
        <select
          v-if="chapters !== null"
          v-model="selectedChapter"
          class="h-full"
        >
          <option v-for="chapter in chapters" :key="chapter" :value="chapter">
            {{ chapter }}
          </option>
        </select>
        <button
          class="px-4 rounded text-white h-full"
          :class="{
            'bg-blue-800': isLastChapter,
            'border-solid': isLastChapter,
            'bg-blue-500': !isLastChapter,
            'cursor-default': isLastChapter,
          }"
          :disabled="isLastChapter"
          @click="goNext"
        >
          Next
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import { booksInOrder } from '~/util/bibleBooks'
// TODO Add the next and prev button
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
