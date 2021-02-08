<template>
  <header class="w-full p-2 h-auto md:h-16 flex-none">
    <nav
      class="flex flex-col md:flex-row justify-around md:justify-between items-center md:items-stretch box-border space-y-4 md:space-y-0 py-1 px-4 item-center w-full h-full"
    >
      <select v-model="selectedBook" class="w-full md:w-auto h-8 my-auto">
        <option v-for="option in options" :key="option.id" :value="option.name">
          {{ option.name }}
        </option>
      </select>
      <div class="flex md:block w-full md:w-auto justify-around">
        <app-button :enabled="!isFirstChapter" @click="goPrevAction">
          <p class="hidden md:inline">Back</p>
          <SolidChevronLeftIcon
            class="inline md:hidden h-8"
          ></SolidChevronLeftIcon>
        </app-button>
        <select
          v-if="chapters !== null"
          v-model="selectedChapter"
          class="h-full flex-grow mx-4"
        >
          <option v-for="chapter in chapters" :key="chapter" :value="chapter">
            {{ chapter }}
          </option>
        </select>
        <app-button :enabled="!isLastChapter" @click="goNextAction">
          <p class="hidden md:inline">Next</p>
          <SolidChevronRightIcon
            class="inline md:hidden h-8"
          ></SolidChevronRightIcon>
        </app-button>
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
    goNextAction() {
      this.goNext()
      this.$router.push({
        query: {
          ...this.$route.query,
          book: this.selectedBook,
          chapter: this.selectedChapter,
        },
      })
    },
    goPrevAction() {
      this.goPrev()
      this.$router.push({
        query: {
          ...this.$route.query,
          book: this.selectedBook,
          chapter: this.selectedChapter,
        },
      })
    },
  },
}
</script>

<style scoped>
header {
  background: #000000;
}
</style>
