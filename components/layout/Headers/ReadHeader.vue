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
import { mapGetters, mapActions } from 'vuex'
import { booksInOrder } from '~/util/bibleBooks'
export default {
  computed: {
    ...mapGetters('read', [
      'book',
      'chapter',
      'isLastChapter',
      'isFirstChapter',
    ]),
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
        return this.book
      },
      set(value) {
        return this.setBook(value)
      },
    },
    selectedChapter: {
      get() {
        return this.chapter
      },
      set(value) {
        return this.setChapter(value)
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
  },
  methods: {
    ...mapActions('read', {
      goNext: 'nextChapter',
      goPrev: 'previousChapter',
      setChapter: 'setCurrentChapter',
      setBook: 'setCurrentBook',
    }),
  },
}
</script>

<style scoped>
header {
  background: #000000;
}
</style>
