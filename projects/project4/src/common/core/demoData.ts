export type DemoProduct = {
  productId: string
  productImageUrl: string
  productBrand: string
  productName: string
  productPrice: number
  productUrl: string
  styleList: string[]
}

const BASE = import.meta.env.BASE_URL
const img = (name: string) => `${BASE}img/${name}`

export const demoProducts: DemoProduct[] = [
  {
    productId: 'demo-001',
    productImageUrl: img('girl.png'),
    productBrand: 'ON-WEAR',
    productName: '오버핏 코튼 티셔츠',
    productPrice: 39000,
    productUrl: 'https://example.com',
    styleList: ['캐주얼', '미니멀'],
  },
  {
    productId: 'demo-002',
    productImageUrl: img('tyler.avif'),
    productBrand: 'Studio Nine',
    productName: '릴렉스 핏 데님 팬츠',
    productPrice: 89000,
    productUrl: 'https://example.com',
    styleList: ['스트릿', '데님'],
  },
  {
    productId: 'demo-003',
    productImageUrl: img('izy.avif'),
    productBrand: 'Mono Lane',
    productName: '울 블렌드 니트',
    productPrice: 72000,
    productUrl: 'https://example.com',
    styleList: ['클래식'],
  },
  {
    productId: 'demo-004',
    productImageUrl: img('kanye1.avif'),
    productBrand: 'Urban Fit',
    productName: '윈드브레이커 재킷',
    productPrice: 128000,
    productUrl: 'https://example.com',
    styleList: ['아웃도어'],
  },
  {
    productId: 'demo-005',
    productImageUrl: img('gptmodel.png'),
    productBrand: 'Demo Lab',
    productName: '테크 플리스 후디',
    productPrice: 99000,
    productUrl: 'https://example.com',
    styleList: ['스트릿', '기능성'],
  },
]

export function getDemoProduct(id: string): DemoProduct {
  return demoProducts.find((p) => p.productId === id) ?? demoProducts[0]
}

export const demoLikedProductIds = new Set<string>(['demo-002'])

export const demoWishlist = [
  {
    productId: 'demo-002',
    productImageUrl: img('tyler.avif'),
    productCategory: 'lowerDenim',
  },
  {
    productId: 'demo-003',
    productImageUrl: img('izy.avif'),
    productCategory: 'upperKnit',
  },
]

export const demoCoordination = [
  {
    coordinationId: 1,
    upperImageUrl: img('izy.avif'),
    lowerImageUrl: img('tyler.avif'),
    upperId: 'demo-003',
    lowerId: 'demo-002',
  },
]

export const demoMannequins = [
  { mannequinId: 1, mannequinImageUrl: 'default_mannequin_image' },
  { mannequinId: 2, mannequinImageUrl: 'default_mannequin_image' },
  { mannequinId: 3, mannequinImageUrl: 'default_mannequin_image' },
  { mannequinId: 4, mannequinImageUrl: 'default_mannequin_image' },
]

export const demoSearchHistory = ['니트', '데님', '후디']
export const demoPopularQueries = ['맨투맨', '코트', '청바지', '스니커즈', '가디건']

export const demoImageSearch = {
  upper: demoProducts.slice(0, 3).map((p) => ({
    id: p.productId,
    name: p.productName,
    brand: p.productBrand,
    price: p.productPrice,
    thumbnail: p.productImageUrl,
  })),
  lower: demoProducts.slice(2).map((p) => ({
    id: p.productId,
    name: p.productName,
    brand: p.productBrand,
    price: p.productPrice,
    thumbnail: p.productImageUrl,
  })),
}

