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

function normalizeForSearch(s: string) {
  return (s ?? '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[()[\]{}'"`~!@#$%^&*+=|\\:;,.?/<>_-]/g, '')
}

function buildStyleTagCounts(products: typeof demoProducts) {
  const counts = new Map<string, number>()
  for (const p of products) {
    for (const tag of p.styleList ?? []) {
      const key = tag.trim()
      if (!key) continue
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}

// 두벌식(영문 자판) → 한글 조합 (간단 IME)
// 예: "wk" → "자", "wk켓" → "자켓"
function qwertyToHangul(input: string) {
  const L = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
  const V = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'
  const T = '\0ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'

  const consonant: Record<string, string> = {
    r: 'ㄱ',
    R: 'ㄲ',
    s: 'ㄴ',
    e: 'ㄷ',
    E: 'ㄸ',
    f: 'ㄹ',
    a: 'ㅁ',
    q: 'ㅂ',
    Q: 'ㅃ',
    t: 'ㅅ',
    T: 'ㅆ',
    d: 'ㅇ',
    w: 'ㅈ',
    W: 'ㅉ',
    c: 'ㅊ',
    z: 'ㅋ',
    x: 'ㅌ',
    v: 'ㅍ',
    g: 'ㅎ',
  }
  const vowel: Record<string, string> = {
    k: 'ㅏ',
    o: 'ㅐ',
    i: 'ㅑ',
    O: 'ㅒ',
    j: 'ㅓ',
    p: 'ㅔ',
    u: 'ㅕ',
    P: 'ㅖ',
    h: 'ㅗ',
    y: 'ㅛ',
    n: 'ㅜ',
    b: 'ㅠ',
    m: 'ㅡ',
    l: 'ㅣ',
  }
  const vowelCombo: Record<string, string> = {
    hk: 'ㅘ',
    ho: 'ㅙ',
    hl: 'ㅚ',
    nj: 'ㅝ',
    np: 'ㅞ',
    nl: 'ㅟ',
    ml: 'ㅢ',
  }
  const finalCombo: Record<string, string> = {
    rt: 'ㄳ',
    sw: 'ㄵ',
    sg: 'ㄶ',
    fr: 'ㄺ',
    fa: 'ㄻ',
    fq: 'ㄼ',
    ft: 'ㄽ',
    fx: 'ㄾ',
    fv: 'ㄿ',
    fg: 'ㅀ',
    qt: 'ㅄ',
  }

  const isCon = (ch: string) => ch in consonant
  const isVow = (ch: string) => ch in vowel
  const li = (j: string) => L.indexOf(j)
  const vi = (j: string) => V.indexOf(j)
  const ti = (j: string) => T.indexOf(j)

  const flush = (lIdx: number, vIdx: number, tIdx: number) =>
    String.fromCharCode(0xac00 + (lIdx * 21 + vIdx) * 28 + tIdx)

  let out = ''
  let LIdx = -1
  let VIdx = -1
  let TIdx = 0

  const pushJamoOrChar = (ch: string) => {
    // 조합 중이면 flush 후 추가
    if (LIdx !== -1 && VIdx !== -1) {
      out += flush(LIdx, VIdx, TIdx)
      LIdx = -1
      VIdx = -1
      TIdx = 0
    }
    out += ch
  }

  const commitIfComplete = () => {
    if (LIdx !== -1 && VIdx !== -1) {
      out += flush(LIdx, VIdx, TIdx)
      LIdx = -1
      VIdx = -1
      TIdx = 0
    } else if (LIdx !== -1) {
      // 초성만 있으면 자모로 출력
      out += L[LIdx]
      LIdx = -1
    }
  }

  const chars = [...input]
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]
    if (!isCon(ch) && !isVow(ch)) {
      commitIfComplete()
      out += ch
      continue
    }

    // 모음 처리
    if (isVow(ch)) {
      // 중성 아직 없고, 초성도 없으면 'ㅇ'으로 시작
      if (LIdx === -1) LIdx = li('ㅇ')

      const next = chars[i + 1]
      const comboKey = ch + (next ?? '')
      if (next && isVow(next) && vowelCombo[comboKey]) {
        // 복모음
        if (VIdx === -1) VIdx = vi(vowelCombo[comboKey])
        else {
          // 이미 중성이 있으면 flush 후 새 글자 시작
          out += flush(LIdx, VIdx, TIdx)
          LIdx = li('ㅇ')
          VIdx = vi(vowelCombo[comboKey])
          TIdx = 0
        }
        i += 1
      } else {
        if (VIdx === -1) VIdx = vi(vowel[ch])
        else {
          // 중성이 이미 있으면 flush 후 새 글자 시작
          out += flush(LIdx, VIdx, TIdx)
          LIdx = li('ㅇ')
          VIdx = vi(vowel[ch])
          TIdx = 0
        }
      }

      // 받침이 있었는데 다음에 모음이 오면 받침을 떼서 다음 글자 초성으로 넘기는 간단 케이스는 생략(검색용이라 충분)
      continue
    }

    // 자음 처리
    const j = consonant[ch]
    const jL = li(j)

    if (LIdx === -1) {
      LIdx = jL
      continue
    }

    if (VIdx === -1) {
      // 초성만 있는 상태에서 또 자음이면 이전 초성 자모 출력 후 갱신
      out += L[LIdx]
      LIdx = jL
      continue
    }

    // 초성+중성 상태: 받침 후보
    const next = chars[i + 1]
    if (next && isCon(next)) {
      const comboKey = ch + next
      if (finalCombo[comboKey]) {
        TIdx = ti(finalCombo[comboKey])
        i += 1
        out += flush(LIdx, VIdx, TIdx)
        LIdx = -1
        VIdx = -1
        TIdx = 0
        continue
      }
    }

    // 단일 받침
    const t = ti(j)
    if (t > 0) {
      TIdx = t
      out += flush(LIdx, VIdx, TIdx)
      LIdx = -1
      VIdx = -1
      TIdx = 0
    } else {
      // 받침 불가 자음이면 flush 후 초성으로
      out += flush(LIdx, VIdx, 0)
      LIdx = jL
      VIdx = -1
      TIdx = 0
    }
  }

  commitIfComplete()
  return out
}

function matchesRankCategory(p: { productName: string; productImageUrl: string }, category: string) {
  const c = (category ?? '').toLowerCase()
  if (!c || c === 'all') return true
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
        const styleTags = buildStyleTagCounts(demoProducts).slice(0, 8)
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
            styleTags,
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
      const kwHangul = qwertyToHangul(keyword).toLowerCase()
      const kwN = normalizeForSearch(keyword)
      const kwHN = normalizeForSearch(kwHangul)
      const page = Number(searchParams.get('page') ?? '0')
      const size = Number(searchParams.get('size') ?? '20')
      const filtered = keyword
        ? demoProducts.filter(
            (p) =>
              // 기본 포함 검색
              p.productName.toLowerCase().includes(kw) ||
              p.productBrand.toLowerCase().includes(kw) ||
              p.styleList.some((s) => s.toLowerCase().includes(kw)) ||
              p.productImageUrl.toLowerCase().includes(kw) ||
              // 영문 자판 입력(두벌식) → 한글 변환 후 검색 (wk켓 → 자켓)
              p.productName.toLowerCase().includes(kwHangul) ||
              p.productBrand.toLowerCase().includes(kwHangul) ||
              p.styleList.some((s) => s.toLowerCase().includes(kwHangul)) ||
              p.productImageUrl.toLowerCase().includes(kwHangul) ||
              // 공백/특수문자 제거한 느슨한 매칭
              normalizeForSearch(p.productName).includes(kwN) ||
              normalizeForSearch(p.productBrand).includes(kwN) ||
              p.styleList.some((s) => normalizeForSearch(s).includes(kwN)) ||
              normalizeForSearch(p.productImageUrl).includes(kwN) ||
              normalizeForSearch(p.productName).includes(kwHN) ||
              normalizeForSearch(p.productBrand).includes(kwHN) ||
              p.styleList.some((s) => normalizeForSearch(s).includes(kwHN)) ||
              normalizeForSearch(p.productImageUrl).includes(kwHN),
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

