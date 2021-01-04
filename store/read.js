import { booksInOrder } from '@/util/bibleBooks'

export const state = () => {
  return {
    currentBook: 'Psalms',
    currentChapter: '119',
    verses: [],
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
    const versesResponse = await this.$axios.$get(
      'https://ajith-holy-bible.p.rapidapi.com/GetChapter',
      {
        headers: {
          'x-rapidapi-key': process.env.key,
          'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
          useQueryString: true,
        },
        params: {
          Book: book || state.currentBook,
          Chapter: chapter || state.currentChapter,
        },
      }
    )
    const verses = versesResponse.Output.replace(/&lt;(.+?)&gt;/gs, '')
      .split(/\d+/)
      .filter((verse) => verse.trim() !== '')
      .map((verse, index) => {
        return { id: index, text: verse.trim(), selected: false }
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
    return state.verses.filter((verse) => verse.selected === true)
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
}
