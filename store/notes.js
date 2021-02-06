import Note from '@/models/note'

export const state = () => {
  return {
    notes: [],
  }
}

export const mutations = {
  createNote(state, newNote) {
    state.notes.push(newNote)
  },
  removeNote(state, id) {
    state.notes = state.notes.filter((note) => note.id !== id)
  },
}

export const actions = {
  createNote({ commit, dispatch }, { id, text, verses }) {
    const localContent = localStorage.getItem('notes')
    let currentNotes = []

    try {
      if (localContent !== null && localContent !== undefined) {
        currentNotes = JSON.parse(localContent)
      }
    } catch (err) {
      console.error(err)
      console.error(`Couldn't parse ${localContent.toString()}`)
    }

    const newNote = new Note(id, text, verses)
    currentNotes.push(newNote)
    localStorage.setItem('notes', JSON.stringify(currentNotes))

    commit('createNote', newNote)
    commit('read/unselectVerses', null, { root: true })
  },
  removeNote({ commit }, id) {
    commit('removeNote', id)
    const localContent = localStorage.getItem('notes')
    let currentNotes = null

    try {
      if (localContent !== null && localContent !== undefined) {
        currentNotes = JSON.parse(localContent)
      }
    } catch (err) {
      console.error(err)
    }

    if (currentNotes === null) {
      return
    }

    const newNotes = currentNotes.filter((note) => note.id !== id)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  },
  unselectNotes({ commit }) {
    commit('unselectNotes')
  },
  loadNotes({ dispatch }) {
    const localContent = localStorage.getItem('notes')
    let currentNotes = []

    try {
      if (localContent !== null && localContent !== undefined) {
        currentNotes = JSON.parse(localContent)
      }
    } catch (err) {
      console.error(err)
      console.error(`Couldn't parse ${localContent.toString()}`)
    }

    dispatch('setNotes', currentNotes)
  },
  setNotes({ commit }, noteArray) {
    for (const note of noteArray) {
      commit('createNote', note)
    }
  },
}

export const getters = {
  notes(state) {
    const reversedNotes = [...state.notes]
    reversedNotes.reverse()
    return reversedNotes
  },
}
