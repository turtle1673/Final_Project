//ระดับน้ำตาล:NO_SUGAR ไม่ตัดตัวเพิ่มความหวาน LESS_SUGAR ตัดครึ่งเดียว NORMAL_SUGAR ตัดตามเดิม
export function calSweetenIngredient(
  quantity: number,
  sweetLevel: string
): number {
  let modQuantity: number
  switch (sweetLevel) {
    case "NO_SUGAR":
      modQuantity = 0
      break
    case "LESS_SUGAR":
      modQuantity = quantity * 0.5
      break
    case "NORMAL_SUGAR":
      modQuantity = quantity
      break
    default:
      throw new Error("calSweetenIngredient error message")
  }
  return modQuantity
}