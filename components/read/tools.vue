<template>
  <div class="w-full h-full overflow-y-auto">
    <div class="p-4">
      <p class="text-center mt-8">Tools</p>
      <div v-if="selectedVerses.length === 0">
        <p class="text-gray-600 text-center">No verse has been selected.</p>
      </div>
      <div v-else-if="selectedVerses.length === 1">
        <p class="text-center text-gray-600">One verse selected</p>
        <p>{{ selectedVerses[0].text }}</p>
        <textarea
          v-model="note"
          class="w-full border-4 rounded-b outline-none p-4"
        ></textarea>
      </div>
      <div v-else>
        <p class="text-center text-gray-600">Multiple verses were selected.</p>
        <p v-for="verse in selectedVerses" :key="verse.id" class="mb-2">
          {{ verse.text }}
        </p>
        <textarea
          v-model="note"
          class="w-full border-4 rounded-b outline-none p-4"
        ></textarea>
      </div>
      <div class="controls">
        <app-button
          :enabled="note.length > 0 && selectedVerses.length !== 0"
          class="w-full p-4 mt-4"
          @click="saveNote"
          >Save</app-button
        >
      </div>
      <div class="notes">
        <div v-for="savedNote in savedNotes" :key="savedNote.id" class="note">
          <div class="verses">
            <p>Verses inside:</p>
            <p
              v-for="verse in savedNote.verses"
              :key="verse.id"
              style="display: inline"
            >
              {{ verse.id + 1 }},
            </p>
            <p style="display: inline">
              From {{ savedNote.verses[0].originBook }}
            </p>
            <hr />
          </div>
          <p>
            {{ savedNote.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
