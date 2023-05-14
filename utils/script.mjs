
import { PrismaClient } from '@prisma/client'
import { genegateNavigation } from './genegateNavigation.mjs'
import mapPrice from './mapPrice.mjs'
import fs from 'fs'
import path from 'path'
import walkSync from './walkSync.mjs'
import orderData from './orderData.mjs'



const prisma = new PrismaClient()


let filePaths = []
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
    const data = JSON.parse(raw).map(m => { return { ...m, modified: new Date(), priceNew: m.priceNew ? m.priceNew.toString() : m.priceNew, timestamp: m.timestamp, price: m.priceNew ? mapPrice(m.priceNew.toString()) : 0 } }).slice(sliceCounter, sliceCounter + 20)
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




async function main({ data }) {

  try {
    for (let d of data) {
      debugger
      if (d.update) {
        delete d.delete
        delete d.update
        const user = await prisma.products.upsert({
          where: {
            imageUrl: d.imageUrl
          },
          update: d,
          create: d,
        })

        console.log('updated', user)
      } else if (d.delete) {
        delete d.delete
        delete d.update
        const user = await prisma.products.delete({
          where: {
            imageUrl: d.imageUrl
          }
        })
        console.log('deleted', user)
      } else {
        delete d.delete
        delete d.update
        debugger
      }

      debugger
    }

    // const user = await prisma.products.createMany({ data })


    await prisma.$disconnect()
  } catch (error) {
    console.error(error)

    await prisma.$disconnect()


  }





}




