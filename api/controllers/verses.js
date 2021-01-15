const axios = require('axios')

module.exports.versesGet = async (req, res) => {
  const { book, chapter } = req.query
  if (!chapter || !book) {
    return res.json({ error: 'No chapter or book sent.' })
  }

  const response = await axios.get(
    'https://ajith-holy-bible.p.rapidapi.com/GetChapter',
    {
      headers: {
        'x-rapidapi-key': process.env.BIBLE_KEY,
        'x-rapidapi-host': 'ajith-holy-bible.p.rapidapi.com',
        useQueryString: true,
      },
      params: {
        Book: book,
        Chapter: chapter,
      },
    }
  )

  const verses = response.data.Output.replace(/&lt;(.+?)&gt;/gs, '')
    .split(/\d+/)
    .filter((verse) => verse.trim() !== '')
    .map((verse, index) => {
      return { id: index, text: verse.trim() }
    })

  return res.json(verses)
}
