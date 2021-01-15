import Note from '@/models/note'
import { booksInOrder } from '@/util/bibleBooks'

// TODO Add cancel request to avoid overloading the servers

export const state = () => {
  return {
    currentBook: 'Psalms',
    currentChapter: '119',
    verses: [],
    notes: [],
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
}

export const actions = {
  async getVerses({ commit, state }, { book, chapter }) {
    if (
      state.currentBook === book &&
      state.currentChapter === chapter &&
      state.verses.length !== 0
    ) {
      // We already have the verses in it.
      return
    }
    commit('setLoading', true)
    const fetchedVerses = await this.$axios.$get('/api/verses/verses', {
      params: {
        book: book || state.currentBook,
        chapter: chapter || state.currentChapter,
      },
    })

    const verses = fetchedVerses.map((verse) => {
      return { ...verse, selected: false }
    })
    commit('setLoading', false)
    commit('setVerses', verses)
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
    // TODO Go to the next book if we are on the last chapter.
    dispatch('setCurrentChapter', (+state.currentChapter + 1).toString())
  },
  previousChapter({ dispatch, state }) {
    // TODO Go to the previous book if we are on the first chapter.
    dispatch('setCurrentChapter', (+state.currentChapter - 1).toString())
  },
  createNote({ commit }, { id, text, verses }) {
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
    return state.verses
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
}
