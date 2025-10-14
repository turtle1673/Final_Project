
import { calSweetenIngredient } from "../functions/calSweetenIngredient"
//npm run test เพื่อรัน test


//ลองใส่ข้อความก่อนและหลังรัน test
beforeAll(() => console.log("ลองใช้ beforeAll ข้อความนี้จะขึ้นก่อนรัน test"))
afterAll(() => console.log("ลองใช้ afterAll ข้อความนี้จะขึ้นหลังรัน test เสร็จ"))

//เริ่มเขียนเทส
test("ทดสอบ normal sugar จะต้องคืนค่าผลลัพธ์ เท่ากับ ที่ใส่", async () => {
  const result = calSweetenIngredient(100,"NORMAL_SUGAR")
  expect(result).toBe(100)
})
test("ทดสอบ less sugar จะต้องคืนค่าผลลัพธ์ ครึ่งเดียว ของที่ใส่", async () => {
  const result = calSweetenIngredient(100,"LESS_SUGAR")
  expect(result).toBe(50)
})
test("ทดสอบ no sugar จะต้องคืนค่าผลลัพธ์เท่ากับ 0", async () => {
  const result = calSweetenIngredient(100,"NO_SUGAR")
  expect(result).toBe(0)
})


//ถาม gpt มาถ้าจะเทส error ให้เขียนอีกแบบ
//ถ้าไม่ใช่ async function ให้ใช้ expect().toThrow()
test("ทดสอบการ throw error", async () => {
  expect(() => calSweetenIngredient(100,"Ivalid SweetLevel")).toThrow()
})
test("ทดสอบการ throw error message 'เป็น' ไปตามที่คิดไว้", async () => {
  expect(() => calSweetenIngredient(100,"Ivalid SweetLevel")).toThrow("calSweetenIngredient error message")
})
test("ทดสอบการ throw error message 'ไม่เป็น' ไปตามที่คิดไว้", async () => {
  //ใส่ .not.toThrow() เพื่อให้รันผ่าน เพราะไม่ต้องการ error message อื่น
  expect(() => calSweetenIngredient(100,"Ivalid SweetLevel")).not.toThrow("other error message")
})
