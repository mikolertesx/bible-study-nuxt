import { v4 as uuidv4 } from 'uuid'

class Note {
  constructor(id, text, verses) {
    this.id = id || uuidv4().toString()
    this.text = text
    this.verses = verses
  }
}

export default Note
