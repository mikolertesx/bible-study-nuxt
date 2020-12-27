<template>
  <main class="flex">
    <div
      class="w-full md:w-1/2 lg:w-5/6 p-6 pr-0 box-border overflow-y-auto h-screen main-bible-space"
    >
      <bible :verses="verses"></bible>
    </div>
    <div class="hidden md:block md:w-1/2 h-screen">
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
  data() {
    const selectedBook = 'Psalms'
    const selectedChapter = '119'
    return {
      selectedBook,
      selectedChapter,
    }
  },
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
  mounted() {
    this.updateVerses()
  },
  methods: {
    getVerses(book, chapter) {
      this.$store.dispatch('read/getVerses', { book, chapter })
    },
    updateVerses() {
      this.getVerses(this.selectedBook, this.selectedChapter)
    },
  },
}
</script>

<style scoped>
.main-bible-space {
  background: url('~@/static/bg/bg-black-pattern.png');
}
</style>
