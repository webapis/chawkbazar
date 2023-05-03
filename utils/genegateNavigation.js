
import { productTitleMatch } from './productTitleMatch.js'
import fs from 'fs'
debugger
const Rawallkeywords = fs.readFileSync(`${process.cwd()}/utils/keywords.json`, { encoding: 'utf-8' })
const allkeywords=JSON.parse(Rawallkeywords)

debugger
function genegateNavigation({ title }) {
  const keywords = allkeywords
  const matchingKeywords = keywords.map((m) => {
    return { ...m, index: m.index.toString() + '-' }
  }).filter((kws) => {

    let exactmatch = kws.exactmatch
    let negwords = kws.exclude

    let nws = []
    if (negwords) {
      nws = negwords.split(',')

    }
    const kw = kws.keywords

    const match = productTitleMatch({ kw, title, exactmatch, nws })
    return match

  })

  const filter = {
    renk: '',
    altKategori: '',
    kategori: ''
  }
  if (matchingKeywords.length > 0) {
    matchingKeywords.forEach(g => {
      switch (g.groupName) {
        case 'Renk':
          filter['renk'] = g.title
          break;
        case 'Seçenekler':
        case 'Yaka tipi':
        case 'Boyu':
          filter['altKategori'] = g.title
          break;
        case 'Dış giyim':
        case "Alt giyim":
        case 'Aksesuar':
        case 'Ev giyim':
        case 'Üst giyim':
        case "İç giyim":
          filter['kategori'] = g.title
          break;
      }

    })
  }
  return filter
}





export { genegateNavigation }