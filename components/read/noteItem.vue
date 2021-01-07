<template>
  <!--  v-for="savedNote in savedNotes" :key="savedNote.id" -->
  <div class="note">
    <div class="verses p-4 border border-blue-700 shadow-lg rounded-lg m-4">
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
        {{ verse.id + 1 }},
      </p>
      <nuxt-link :to="link">
        <p class="inline text-blue-400">
          {{ book }}
          {{ chapter }}
        </p>
      </nuxt-link>
      <p class="m-2">
        {{ note.text }}
      </p>
    </div>
  </div>
</template>

<script>
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
  },
}
</script>
