<template>
  <main class="flex-auto flex flex-row overflow-hidden">
    <div class="flex-auto h-full overflow-y-scroll">
      <bible :verses="verses"></bible>
    </div>
    <div class="w-96 flex-none">
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
    $route(to) {
      const { book, chapter } = to.query
      this.getVerses(book, chapter)
    },
  },
  mounted() {
    const book = this.$route.query.book
    const chapter = this.$route.query.chapter
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
      this.$router.push({
        query: {
          ...this.$route.query,
          book,
          chapter,
        },
      })
      // }
    },
  },
}
</script>
