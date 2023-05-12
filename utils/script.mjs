
import { PrismaClient } from '@prisma/client'
import { genegateNavigation } from './genegateNavigation.mjs'
import mapPrice from './mapPrice.mjs'
import fs from 'fs'
import path from 'path'
import walkSync from './walkSync.mjs'
import orderData from './orderData.mjs'
import { formatMoney, unformat } from 'accounting-js'
const rzt = parseFloat('1399').toFixed(2)

const prisma = new PrismaClient()


let filePaths = []
debugger
const deleted =await prisma.products.deleteMany({ where: { imageUrl: {contains:'kadin-kurklu-suet-pem-kadin-gri-kurklu-5109d7.jpeg'} } })

debugger
walkSync(path.join(process.cwd(), `erkek/unzipped-data`), async (filepath) => {
  filePaths.push(filepath)
})
walkSync(path.join(process.cwd(), `kadin/unzipped-data`), async (filepath) => {
  filePaths.push(filepath)
})
walkSync(path.join(process.cwd(), `kiz-cocuk/unzipped-data`), async (filepath) => {
  filePaths.push(filepath)
})

walkSync(path.join(process.cwd(), `erkek-cocuk/unzipped-data`), async (filepath) => {
  filePaths.push(filepath)
})

// const data = [{
//   "title": "abiyefon gümüş simli gece çantası sh806 _kadin",
//   "priceNew": "77.9",
//   "imageUrl": "images/image/289/22712/113557762_0.jpg",
//   "link": "gumus-simli-gece-cantasi-sh806",
//   "timestamp": "1683692507642",
//   "marka": "abiyefon",
//   "gender": "_kadin",
//   "modified": 1683692507642
// },
// {
//   "title": "abiyefon beyaz simli gece çantası sh806 _kadin",
//   "priceNew": "99.9",
//   "imageUrl": "images/image/289/22712/113557758_0.jpg",
//   "link": "beyaz-simli-gece-cantasi-sh806",
//   "timestamp": "1683866882898",
//   "marka": "abiyefon",
//   "gender": "_kadin",
//   "modified": 1683866882898
// }].map(m => { return { ...m, modified: new Date(m.modified) } })
let list = []
let sliceCounter = 0
let isComplete = false
let indexCounter = 0

while (!isComplete) {

  for (let filepath of filePaths) {

    const raw = fs.readFileSync(filepath, { encoding: 'utf-8' })
    const data = JSON.parse(raw).map(m => { return { ...m, modified: new Date(), priceNew: m.priceNew ? m.priceNew.toString() : m.priceNew, timestamp: m.timestamp.toString(), price: m.priceNew ? mapPrice(m.priceNew.toString()) : 0 } }).slice(sliceCounter, sliceCounter + 20)
    const removeImgNull = data.filter(m => m.imageUrl !== null)
    const imageUrlWithNull = data.filter(m => m.imageUrl === null)
    if (imageUrlWithNull.length > 0) {
      console.log('imageUrlWithNull', imageUrlWithNull.length)
    }

    list.push(...removeImgNull)

  }
  if (list.length > 0) {
    console.log('list.length', list.length)
    //add kategori field
    let listwithNav = []
    for (let l of list) {

      const navs = genegateNavigation({ title: l.title })
      // const ft = l.priceNew.replace('TL', '').replace('$', '').replaceAll('.','').replaceAll(',','').trim()
      // const red =formatNumber(ft, {precision:1})

      listwithNav.push({ ...l, ...navs })
    }


    debugger
    const orderedList = orderData(listwithNav)
    const indexedList = orderedList.map(m => {
      indexCounter = indexCounter + 1
      return { ...m, index: indexCounter }
    })
    const chunk = (arr, size) => arr.reduce((carry, _, index, orig) => !(index % size) ? carry.concat([orig.slice(index, index + size)]) : carry, []);
    const chunkedArray = chunk(indexedList, 200)
    for (let arr of chunkedArray) {

      await main({ data: arr })
      debugger
    }
    list = []
    sliceCounter = sliceCounter + 20
  } else {
    debugger
    isComplete = true
    const deleteResult = await prisma.products.deleteMany({ where: { modified: { lt: new Date(new Date().setHours(0, 0, 0, 0)) } } })
    console.log('deleteResult', deleteResult)
  }


}


debugger


debugger

async function main({ data }) {

  try {
    for (let d of data) {
      debugger

      const user = await prisma.products.upsert({
        where: {
          imageUrl: d.imageUrl
        },
        update: d,
        create: d,
      })
      debugger
    }

    // const user = await prisma.products.createMany({ data })


    await prisma.$disconnect()
  } catch (error) {
    console.error(error)

    await prisma.$disconnect()


  }





}




