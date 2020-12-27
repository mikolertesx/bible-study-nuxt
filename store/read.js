export const state = () => {
  return {
    currentBook: 'Psalms',
    currentChapter: '119',
    verses: [],
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
    console.log(book, chapter)
    const versesResponse = await this.$axios.$get(
      'https://ajith-holy-bible.p.rapidapi.com/GetChapter',
      {
        headers: {
          'x-rapidapi-key': process.env.key,
          'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
          useQueryString: true,
        },
        params: {
          Book: book,
          Chapter: chapter,
        },
      }
    )
    const verses = versesResponse.Output.replace(/&lt;(.+?)&gt;/gs, '')
      .split(/\d+/)
      .filter((verse) => verse.trim() !== '')
      .map((verse, index) => {
        return { id: index, text: verse.trim(), selected: false }
      })

    commit('setVerses', verses)
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
}

export const getters = {
  verses(state) {
    return [...state.verses]
  },
  chapter(state) {
    return state.chapter
  },
  book(state) {
    return state.book
  },
}
