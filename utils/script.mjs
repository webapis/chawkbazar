
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
await prisma.products.deleteMany({})
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

let list = []
let sliceCounter = 0
let isComplete = false
let indexCounter = 0

while (!isComplete) {


  for (let filepath of filePaths) {

    const raw = fs.readFileSync(filepath, { encoding: 'utf-8' })
    const data = JSON.parse(raw).map(m => { return { ...m, priceNew: m.priceNew ? m.priceNew.toString() : m.priceNew, timestamp: m.timestamp.toString(), price: m.priceNew ? mapPrice(m.priceNew.toString()) : 0 } }).slice(sliceCounter, sliceCounter + 20)

    list.push(...data)



  }
  if (list.length > 0) {
    console.log('list.length', list.length)
    //add kategori field
    let listwithNav = []
    for (let l of list) {

      const navs = genegateNavigation({ title: l.title })
      // const ft = l.priceNew.replace('TL', '').replace('$', '').replaceAll('.','').replaceAll(',','').trim()
      // const red =formatNumber(ft, {precision:1})
      debugger
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
  }


}


debugger


debugger

async function main({ data }) {

  try {

    const user = await prisma.products.createMany({ data })
    await prisma.$disconnect()
  } catch (error) {
    console.error(error, data)

    await prisma.$disconnect()


  }





}




