import { BibleSizedCache } from '@/util/SizedCache'
import { booksInOrder } from '@/util/bibleBooks'

let source = null
const cache = new BibleSizedCache()

export const state = () => {
  return {
    currentBook: 'Psalms',
    currentChapter: '119',
    verses: [],
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
  async getVerses({ commit, state, dispatch }, { book, chapter }) {
    const updateNotes = () => {
      dispatch('notes/setFilters', { chapter }, { root: true })
      dispatch('notes/loadNotes', null, { root: true })
    }
    const cachedVerses = cache.get(book, chapter)
    if (cachedVerses !== undefined) {
      commit(
        'setVerses',
        cachedVerses.map((verse) => {
          return { ...verse, selected: false }
        })
      )
      updateNotes()
      return
    }
    commit('setLoading', true)
    try {
      commit('setError', null)
      if (source) {
        console.log('Tried to cancel operation')
        source.cancel('Operation cancelled')
      }
      source = this.$axios.CancelToken.source()
      const fetchedVerses = await this.$axios.$get('api/verses/verses', {
        params: {
          book: book || state.currentBook,
          chapter: chapter || state.currentChapter,
        },
      })
      updateNotes()
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
}

export const getters = {
  verses(state, _getters, rootState) {
    const highlightedVerses = {}
    const notes = rootState.notes.notes
    notes.forEach((note) => {
      note.verses.forEach((verse) => {
        highlightedVerses[verse.id] = true
      })
    })
    const mappedVerses = [...state.verses].map((verse) => {
      return { ...verse, highlighted: !!highlightedVerses[verse.id] }
    })
    return mappedVerses
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
  error(state) {
    return state.error
  },
}
