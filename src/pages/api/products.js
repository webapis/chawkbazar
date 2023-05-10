// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from './../../../lib/prisma.js';
import placeholder from './placeholders.json'

const queries = {
  'erkek-tişört': {
    where: {
      gender: '_erkek',
      title: {
        contains: 'tişört',
      },
    }
  },
  'erkek-üst-giyim': {
    where: {
      gender: '_erkek',
      title: {
        search: 'gömlek|bluz|crop|atlet|sweatshirt|kazak|hırka|tulum|kimono|süveter',
      },
    },
  }
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
  const page = req.query.page
console.log('req.query',req.query)
  const q = queries[req.query.q]

  let newquery = { where: {} }
  for (let query in req.query) {


    if (query === 'brand') {
      newquery.where.marka = { in: req.query[query].split(',') }
    }
    else if (query === 'g') {

      newquery.where.OR = req.query[query].split(',').map(m => { return { gender: { contains: m.replace(/ı/g, "i").replace("kiz-cocuk", "_kcocuk").replace("erkek-çocuk", "_ecocuk") } } })

    } else if (query === 'color') {
      newquery.where.renk = {
        in: req.query[query].split(','),
      }

    }
    else if (query === 'k') {
      debugger

      newquery.where.kategori = {
        in: req.query[query].split(','),
      }
      debugger
    }
    else if (query === 'a') {
      debugger

      newquery.where.altKategori = {
        in: req.query[query].split(','),
      }
      debugger
    }
    else if (query === 'price') {
      const priceRange = req.query[query].split(',').map(m => { return { price: m.split('-')[1] ? { gte: parseFloat(m.split('-')[0]), lte: parseFloat(m.split('-')[1]) } : { gte: parseFloat(m.split('-')[0]) } } })
      newquery.where.OR = priceRange

    }

  }
  debugger



  if (req.method === 'GET') {
    try {
      debugger
      // const aggregations = await prisma.products.aggregate({
      //   _count: {
      //     index: true,
      //   },
      //   ...newquery
      // })

      debugger
      const data = await prisma.products.findMany({

        // orderBy: [
        //   {
        //     index: 'asc',
        //   }
        // ],
        skip: page === 1 ? 0 : 100 * page,
        take: 100,
        ...newquery
      });

      debugger
      const mappedData = data.map((m, i) => {
        const imageSource =
          placeholder[m.marka].imagePrefix.trim() +
          placeholder[m.marka].imageHost.trim() +
          m.imageUrl +
          placeholder[m.marka].imgPostFix;

          const link =   placeholder[m.marka].detailHost.trim()+m.link
        return {
          name: m.title.substr(m.title.indexOf(" ")).replace('_', '| '),
          link ,
          image: {
            "id": i,
            "thumbnail": imageSource,
            "original": imageSource
          },
          "id": i,
          "description": m.marka.toUpperCase(), // m.title.substr(0, m.title.lastIndexOf("_")).trim(),
          "slug": "armani-veni-vidi-vici",
          "isNewArrival": true,

          "gallery": [
            {
              "id": 1,
              "thumbnail": "/assets/images/products/p-11-1.png",
              "original": "/assets/images/products/p-11-1.png"
            },
            {
              "id": 2,
              "thumbnail": "/assets/images/products/p-11-2.png",
              "original": "/assets/images/products/p-11-2.png"
            },
            {
              "id": 3,
              "thumbnail": "/assets/images/products/p-11-3.png",
              "original": "/assets/images/products/p-11-3.png"
            },
            {
              "id": 4,
              "thumbnail": "/assets/images/products/p-11-4.png",
              "original": "/assets/images/products/p-11-4.png"
            }
          ],
          "price": 20.0,
          "sale_price": parseFloat(m.price),
          "variations": [
            {
              "id": 1,
              "value": "S",
              "attribute": {
                "id": 1,
                "name": "Size",
                "slug": "size"
              }
            },
            {
              "id": 2,
              "value": "M",
              "attribute": {
                "id": 1,
                "name": "Size",
                "slug": "size"
              }
            },
            {
              "id": 3,
              "value": "L",
              "attribute": {
                "id": 1,
                "name": "Size",
                "slug": "size"
              }
            },
            {
              "id": 4,
              "value": "XL",
              "attribute": {
                "id": 1,
                "name": "Size",
                "slug": "size"
              }
            },
            {
              "id": 5,
              "value": "Orange",
              "meta": "#e86c25",
              "attribute": {
                "id": 1,
                "name": "Color",
                "slug": "color"
              }
            },
            {
              "id": 6,
              "value": "Pink",
              "meta": "#ffa5b4",
              "attribute": {
                "id": 1,
                "name": "Color",
                "slug": "color"
              }
            },
            {
              "id": 7,
              "value": "Purple",
              "meta": "#8224e3",
              "attribute": {
                "id": 1,
                "name": "Color",
                "slug": "color"
              }
            },
            {
              "id": 8,
              "value": "Red",
              "meta": "#dd3333",
              "attribute": {
                "id": 1,
                "name": "Color",
                "slug": "color"
              }
            }
          ]
        }
      })
debugger
      return res.status(200).json({ data: mappedData, count:0});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  } else {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
}
