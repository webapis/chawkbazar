
import { PrismaClient } from '@prisma/client'
import { genegateNavigation } from './genegateNavigation.js'
import fs from 'fs'
import path from 'path'
import walkSync from './walkSync.js'
import orderData from './orderData.js'

debugger
const prisma = new PrismaClient()
debugger

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

debugger
let list = []
let sliceCounter = 0
let isComplete = false
let indexCounter = 0

while (!isComplete) {
  debugger

  for (let filepath of filePaths) {

    const raw = fs.readFileSync(filepath, { encoding: 'utf-8' })
    const data = JSON.parse(raw).map(m => { return { ...m, timestamp: m.timestamp.toString() } }).slice(sliceCounter, sliceCounter + 20)

    list.push(...data)

  }
  if (list.length > 0) {
    console.log('list.length', list.length)
    //add kategori field
    let listwithNav =[]
    for (let l of list) {

      const navs = genegateNavigation({ title: l.title })
    
      listwithNav.push({...l,...navs})
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
    console.error(error)

    await prisma.$disconnect()
 

  }





}




