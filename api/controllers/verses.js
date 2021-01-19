import axios from 'axios'
import { BibleSizedCache } from '../util/SizedCache'
const bibleCachedChapters = new BibleSizedCache(5000)

const getVerses = async (book, chapter) => {
  const cachedChapter = bibleCachedChapters.get(book, chapter)
  if (cachedChapter) {
    return cachedChapter
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

  bibleCachedChapters.set(book, chapter, verses)
  return verses
}

const versesGet = async (req, res) => {
  const { book, chapter } = req.query
  if (!chapter || !book) {
    return res.json({ error: 'No chapter or book sent.' })
  }
  let verses
  try {
    verses = await getVerses(book, chapter)
  } catch (err) {
    // verses = [{ id: '0', text: 'No verse can be fetched' }]
    return res.status(500).json({ error: 'API IS NOT UP.' })
  }
  return res.json(verses)
}

const versesLengthGet = async (req, res) => {
  const { book, chapter } = req.query
  const verses = await getVerses(book, chapter)
  return res.json({
    length: verses.length,
  })
}

export { versesGet, versesLengthGet }
