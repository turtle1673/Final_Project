type dateOption = "short" | "long" | "numeric" | "2-digit" | "narrow"
export const formatDateThai = (dateString: string | Date, option:dateOption) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("th-TH", {
      day: "numeric",
      month: option,
      year: "numeric",
    }).format(date)
  };