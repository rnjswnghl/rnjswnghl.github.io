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
        const page = Number(searchParams.get('page') ?? '0')
        const size = Number(searchParams.get('size') ?? '10')
        const { slice, total, last, totalPages } = pageSlice(demoProducts, page, size)
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
      const page = Number(searchParams.get('page') ?? '0')
      const size = Number(searchParams.get('size') ?? '30')
      const { slice, total, last, totalPages } = pageSlice(demoProducts, page, size)
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
      const page = Number(searchParams.get('page') ?? '0')
      const size = Number(searchParams.get('size') ?? '20')
      const filtered = keyword
        ? demoProducts.filter(
            (p) =>
              p.productName.includes(keyword) ||
              p.productBrand.includes(keyword) ||
              p.styleList.some((s) => s.includes(keyword)),
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

