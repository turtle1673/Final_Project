type TmontFormat = "short" | "long" | "numeric" | "2-digit" | "narrow";

export default function formatToThaiDate(
  stringDate: string | Date,
  monthFormat: TmontFormat = "long"
): string {

  const date = new Date(stringDate)
  const result = new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: monthFormat,
    year: "numeric",
  }).format(date)

  return result
}
