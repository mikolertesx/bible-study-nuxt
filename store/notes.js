import Note from '@/models/note'

export const state = () => {
  return {
    notes: [],
    filters: {},
    filterByChapter: true,
  }
}

export const mutations = {
  createNote(state, newNote) {
    state.notes.push(newNote)
  },
  removeNote(state, id) {
    state.notes = state.notes.filter((note) => note.id !== id)
  },
  clearNotes(state) {
    state.notes = []
  },
  setFilters(state, filters) {
    state.filters = filters
  },
  setFilter(state, filter) {
    state.filterByChapter = filter
  },
}

export const actions = {
  async createNote({ commit, rootGetters }, { text, verses }) {
    if (!rootGetters['auth/isLoggedIn']) {
      alert('You have to be logged in, in order to do that')
      return
    }
    try {
      const result = await this.$axios.$post('api/notes/add-note', {
        text,
        verses,
      })
      if (result.error) {
        throw new Error(`Couldn't add post, with ${result.error}`)
      }
      const newNote = new Note(result.id, text, verses)
      console.log('Note created', result.id)
      commit('createNote', newNote)
      commit('read/unselectVerses', null, { root: true })
    } catch (err) {
      console.error(err)
    }
  },
  async removeNote({ commit }, id) {
    commit('removeNote', id)
    try {
      const result = await this.$axios.$post('api/notes/delete-note', { id })
      if (result.error) {
        throw new Error(`Couldn't delete post, with ${result.error}`)
      }
    } catch (err) {
      console.error(err)
    }
  },
  unselectNotes({ commit }) {
    commit('unselectNotes')
  },
  async loadNotes({ dispatch, state }) {
    try {
      const params = state.filterByChapter ? state.filters : null
      const { notes } = await this.$axios.$get('api/notes/notes', {
        params,
      })
      const formattedNotes = notes.map((note) => {
        return { ...note, id: note._id }
      })
      dispatch('clearNotes')
      dispatch('setNotes', formattedNotes)
    } catch (err) {
      dispatch('clearNotes')
      dispatch('setNotes', [])
    }
  },
  setNotes({ commit }, noteArray) {
    for (const note of noteArray) {
      commit('createNote', note)
    }
  },
  clearNotes({ commit }) {
    commit('clearNotes')
  },
  setFilters({ commit }, filters) {
    commit('setFilters', filters)
  },
  setFilter({ commit, dispatch }, filter) {
    switch (filter) {
      case 'chapter':
        commit('setFilter', true)
        break
      case 'all':
        commit('setFilter', false)
        break
      default:
        throw new Error('Unknown type of filter')
    }
    dispatch('loadNotes')
  },
}

export const getters = {
  notes(state) {
    const reversedNotes = [...state.notes]
    reversedNotes.reverse()
    return reversedNotes
  },
  filter(state) {
    return state.filterByChapter ? 'chapter' : 'all'
  },
}
