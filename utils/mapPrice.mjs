function mapPrice(price) {


    try {
        const trimPrice = price.replace('TL', '').replace('$', '').trim()

        switch (true) {

            case /^\d\d\d[,]\d\d$/.test(trimPrice)://299,99
                
                return  parseFloat(trimPrice.replace(',', '.')).toFixed(2)
            case /^\d\d\d[,]\d$/.test(trimPrice)://299,9
                
                return parseFloat(trimPrice.replace(',', '.')).toFixed(2)
            case /^\d\d\d[.]\d\d$/.test(trimPrice)://299.99
                
                return parseFloat(trimPrice).toFixed(2)
            case /^\d\d\d\d[.]\d\d$/.test(trimPrice)://1499.99
                
                return parseFloat(trimPrice).toFixed(2)
            case /^\d\d\d\d[,]\d\d$/.test(trimPrice)://1499,99
                
                return parseFloat(trimPrice.replace(',', '.')).toFixed(2)
            case /^\d[.]\d\d\d[,]\d\d$/.test(trimPrice)://1.449,90
                return parseFloat(trimPrice.replace('.', '').replace(',', '.')).toFixed(2)

            case /^\d[.]\d\d\d$/.test(trimPrice)://1.449
                
                return parseFloat(trimPrice.replace('.', '')).toFixed(2)
            case /^\d\d\d\d$/.test(trimPrice)://4299
                
                return parseFloat(trimPrice).toFixed(2)
            case /^\d[,]\d\d\d[.]\d\d$/.test(trimPrice)://3,950.00
                
                return parseFloat(trimPrice.replace(',', '')).toFixed(2)
            case /^\d\d\d$/.test(trimPrice)://999
                
                return parseFloat(trimPrice).toFixed(2)
            case /^\d\d[,]\d\d$/.test(trimPrice)://81,00
                
                return parseFloat(trimPrice.replace(',', '.')).toFixed(2)
            case /^\d\d[.]\d\d$/.test(trimPrice)://81.00
                
                return parseFloat(trimPrice).toFixed(2)
            case /^\d\d[.]\d\d\d[,]\d\d$/.test(trimPrice)://14.918,00
                
                return parseFloat(trimPrice.replace('.', '').replace(',', '.')).toFixed(2)
            case /^\d\d\d\d\d$/.test(trimPrice)://11499
                
                return parseFloat(trimPrice).toFixed(2)
            case /^\d\d[.]\d\d\d$/.test(trimPrice)://14.918
                
                return parseFloat(trimPrice.replace('.', '')).toFixed(2)
            case /^\d\d[,]\d\d\d$/.test(trimPrice)://14,918
                
                return parseFloat(trimPrice.replace(',', '')).toFixed(2)
            default:
                
                return parseFloat(0).toFixed(2)
        }
    } catch (error) {
        
        console.log('price----', price)
        throw error
    }

}

export default mapPrice