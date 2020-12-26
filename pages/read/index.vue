<template>
  <main class="flex">
    <div
      class="container w-full md:w-1/2 p-2 box-border overflow-scroll h-screen"
    >
      <div
        class="bg-gray-500 min-h-screen rounded-lg rounded-r-none overflow-hidden"
      >
        <p
          v-for="(verse, index) in verses"
          :key="verse.id"
          :style="{ backgroundColor: verse.background || 'none' }"
          class="align-text-bottom select-none cursor-text mb-8 ml-8 p-4"
          @click="selectVerse(verse.id)"
        >
          <span
            class="mr-2 no-underline"
            :class="{
              'text-5xl': index === 0,
              'text-xl': index !== 0,
            }"
          >
            {{ index + 1 }}</span
          >
          <span
            :class="{
              'text-wavy': verse.selected,
            }"
          >
            {{ verse.text }}
          </span>
        </p>
      </div>
    </div>
    <div class="hidden md:block md:w-1/2">
      <p>Herramientas</p>
    </div>
  </main>
</template>
<script>
export default {
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
    const verses = response.Output.replace(/&lt;\w+&gt;/, '')
      .split(/\d+/)
      .filter((verse) => verse.trim() !== '')
      .map((verse, index) => {
        return { id: index, text: verse.trim(), selected: false }
      })

    return {
      verses,
    }
  },
  methods: {
    selectVerse(id) {
      const selectedVerse = this.verses.find((verse) => verse.id === id)
      selectedVerse.selected = !selectedVerse.selected
    },
  },
}
</script>

<style scoped>
.text-wavy {
  text-decoration-style: wavy;
  text-decoration-color: '#222444';
  text-decoration-line: underline;
}
</style>
