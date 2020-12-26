<template>
  <main class="flex">
    <div
      class="w-full md:w-1/2 lg:w-5/6 p-6 pr-0 box-border overflow-y-auto h-screen"
      style="background-color: #5e3a2a"
    >
      <bible :verses="verses"></bible>
    </div>
    <div class="hidden md:block md:w-1/2">
      <p>Herramientas</p>
    </div>
  </main>
</template>
<script>
import bible from '~/components/read/bible.vue'
export default {
  components: { bible },
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
