import axios, {
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import {
  demoCoordination,
  demoImageSearch,
  demoLikedProductIds,
  demoMannequins,
  demoPopularQueries,
  demoProducts,
  demoSearchHistory,
  demoWishlist,
  getDemoProduct,
} from '@/common/core/demoData'

export type DemoApiKind = 'main' | 'fast' | 'runpod'

function ok<T>(
  config: InternalAxiosRequestConfig,
  data: T,
  status = 200,
): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config,
    request: {},
  }
}

function joined(config: InternalAxiosRequestConfig): URL {
  const base = (config.baseURL ?? 'http://demo.local/').replace(/\/+$/, '')
  const url = config.url ?? '/'
  const full = url.startsWith('http') ? url : `${base}${url.startsWith('/') ? '' : '/'}${url}`
  return new URL(full)
}

function pageSlice<T>(arr: T[], page: number, size: number) {
  const start = page * size
  const slice = arr.slice(start, start + size)
  const total = arr.length
  const last = start + size >= total
  const totalPages = Math.max(1, Math.ceil(total / size))
  return { slice, total, last, totalPages }
}

function matchesRankCategory(p: { productName: string; productImageUrl: string }, category: string) {
  const c = (category ?? '').toLowerCase()
  const name = (p.productName ?? '').toLowerCase()
  const img = (p.productImageUrl ?? '').toLowerCase()

  // hotitems/recommend에서 사용하는 category 형식: "upper/hoodie" 또는 "lower/denim" 등
  const [main, sub] = c.split('/')

  const isUpperItem =
    /후디|hood|니트|knit|셔츠|shirt|tee|t\\s?shirt|long sleeve|bustier|카라|polo|풀오버|pullover|자켓|jacket|블루종|bomber|아우터|outer|원피스|dress/.test(
      name,
    ) ||
    /hood|knit|shirt|tee|jacket|bomber|outer|dress/.test(img)

  const isLowerItem =
    /팬츠|pants|denim|jean|shorts|bermuda|치노|chino|cotton|코튼|leggings|레깅스|suit|training|데님/.test(
      name,
    ) || /denim|jean|pants|short/.test(img)

  // 1차: upper/lower 큰 분류
  if (main === 'upper' && !isUpperItem) return false
  if (main === 'lower' && !isLowerItem) return false

  // 2차: 하위 카테고리(대충이라도 목록이 달라지도록)
  if (!sub) return true

  switch (sub) {
    case 'hoodie':
      return /후디|hood|pullover/.test(name) || /hood/.test(img)
    case 'knitSweater':
      return /니트|knit|스웨터|sweater|카라/.test(name) || /knit/.test(img)
    case 'longSleeve':
      return /long sleeve|긴소매|롱슬리브|bustier/.test(name)
    case 'shortSleeve':
      return /half t|반팔|short sleeve|카라 반팔/.test(name)
    case 'shirtBlouse':
      return /셔츠|shirt|blouse/.test(name)
    case 'short':
      return /shorts|버뮤다|bermuda|숏/.test(name) || /short/.test(img)
    case 'denim':
      return /denim|jean|데님/.test(name) || /denim|jean/.test(img)
    case 'cotton':
      return /치노|chino|cotton|코튼/.test(name) || /cotton|chino/.test(img)
    case 'leggings':
      return /leggings|레깅스/.test(name)
    case 'suit':
      return /suit|정장/.test(name)
    case 'training':
      return /training|트레이닝/.test(name)
    default:
      return true
  }
}

