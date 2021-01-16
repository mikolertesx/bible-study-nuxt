class SizedCache {
  constructor(maxData = 100) {
    this.data = {}
    this.dataSequence = []
    this.maxData = maxData
  }

  set(key, value) {
    if (this.data[key] === undefined) {
      this.dataSequence.push(key)
    }
    this.data[key] = value
    const size = this.dataSequence.length
    if (size > this.maxData) {
      this.removeByIndex(0)
    }
  }

  get(key) {
    return this.data[key]
  }

  removeByIndex(index) {
    console.log(this.dataSequence, this.data)
    const keyToDelete = this.dataSequence[index]
    delete this.data[keyToDelete]
  }

  removeByKey(key) {
    const indexToDelete = this.dataSequence.findIndex((seq) => seq === key)
    if (indexToDelete !== -1) {
      delete this.dataSequence[indexToDelete]
    }
    delete this.data[key]
  }
}

class BibleSizedCache extends SizedCache {
  set(book, chapter, value) {
    return super.set(`${book}-${chapter}`, value)
  }

  get(book, chapter) {
    return super.get(`${book}-${chapter}`)
  }
}

export default SizedCache
export { BibleSizedCache }
