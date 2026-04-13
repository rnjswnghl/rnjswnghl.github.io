// 의류 관련 공통 타입 정의
export type ClothesData = {
  productId: string
  productName: string
  productBrand: string
  productPrice: number
  productImageUrl: string
  productUrl: string
  styleList: Array<string> | null
  liked: boolean
}