export function createDemoAxios(kind: DemoApiKind) {
  const adapter: AxiosAdapter = async (config) => {
    const method = (config.method ?? 'get').toUpperCase()
    const { pathname, searchParams } = joined(config)

    // ---- runpod (image search) ----
    if (kind === 'runpod') {
      if (pathname.endsWith('/products/image-search') && method === 'POST') {
        return ok(config, demoImageSearch)
      }
      return ok(config, { message: 'demo runpod: not found' }, 404)
    }

    // ---- fast ----
    if (kind === 'fast') {
      if (pathname.endsWith('/user/save') && method === 'POST') {
        return ok(config, { success: true, code: 200, message: 'ok' })
      }

      if (pathname.endsWith('/recommend') && method === 'GET') {
        const page = Number(searchParams.get('page') ?? '0')
        const size = Number(searchParams.get('size') ?? '10')
        const { slice, total, totalPages } = pageSlice(demoProducts, page, size)
        return ok(config, {
          status: 200,
          message: 'ok',
          result: {
            recommended_products: slice.map((p, i) => ({
              productId: p.productId,
              similarityScore: 0.85 + i * 0.01,
              productName: p.productName,
              productBrand: p.productBrand,
              productPrice: p.productPrice,
              productImageUrl: p.productImageUrl,
              productUrl: p.productUrl,
              styleList: p.styleList,
              liked: demoLikedProductIds.has(p.productId),
            })),
            styleTags: [
              ['캐주얼', 12],
              ['스트릿', 9],
            ],
            pagination: {
              current_page: page,
              page_size: size,
              total_items: total,
              total_pages: totalPages,
              has_next: page + 1 < totalPages,
            },
          },
        })
      }

      if (pathname.endsWith('/products/rank') && method === 'GET') {
        const category = searchParams.get('category') ?? ''
        const page = Number(searchParams.get('page') ?? '0')
        const size = Number(searchParams.get('size') ?? '10')
        const ranked = category ? demoProducts.filter((p) => matchesRankCategory(p, category)) : demoProducts
        const { slice, total, last, totalPages } = pageSlice(ranked, page, size)
        const content = slice.map((p) => ({
          ...p,
          liked: demoLikedProductIds.has(p.productId),
          styleList: p.styleList,
        }))
        return ok(config, {
          success: true,
          code: 200,
          message: 'ok',
          data: {
            popularClothes: {
              content,
              pageable: {
                sort: { sorted: false, unsorted: true, empty: true },
                offset: page * size,
                pageNumber: page,
                pageSize: size,
                paged: true,
                unpaged: false,
              },
              last,
              totalPages,
              totalElements: total,
              size,
              number: page,
              sort: { sorted: false, unsorted: true, empty: true },
              first: page === 0,
              numberOfElements: content.length,
              empty: content.length === 0,
            },
          },
        })
      }

      return ok(config, { message: 'demo fast: not found' }, 404)
    }

    // ---- main ----
    if (pathname.endsWith('/products/rank') && method === 'GET') {
      const category = searchParams.get('category') ?? ''
      const page = Number(searchParams.get('page') ?? '0')
      const size = Number(searchParams.get('size') ?? '30')
      const ranked = category ? demoProducts.filter((p) => matchesRankCategory(p, category)) : demoProducts
      const { slice, total, last, totalPages } = pageSlice(ranked, page, size)
      const content = slice.map((p) => ({
        ...p,
        liked: demoLikedProductIds.has(p.productId),
        styleList: p.styleList,
      }))
      return ok(config, {
        success: true,
        code: 200,
        message: 'ok',
        data: {
          popularClothes: {
            content,
            pageable: {
              sort: { sorted: false, unsorted: true, empty: true },
              offset: page * size,
              pageNumber: page,
              pageSize: size,
              paged: true,
              unpaged: false,
            },
            last,
            totalPages,
            totalElements: total,
            size,
            number: page,
            sort: { sorted: false, unsorted: true, empty: true },
            first: page === 0,
            numberOfElements: content.length,
            empty: content.length === 0,
          },
        },
      })
    }

    if (pathname.startsWith('/products/likes/') && method === 'POST') {
      return ok(config, { success: true, code: 200, message: 'ok', data: null })
    }

    if (pathname.endsWith('/my/likes') && method === 'GET') {
      // 다양한 코드에서 response.data.data 또는 response.data 를 기대하므로 둘 다 제공
      const liked = demoWishlist.map((x) => {
        const p = getDemoProduct(x.productId)
        return {
          productId: x.productId,
          productName: p.productName,
          productBrand: p.productBrand,
          productPrice: p.productPrice,
          productImageUrl: x.productImageUrl,
          productUrl: p.productUrl,
          styleList: p.styleList,
          productCategory: x.productCategory,
        }
      })
      return ok(config, { success: true, code: 200, message: 'ok', data: liked })
    }

    if (pathname.endsWith('/my/coordination') && method === 'GET') {
      return ok(config, {
        success: true,
        code: 200,
        message: 'ok',
        data: demoCoordination,
      })
    }

    if (pathname.endsWith('/my/coordination') && method === 'POST') {
      return ok(config, { success: true, code: 201, message: 'saved' }, 201)
    }

    if (pathname.startsWith('/my/coordination/') && method === 'DELETE') {
      return ok(config, { success: true, message: 'deleted' })
    }

    if (pathname.endsWith('/my/mannequins') && method === 'GET') {
      return ok(config, { success: true, code: 200, message: 'ok', data: demoMannequins })
    }

    if (pathname.includes('/my/try-on') && method === 'POST') {
      return ok(config, { UnionImageUrl: demoProducts[0].productImageUrl })
    }

    if (pathname.startsWith('/products/detail/') && method === 'GET') {
      const id = pathname.split('/').pop() ?? 'demo-001'
      const p = getDemoProduct(id)
      return ok(config, {
        success: true,
        code: 200,
        message: 'ok',
        data: {
          productId: p.productId,
          productImageUrl: p.productImageUrl,
          productBrand: p.productBrand,
          productName: p.productName,
          productPrice: p.productPrice,
          productUrl: p.productUrl,
          styleList: p.styleList,
          isLiked: demoLikedProductIds.has(p.productId),
        },
      })
    }

    if (pathname.endsWith('/products/search') && method === 'GET') {
      const keyword = (searchParams.get('keyword') ?? '').trim()
      const kw = keyword.toLowerCase()
      const page = Number(searchParams.get('page') ?? '0')
      const size = Number(searchParams.get('size') ?? '20')
      const filtered = keyword
        ? demoProducts.filter(
            (p) =>
              p.productName.toLowerCase().includes(kw) ||
              p.productBrand.toLowerCase().includes(kw) ||
              p.styleList.some((s) => s.toLowerCase().includes(kw)) ||
              // 파일명(확장자 포함)으로도 검색 가능하게
              p.productImageUrl.toLowerCase().includes(kw),
          )
        : []
      const { slice, total, last, totalPages } = pageSlice(filtered, page, size)
      const content = slice.map((p) => ({
        ...p,
        isLiked: demoLikedProductIds.has(p.productId),
      }))
      return ok(config, {
        success: true,
        code: 200,
        message: 'ok',
        data: {
          content,
          totalElements: total,
          totalPages,
          size,
          number: page,
          first: page === 0,
          last,
          numberOfElements: content.length,
          empty: content.length === 0,
        },
      })
    }

    if (pathname.endsWith('/search/history') && method === 'GET') {
      return ok(config, { success: true, code: 200, message: 'ok', data: demoSearchHistory })
    }

    if (pathname.endsWith('/search/history') && method === 'DELETE') {
      return ok(config, { success: true, code: 200, message: 'ok', data: null })
    }

    if (pathname.endsWith('/search/rank') && method === 'GET') {
      return ok(config, { success: true, code: 200, message: 'ok', data: demoPopularQueries })
    }

    if (pathname.endsWith('/auth/logout') && method === 'POST') {
      return ok(config, { success: true, code: 200, message: 'ok' })
    }

    return ok(config, { message: 'demo main: not found' }, 404)
  }

  return axios.create({
    adapter,
    baseURL: `http://demo.${kind}/`,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  })
}

