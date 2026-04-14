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
const clothes = (name: string) => `${BASE}clothes/${name}`

export const demoProducts: DemoProduct[] = [
  {
    productId: 'demo-001',
    productImageUrl: clothes('스웨이드 바이커 자켓_블랙.jpg'),
    productBrand: '키뮤어',
    productName: '[사은품 증정]스웨이드 바이커 자켓_블랙',
    productPrice: 169900,
    productUrl: 'https://example.com/products/demo-001',
    styleList: ['시크', '미니멀', '스트릿'],
  },
  {
    productId: 'demo-002',
    productImageUrl: clothes('하이넥 벨티드 블루종 자켓_베이지.jpg'),
    productBrand: '크랭크',
    productName: '하이넥 벨티드 블루종 자켓_베이지',
    productPrice: 175440,
    productUrl: 'https://example.com/products/demo-002',
    styleList: ['미니멀', '시크', '심플'],
  },
  {
    productId: 'demo-003',
    productImageUrl: clothes('EVA CORSET TOP (MOCHA).jpg'),
    productBrand: '2000아카이브스',
    productName: 'EVA CORSET TOP (MOCHA)',
    productPrice: 99360,
    productUrl: 'https://example.com/products/demo-003',
    styleList: ['시크', '러블리', '유니크'],
  },
  {
    productId: 'demo-004',
    productImageUrl: clothes('솔로 스우시 풀오버 후디 M.jpg'),
    productBrand: '나이키',
    productName: '솔로 스우시 풀오버 후디 M - 블랙:화이트 / HV1083-010',
    productPrice: 96750,
    productUrl: 'https://example.com/products/demo-004',
    styleList: ['캐주얼', '스트릿', '스포티'],
  },
  {
    productId: 'demo-005',
    productImageUrl: clothes('포트 롱슬리브 원피스.jpg'),
    productBrand: '메리온',
    productName: '포트 롱슬리브 원피스',
    productPrice: 186390,
    productUrl: 'https://example.com/products/demo-005',
    styleList: ['러블리', '로맨틱', '페미닌'],
  },
  {
    productId: 'demo-006',
    productImageUrl: clothes('보우 플레어 미니 원피스 블랙.jpg'),
    productBrand: '일리고',
    productName: '보우 플레어 미니 원피스 블랙',
    productPrice: 73800,
    productUrl: 'https://example.com/products/demo-006',
    styleList: ['러블리', '페미닌', '데이트룩'],
  },
  {
    productId: 'demo-007',
    productImageUrl: clothes('25Damaged Washing Wide Denim (Washed Deep Blue).jpg'),
    productBrand: '플리즈노팔로우',
    productName: '25Damaged Washing Wide Denim (Washed Deep Blue)',
    productPrice: 156600,
    productUrl: 'https://example.com/products/demo-007',
    styleList: ['스트릿', '캐주얼', '빈티지'],
  },
  {
    productId: 'demo-008',
    productImageUrl: clothes('BUTTON ROLL UP SHORTS NAVY.jpg'),
    productBrand: '론론',
    productName: 'BUTTON ROLL UP SHORTS NAVY',
    productPrice: 80190,
    productUrl: 'https://example.com/products/demo-008',
    styleList: ['캐주얼', '프레피', '심플'],
  },
  {
    productId: 'demo-009',
    productImageUrl: clothes('투턱 와이드 치노 코튼 팬츠 4Color.jpg'),
    productBrand: '언탭트 스튜디오',
    productName: '투턱 와이드 치노 코튼 팬츠 4Color',
    productPrice: 34930,
    productUrl: 'https://example.com/products/demo-009',
    styleList: ['미니멀', '심플', '데일리'],
  },
  {
    productId: 'demo-010',
    productImageUrl: clothes('MOLLY One Tuck Bermuda Pants Black.jpg'),
    productBrand: '아모우',
    productName: 'MOLLY One Tuck Bermuda Pants Black',
    productPrice: 44200,
    productUrl: 'https://example.com/products/demo-010',
    styleList: ['캐주얼', '스포티', '데일리'],
  },
  {
    productId: 'demo-011',
    productImageUrl: clothes('릴렉스 세미 와이드 데님 팬츠 (5color).jpg'),
    productBrand: '워크온바디오프',
    productName: '릴렉스 세미 와이드 데님 팬츠 (5color)',
    productPrice: 39900,
    productUrl: 'https://example.com/products/demo-011',
    styleList: ['캐주얼', '데일리', '심플'],
  },
  {
    productId: 'demo-012',
    productImageUrl: clothes('Vintage raw jean in Ice Blue.jpg'),
    productBrand: '오도어',
    productName: 'Vintage raw jean in Ice Blue',
    productPrice: 111780,
    productUrl: 'https://example.com/products/demo-012',
    styleList: ['빈티지', '캐주얼', '데님'],
  },
  {
    productId: 'demo-013',
    productImageUrl: clothes('럭비스프링카라니트 (TDSW251117).jpg'),
    productBrand: '피그먼트',
    productName: '럭비스프링카라니트 (TDSW251117)',
    productPrice: 39510,
    productUrl: 'https://example.com/products/demo-013',
    styleList: ['캐주얼', '프레피', '러블리'],
  },
  {
    productId: 'demo-014',
    productImageUrl: clothes('시스루 헨리넥 풀오버 [IVORY].jpg'),
    productBrand: '제너럴아이디어',
    productName: '시스루 헨리넥 풀오버 [IVORY] / GF1LKP514',
    productPrice: 35700,
    productUrl: 'https://example.com/products/demo-014',
    styleList: ['미니멀', '심플', '페미닌'],
  },
  {
    productId: 'demo-015',
    productImageUrl: clothes('데님 오버핏 데일리 셔츠 - 3color.jpg'),
    productBrand: '마인드브릿지',
    productName: '데님 오버핏 데일리 셔츠 - 3color',
    productPrice: 55900,
    productUrl: 'https://example.com/products/demo-015',
    styleList: ['캐주얼', '데일리', '미니멀'],
  },
  {
    productId: 'demo-016',
    productImageUrl: clothes('[ON]워셔블 코튼 혼방 카라 반팔 니트 - 3color.jpg'),
    productBrand: '마인드브릿지',
    productName: '[ON]워셔블 코튼 혼방 카라 반팔 니트 - 3color',
    productPrice: 31920,
    productUrl: 'https://example.com/products/demo-016',
    styleList: ['심플', '프레피', '데일리'],
  },
  {
    productId: 'demo-017',
    productImageUrl: clothes('[유인 PICKJLayered Bustier Long Sleeve (FL -105_Charcoal Melange).jpg'),
    productBrand: '플레어업',
    productName: '[유인 PICK]Layered Bustier Long Sleeve (FL-105_Charcoal Melange)',
    productPrice: 67640,
    productUrl: 'https://example.com/products/demo-017',
    styleList: ['시크', '유니크', '페미닌'],
  },
  {
    productId: 'demo-018',
    productImageUrl: clothes('[우난 PICK]DOODLE HEART HALF T WHITE GREYISH BLUE.jpg'),
    productBrand: '메종미네드',
    productName: '[우난 PICK]DOODLE HEART HALF T WHITE GREYISH BLUE',
    productPrice: 44250,
    productUrl: 'https://example.com/products/demo-018',
    styleList: ['캐주얼', '스트릿', '유니크'],
  },
  {
    productId: 'demo-019',
    productImageUrl: clothes('[서강준 PICK]도브 울 트러커 크롭 자켓 [BLACK].jpg'),
    productBrand: '드로우핏',
    productName: '[서강준 PICK]도브 울 트러커 크롭 자켓 [BLACK]',
    productPrice: 145600,
    productUrl: 'https://example.com/products/demo-019',
    styleList: ['시크', '미니멀', '클래식'],
  },
]

