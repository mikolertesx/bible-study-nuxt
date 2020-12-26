<template>
  <main class="flex">
    <div class="bg-gray-500 w-full md:w-1/2 min-h-screen">
      <p
        v-for="(verse, index) in verses"
        :key="verse.id"
        :style="{ backgroundColor: verse.background || 'none' }"
        class="align-text-bottom select-none cursor-text"
        :class="{
          'text-wavy': verse.selected,
        }"
        @click="selectVerse(verse.id)"
      >
        <span
          class="ml-4 mr-2"
          :class="{
            'text-5xl': index === 0,
            'text-3xl': index !== 0,
          }"
        >
          {{ index + 1 }}</span
        >
        {{ verse.text }}
      </p>
    </div>
    <div class="hidden md:block md:w-1/2">
      <p>Herramientas</p>
    </div>
  </main>
</template>
<script>
export default {
  // data() {
  //   return {
  //     verses: [
  //       {
  //         id: 1,
  //         text: 'Jesucristo, nos ha dado todo para que seamos hijos suyos.',
  //         selected: false,
  //       },
  //       {
  //         id: 2,
  //         text: 'Es realmente importante recordar.',
  //         selected: false,
  //       },
  //     ],
  //   }
  // },
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

    console.log(response)

    return {
      verses: [
        {
          id: 1,
          text: 'Jesucristo, nos ha dado todo para que seamos hijos suyos.',
          selected: false,
        },
        {
          id: 2,
          text: 'Es realmente importante recordar.',
          selected: false,
        },
      ],
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
