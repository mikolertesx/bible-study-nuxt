<template>
  <main class="flex-auto flex flex-row h-0">
    <div class="flex-auto overflow-y-scroll">
      <bible :verses="verses"></bible>
    </div>
    <div class="hidden md:block w-96 flex-none">
      <tools></tools>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bible from '~/components/read/bible.vue'
import tools from '~/components/read/tools.vue'
export default {
  layout: 'read',
  components: { bible, tools },
  computed: {
    ...mapGetters('read', ['verses', 'chapter', 'book']),
  },
  watch: {
    $route(to) {
      const { book, chapter } = to.query
      this.getVerses({ book, chapter })
    },
  },
  mounted() {
    const book = this.$route.query.book
    const chapter = this.$route.query.chapter
    this.updateVerses(book, chapter)
  },
  methods: {
    ...mapActions('read', { getVerses: 'getAndUpdateVerses' }),
    updateVerses(book, chapter) {
      this.getVerses({ book, chapter })
      this.updateQuery({ book, chapter })
    },
    updateQuery({ book = this.book, chapter = this.chapter }) {
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
