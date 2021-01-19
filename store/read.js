import Note from '@/models/note'
import { BibleSizedCache } from '@/util/SizedCache'
import { booksInOrder } from '@/util/bibleBooks'

// TODO Add cancel signal to avoid loading unnecessary requests.
const cache = new BibleSizedCache()

export const state = () => {
  return {
    currentBook: 'Psalms',
    currentChapter: '119',
    verses: [],
    notes: [],
    error: null,
    loading: false,
  }
}

export const mutations = {
  setCurrentBook(state, newBook) {
    state.currentBook = newBook
    state.currentChapter = '1'
    state.verses = []
  },
  setCurrentChapter(state, newChapter) {
    state.currentChapter = newChapter
    state.verses = []
  },
  setVerses(state, verses) {
    state.verses = verses
  },
  selectVerse(state, selectedVerseId) {
    const selectedVerse = state.verses.find(
      (verse) => verse.id === selectedVerseId
    )
    selectedVerse.selected = !selectedVerse.selected
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  createNote(state, newNote) {
    state.notes.push(newNote)
  },
  removeNote(state, id) {
    state.notes = state.notes.filter((note) => note.id !== id)
  },
  unselectVerses(state) {
    state.verses = [
      ...state.verses.map((verse) => {
        return { ...verse, selected: false }
      }),
    ]
  },
  setError(state, error) {
    state.error = error
  },
}

export const actions = {
  async getVerses({ commit, state }, { book, chapter }) {
    const cachedVerses = cache.get(book, chapter)
    if (cachedVerses !== undefined) {
      commit(
        'setVerses',
        cachedVerses.map((verse) => {
          return { ...verse, selected: false }
        })
      )
      return
    }
    commit('setLoading', true)
    try {
      commit('setError', null)
      const fetchedVerses = await this.$axios.$get('api/verses/verses', {
        params: {
          book: book || state.currentBook,
          chapter: chapter || state.currentChapter,
        },
      })
      const verses = fetchedVerses.map((verse) => {
        return { ...verse, selected: false }
      })
      cache.set(book, chapter, verses)
      commit('setVerses', verses)
    } catch (err) {
      commit('setError', err.response.data.error)
    }
    commit('setLoading', false)
  },
  getAndUpdateVerses({ dispatch, state }, { book, chapter }) {
    if (!book || !chapter) {
      book = state.currentBook
      chapter = state.currentChapter
    }
    dispatch('setCurrentBook', book)
    dispatch('setCurrentChapter', chapter)
    dispatch('getVerses', { book, chapter })
  },
  setCurrentBook({ commit, state, dispatch }, newBook) {
    if (state.currentBook === newBook) {
      return
    }
    commit('setCurrentBook', newBook)
    dispatch('getVerses', {
      book: state.currentBook,
      chapter: state.currentChapter,
    })
  },
  setCurrentChapter({ commit, dispatch, state }, newChapter) {
    if (state.currentChapter === newChapter) {
      return
    }
    commit('setCurrentChapter', newChapter)
    dispatch('getVerses', {
      book: state.currentBook,
      chapter: state.currentChapter,
    })
  },
  selectVerse({ commit }, verseId) {
    commit('selectVerse', verseId)
  },
  nextChapter({ dispatch, state }) {
    dispatch('setCurrentChapter', (+state.currentChapter + 1).toString())
  },
  previousChapter({ dispatch, state }) {
    dispatch('setCurrentChapter', (+state.currentChapter - 1).toString())
  },
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
    commit('unselectVerses')
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
  verses(state) {
    return [...state.verses]
  },
  chapter(state) {
    return state.currentChapter.toString() || '1'
  },
  book(state) {
    return state.currentBook
  },
  loading(state) {
    return state.loading
  },
  selectedVerses(state) {
    return [...state.verses]
      .filter((verse) => verse.selected === true)
      .map((verse) => ({
        ...verse,
        originBook: state.currentBook,
        originChapter: state.currentChapter,
      }))
  },
  chapterNumber(state) {
    const selectedBook = booksInOrder.find(
      (book) => book.name === state.currentBook
    )
    return selectedBook.chapters
  },
  isFirstChapter(_state, getters) {
    return +getters.chapter === 1
  },
  isLastChapter(_state, getters) {
    return +getters.chapter === getters.chapterNumber
  },
  notes(state) {
    const reversedNotes = [...state.notes]
    reversedNotes.reverse()
    return reversedNotes
  },
  error(state) {
    return state.error
  },
}
