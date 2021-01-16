<template>
  <div class="w-full h-full overflow-y-auto">
    <div class="p-4">
      <p class="text-center mt-8">Tools</p>
      <template v-if="selectedVerses.length === 0">
        <p class="text-gray-600 text-center">No verse has been selected.</p>
      </template>
      <div v-else-if="selectedVerses.length === 1">
        <p class="text-center text-gray-600">One verse selected</p>
        <p>{{ selectedVerses[0].text }}</p>
        <textarea
          v-model="note"
          class="w-full border-4 rounded-b outline-none p-4"
        ></textarea>
      </div>
      <template v-else>
        <p class="text-center text-gray-600">Multiple verses were selected.</p>
        <div class="px-8 py-2">
          <p v-for="verse in selectedVerses" :key="verse.id" class="mb-2">
            {{ verse.text }}
          </p>
        </div>
        <textarea
          v-model="note"
          class="w-full border-4 rounded-b outline-none p-4 resize-none"
        ></textarea>
      </template>
      <div class="controls">
        <app-button
          :enabled="note.length > 0 && selectedVerses.length !== 0"
          class="w-full p-4 mt-4"
          @click="saveNote"
          >Save</app-button
        >
      </div>
      <div class="notes">
        <note-item
          v-for="savedNote in savedNotes"
          :key="savedNote.id"
          :note="savedNote"
        ></note-item>
      </div>
    </div>
  </div>
</template>

<script>
import noteItem from '@/components/read/noteItem'
export default {
  components: {
    noteItem,
  },
  data() {
    return {
      note: '',
    }
  },
  computed: {
    selectedVerses() {
      return this.$store.getters['read/selectedVerses']
    },
    savedNotes() {
      return this.$store.getters['read/notes']
    },
  },
  methods: {
    saveNote() {
      this.$store.dispatch('read/createNote', {
        id: null,
        text: this.note,
        verses: [...this.selectedVerses],
      })

      this.note = ''
    },
  },
}
</script>