export function getDemoProduct(id: string): DemoProduct {
  return demoProducts.find((p) => p.productId === id) ?? demoProducts[0]
}

export const demoLikedProductIds = new Set<string>(['demo-004', 'demo-012', 'demo-018'])

export const demoWishlist = [
  {
    productId: 'demo-012',
    productImageUrl: clothes('Vintage raw jean in Ice Blue.jpg'),
    productCategory: 'lowerDenim',
  },
  {
    productId: 'demo-014',
    productImageUrl: clothes('시스루 헨리넥 풀오버 [IVORY].jpg'),
    productCategory: 'upperKnit',
  },
]

export const demoCoordination = [
  {
    coordinationId: 1,
    upperImageUrl: clothes('시스루 헨리넥 풀오버 [IVORY].jpg'),
    lowerImageUrl: clothes('Vintage raw jean in Ice Blue.jpg'),
    upperId: 'demo-014',
    lowerId: 'demo-012',
  },
  {
    coordinationId: 2,
    upperImageUrl: clothes('[우난 PICK]DOODLE HEART HALF T WHITE GREYISH BLUE.jpg'),
    lowerImageUrl: clothes('MOLLY One Tuck Bermuda Pants Black.jpg'),
    upperId: 'demo-018',
    lowerId: 'demo-010',
  },
]

export const demoMannequins = [
  { mannequinId: 1, mannequinImageUrl: 'default_mannequin_image' },
  { mannequinId: 2, mannequinImageUrl: 'default_mannequin_image' },
  { mannequinId: 3, mannequinImageUrl: 'default_mannequin_image' },
  { mannequinId: 4, mannequinImageUrl: 'default_mannequin_image' },
]

export const demoSearchHistory = ['니트', '데님', '후디']
export const demoPopularQueries = [
  '자켓',
  '원피스',
  '데님',
  '미니멀',
  '러블리',
  '시크',
  '프레피',
  '스포티',
]

export const demoImageSearch = {
  upper: demoProducts.slice(0, 9).map((p) => ({
    id: p.productId,
    name: p.productName,
    brand: p.productBrand,
    price: p.productPrice,
    thumbnail: p.productImageUrl,
  })),
  lower: demoProducts.slice(6).map((p) => ({
    id: p.productId,
    name: p.productName,
    brand: p.productBrand,
    price: p.productPrice,
    thumbnail: p.productImageUrl,
  })),
}

