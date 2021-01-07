let uid = 0

class Note {
  constructor(id, text, verses) {
    if (id === null) {
      console.log('Created an id')
      uid++
    }
    this.id = id || uid
    this.text = text
    this.verses = verses
  }
}

export default Note
