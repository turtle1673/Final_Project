const calStockStatus = (stockCurrent:number,stockMax:number) => {
    const statusRatio = stockMax / 3
    if(stockCurrent <= 0){
        return "OUT"
    }else if(stockCurrent <= statusRatio){
        return "LOW"
    }else{
        return "OK"
    }
}

export default calStockStatus