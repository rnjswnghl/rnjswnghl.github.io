// 날짜 포맷 함수 예시
export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
