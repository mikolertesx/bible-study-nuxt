<template>
  <main class="flex box-border h-full">
    <div
      class="w-full md:w-1/2 lg:w-5/6 p-6 pt-0 pb-0 pr-0 box-border main-bible-space"
    >
      <bible :verses="verses"></bible>
    </div>
    <div class="hidden md:block md:w-1/2 h-full">
      <tools></tools>
    </div>
  </main>
</template>
<script>
import bible from '~/components/read/bible.vue'
import tools from '~/components/read/tools.vue'
export default {
  layout: 'read',
  components: { bible, tools },
  computed: {
    verses() {
      return this.$store.getters['read/verses']
    },
    chapter() {
      return this.$store.getters['read/chapter']
    },
    book() {
      return this.$store.getters['read/book']
    },
  },
  watch: {
    chapter() {
      this.updateQuery()
    },
    book() {
      this.updateQuery()
    },
  },
  mounted() {
    const book = this.$route.query.book
    const chapter = this.$route.query.chapter
    this.getVerses(book, chapter)
    this.updateVerses(book, chapter)
  },
  methods: {
    getVerses(book, chapter) {
      this.$store.dispatch('read/getAndUpdateVerses', { book, chapter })
    },
    updateVerses(book, chapter) {
      this.getVerses(book, chapter)
      this.updateQuery(book, chapter)
    },
    updateQuery(book = this.book, chapter = this.chapter) {
      const currentQueryBook = this.$route.query.book
      const currentChapterBook = this.$route.query.chapter
      const fixedBook = book || this.$store.getters['read/book']
      const fixedChapter = chapter || this.$store.getters['read/chapter']

      if (
        currentQueryBook !== fixedBook &&
        currentChapterBook !== fixedChapter
      ) {
        this.$router.replace({
          query: {
            ...this.$route.query,
            book: fixedBook,
            chapter: fixedChapter,
          },
        })
      }
    },
  },
}
</script>

<style scoped>
.main-bible-space {
  background: url('~@/static/bg/bg-black-pattern.png');
}
</style>
