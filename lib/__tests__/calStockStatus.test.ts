import calStockStatus from "../functions/calStockStatus"
//npm run test เพื่อรัน test

test("ทดสอบสถานะ OK",() => {
    const result = calStockStatus(100, 100)
    expect(result).toBe("OK")
})
test("ทดสอบสถานะ LOW",() => {
    const result = calStockStatus(30, 100)
    expect(result).toBe("LOW")
})
test("ทดสอบ OUT แบบติดลบ",() => {
    const result = calStockStatus(-10, 100)
    expect(result).toBe("OUT")
})


test("ทดสอบ error เมื่อ max quantity ท่ากับ 0",() => {
    expect(() => calStockStatus(100,0)).toThrow()
})
test("ทดสอบ error เมื่อ max quantity น้อยกว่า 0",() => {
    expect(() => calStockStatus(100,-1)).toThrow()
})