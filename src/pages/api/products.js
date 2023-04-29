// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from './../../../lib/prisma.js';
import placeholder from './placeholders.json'
export default async function handler(req, res) {
  debugger
  if (req.method === 'GET') {
    try {
      const data = await prisma.products.findMany({
        skip: 0,
        take: 50
      });

      const mappedData = data.map((m, i) => {
        const imageSource = placeholder[m.marka].imageHost.trim() + m.imageUrl
        debugger
        return {
          name: m.title,
          image: {
            "id": i,
            "thumbnail": imageSource,
            "original": imageSource
          },
          "id": i,
          "description": "Fendi began life in 1925 as a fur and leather speciality store in Rome.",
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
          "sale_price": 17.99,
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
      return res.status(200).json({ data: mappedData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  } else {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
}
