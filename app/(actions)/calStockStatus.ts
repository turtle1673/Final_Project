const calStockStatus = (currentQuantity:number,maxQuantity:number) => {
    const statusRatio = maxQuantity / 3
    if (currentQuantity <= 0) {
        return "OUT"
    }else if (currentQuantity > statusRatio) {
        return "OK"
    }else {
        return "LOW"
    }
}

export default calStockStatus