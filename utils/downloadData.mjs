
import * as dotenv from 'dotenv' 

 import{ downloadCollection } from'./uploadCollection.mjs'
   // const genders = [{ gender: 'erkek', gender1: 'erkek' }]
    const genders = [{ gender: 'kadin', gender1: 'kadin' }, { gender: 'erkek', gender1: 'erkek' }, { gender: 'kcocuk', gender1: 'kiz-cocuk' }, { gender: 'ecocuk', gender1: 'erkek-cocuk' }]
    for (let g of genders) {
        const { gender, gender1 } = g
        await downloadCollection(gender,gender1)
    }
 

