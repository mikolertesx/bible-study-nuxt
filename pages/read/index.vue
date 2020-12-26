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
  components: { bible, tools },
  async asyncData({ $axios }) {
    const response = await $axios.$get(
      'https://ajith-holy-bible.p.rapidapi.com/GetChapter',
      {
        headers: {
          'x-rapidapi-key': process.env.key,
          'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
          useQueryString: true,
        },
        params: {
          Book: 'Psalms',
          Chapter: '119',
        },
      }
    )
    const verses = response.Output.replace(/&lt;\w+&gt;/g, '')
      .split(/\d+/)
      .filter((verse) => verse.trim() !== '')
      .map((verse, index) => {
        return { id: index, text: verse.trim(), selected: false }
      })

    return {
      verses,
    }
  },
}
</script>

<style scoped>
.main-bible-space {
  background: url('~@/static/bg/bg-black-pattern.png');
}
</style>
