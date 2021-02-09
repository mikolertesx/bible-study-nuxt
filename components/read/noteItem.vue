<template>
  <div
    class="verses p-4 border border-blue-700 shadow-lg rounded-lg m-4 relative"
  >
    <p
      class="absolute right-0 top-0 m-1 mr-4 text-red-900 cursor-pointer"
      @click="removeId(note.id)"
    >
      Delete note.
    </p>
    <div class="p-4">
      <p
        v-for="verse in note.verses"
        :key="`verse-${verse.id}`"
        class="text-gray-500 m-4"
      >
        {{ verse.text }}
      </p>
    </div>
    <p
      v-for="verse in note.verses"
      :key="verse.id"
      class="inline text-gray-800"
    >
      {{ +verse.id + 1 }},
    </p>
    <nuxt-link :to="link">
      <p class="inline text-blue-400">
        {{ book }}
        {{ chapter }}
      </p>
    </nuxt-link>
    <p
      v-for="(textSection, index) in splitText"
      :key="`text-section-${index}`"
      class="m-2"
    >
      {{ textSection }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chapter() {
      return this.note.verses[0].originChapter
    },
    book() {
      return this.note.verses[0].originBook
    },
    link() {
      return `/read?book=${this.book}&chapter=${this.chapter}`
    },
    splitText() {
      return this.note.text.split('\n')
    },
  },
  methods: {
    ...mapActions('notes', { removeId: 'removeNote' }),
  },
}
</script>
