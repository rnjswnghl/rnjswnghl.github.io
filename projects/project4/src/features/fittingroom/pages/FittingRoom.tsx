/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect, useCallback, useReducer, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { AxiosError } from 'axios'
import { RefreshCw } from 'lucide-react'
import defaultMannequinImage from '@/common/assets/default_mannequin2.png'
import {
  ModelViewer,
  ActionButtons,
  TabButtons,
  CategoryTabs,
  HybridScrollGrid,
  UploadModal,
  ButtonsContainer,
} from '@/features/fittingroom/components'
import FittingClothesDetailModal from '@/common/clothes_detail/pages/FittingClothesDetailModal'
import CodiDetailModal from '@/common/clothes_detail/pages/CodiDetailModal'
import type { ClothesData } from '@/common/clothes_detail/types/clothes'
import {
  getProductDetail,
  getLikedProducts,
  toggleProductLike,
} from '@/common/clothes_detail/apis/clothesDetailApi'
import { useWishlistStore } from '@/features/fittingroom/stores/wishlistStore'
import { useCoordinationStore } from '@/features/fittingroom/stores/coordinationStore'
import { type TabType, type CategoryType } from '@/features/fittingroom/types'
import {
  saveCoordination,
  validateCoordinationData,
} from '@/features/fittingroom/apis/saveCoordinationApi'
import { deleteCoordination } from '@/features/fittingroom/apis/coordinationApi'
import {
  updateMannequin,
  deleteMannequin,
  getMannequins,
  type Mannequin,
} from '@/features/fittingroom/apis/mannequinApi'
import {
  tryOnClothes,
  type TryOnRequest,
} from '@/features/fittingroom/apis/tryOn'
import { useAuthStore } from '@/common/auth/stores/authStore'
import { ToastProvider, useToast } from '@/common/components/Toast'

const MyPageContent = () => {
  const navigate = useNavigate()
  const { success, error: showError, warning } = useToast()

  // 디폴트 마네킹 이미지 체크 헬퍼 함수 - 최적화
  const isDefaultMannequinImage = useCallback((imageUrl: string) => {
    return (
      imageUrl === defaultMannequinImage ||
      imageUrl ===
        'https://myssafy.s3.us-east-1.amazonaws.com/mannequin/default_mannequin.png'
    )
  }, [])

  // Auth store 연동
  const { isLoggedIn, member } = useAuthStore()

  // Wishlist store 연동
  const {
    wishlistItems: apiWishlistItems,
    rawWishlistData,
    isLoading: wishlistLoading,
    error: wishlistError,
    activeCategory: storeActiveCategory,
    fetchWishlist,
    setCategory,
    clearError: clearWishlistError,
  } = useWishlistStore()

  // Coordination store 연동
  const {
    coordinationItems: apiCoordinationItems,
    rawCoordinationData,
    isLoading: coordinationLoading,
    error: coordinationError,
    fetchCoordination,
    clearError: clearCoordinationError,
  } = useCoordinationStore()

  // UI 상태 타입 정의
  interface UIState {
    modals: {
      upload: boolean
      clothesDetail: boolean
      codiDetail: boolean
    }
    loading: {
      tryOn: boolean
      upload: boolean
      delete: boolean
      download: boolean
      save: boolean
      deleteCoordination: boolean
    }
    selection: {
      isMode: boolean
      items: { upperId?: string; lowerId?: string }
      dragOver: boolean
    }
    deleteMode: {
      isMode: boolean
      selectedCodiIds: number[]
    }
    tryOn: {
      currentItems: { upperId?: string; lowerId?: string }
      isFirstTryOn: boolean
    }
  }

  type UIAction =
    | { type: 'TOGGLE_MODAL'; modal: keyof UIState['modals']; value?: boolean }
    | { type: 'SET_LOADING'; key: keyof UIState['loading']; value: boolean }
    | { type: 'SET_SELECTION_MODE'; value: boolean }
    | {
        type: 'SET_SELECTED_ITEMS'
        items: { upperId?: string; lowerId?: string }
      }
    | { type: 'SET_DRAG_OVER'; value: boolean }
    | {
        type: 'SET_CURRENT_TRY_ON'
        items: { upperId?: string; lowerId?: string }
      }
    | { type: 'SET_FIRST_TRY_ON'; value: boolean }
    | { type: 'RESET_SELECTION' }
    | { type: 'SET_DELETE_MODE'; value: boolean }
    | { type: 'SET_SELECTED_CODI_IDS'; ids: number[] }
    | { type: 'TOGGLE_CODI_SELECTION'; id: number }
    | { type: 'RESET_DELETE_SELECTION' }

  const uiReducer = (state: UIState, action: UIAction): UIState => {
    switch (action.type) {
      case 'TOGGLE_MODAL':
        return {
          ...state,
          modals: {
            ...state.modals,
            [action.modal]: action.value ?? !state.modals[action.modal],
          },
        }
      case 'SET_LOADING':
        return {
          ...state,
          loading: { ...state.loading, [action.key]: action.value },
        }
      case 'SET_SELECTION_MODE':
        return {
          ...state,
          selection: { ...state.selection, isMode: action.value },
        }
      case 'SET_SELECTED_ITEMS':
        return {
          ...state,
          selection: { ...state.selection, items: action.items },
        }
      case 'SET_DRAG_OVER':
        return {
          ...state,
          selection: { ...state.selection, dragOver: action.value },
        }
      case 'SET_CURRENT_TRY_ON':
        return {
          ...state,
          tryOn: { ...state.tryOn, currentItems: action.items },
        }
      case 'SET_FIRST_TRY_ON':
        return {
          ...state,
          tryOn: { ...state.tryOn, isFirstTryOn: action.value },
        }
      case 'RESET_SELECTION':
        return {
          ...state,
          selection: { ...state.selection, items: {} },
        }
      case 'SET_DELETE_MODE':
        return {
          ...state,
          deleteMode: { ...state.deleteMode, isMode: action.value },
        }
      case 'SET_SELECTED_CODI_IDS':
        return {
          ...state,
          deleteMode: { ...state.deleteMode, selectedCodiIds: action.ids },
        }
      case 'TOGGLE_CODI_SELECTION':
        return {
          ...state,
          deleteMode: {
            ...state.deleteMode,
            selectedCodiIds: state.deleteMode.selectedCodiIds.includes(
              action.id,
            )
              ? state.deleteMode.selectedCodiIds.filter(
                  (id) => id !== action.id,
                )
              : [...state.deleteMode.selectedCodiIds, action.id],
          },
        }
      case 'RESET_DELETE_SELECTION':
        return {
          ...state,
          deleteMode: { ...state.deleteMode, selectedCodiIds: [] },
        }
      default:
        return state
    }
  }

  // UI 상태 통합 관리
  const [uiState, uiDispatch] = useReducer(uiReducer, {
    modals: {
      upload: false,
      clothesDetail: false,
      codiDetail: false,
    },
    loading: {
      tryOn: false,
      upload: false,
      delete: false,
      download: false,
      save: false,
      deleteCoordination: false,
    },
    selection: {
      isMode: false,
      items: {},
      dragOver: false,
    },
    deleteMode: {
      isMode: false,
      selectedCodiIds: [],
    },
    tryOn: {
      currentItems: {},
      isFirstTryOn: true,
    },
  })

  // 기존 상태들 - 통합되지 않은 것들
  const [activeTab, setActiveTab] = useState<TabType>('wishlist')
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Total')

  // 상태 변화 디버깅을 위한 useEffect
  useEffect(() => {
    console.log('UI State changed:', {
      selectionMode: uiState.selection.isMode,
      deleteMode: uiState.deleteMode.isMode,
      selectedCodiIds: uiState.deleteMode.selectedCodiIds,
    })
  }, [
    uiState.selection.isMode,
    uiState.deleteMode.isMode,
    uiState.deleteMode.selectedCodiIds,
  ])
  const [mannequinImage, setMannequinImage] = useState<string>('')
  const [originalMannequinImage, setOriginalMannequinImage] = useState<string>(
    defaultMannequinImage,
  )
  const [originalMannequinImages, setOriginalMannequinImages] = useState<
    string[]
  >([
    defaultMannequinImage,
    defaultMannequinImage,
    defaultMannequinImage,
    defaultMannequinImage,
  ])
  const [selectedClothesData, setSelectedClothesData] =
    useState<ClothesData | null>(null)

  // CodiDetailModal 상태 (now managed by uiState)
  const [selectedCodiData, setSelectedCodiData] = useState<{
    id: string
    upper?: {
      id: string
      brand: string
      name: string
      price: number
      productUrl: string
      tags?: string[]
      imageUrl: string
    }
    lower?: {
      id: string
      brand: string
      name: string
      price: number
      productUrl: string
      tags?: string[]
      imageUrl: string
    }
  } | null>(null)
  const [upperLiked, setUpperLiked] = useState(false)
  const [lowerLiked, setLowerLiked] = useState(false)

  // 마네킹 목록 및 현재 선택된 마네킹 (고정 4개)
  const [mannequins, setMannequins] = useState<Mannequin[]>([])
  const [selectedMannequinIndex, setSelectedMannequinIndex] = useState(0)

  // 마네킹 이미지 표시용 배열 (4개 고정) - useMemo로 최적화
  // 깜빡임 방지를 위해 데이터 로딩 전까지는 빈 문자열 사용
  const mannequinImages = useMemo(() => {
    // 마네킹 데이터가 아직 로딩되지 않았다면 빈 문자열 배열 반환
    if (mannequins.length === 0) {
      return ['', '', '', '']
    }

    return Array.from({ length: 4 }, (_, i) => {
      const mannequin = mannequins[i]
      return mannequin &&
        mannequin.mannequinImageUrl !== 'default_mannequin_image'
        ? mannequin.mannequinImageUrl
        : defaultMannequinImage
    })
  }, [mannequins])

  // 마네킹 목록 가져오기 함수 (실제 API 스펙에 맞게 수정)
  const fetchMannequins = useCallback(async () => {
    if (!isLoggedIn) return

    try {
      const result = await getMannequins()

      if (result.success) {
        setMannequins(result.data)

        // 초기 원본 마네킹 이미지들 설정 - fetchMannequins 내에서 직접 계산
        const initialImages = Array.from({ length: 4 }, (_, i) => {
          const mannequin = result.data[i]
          return mannequin?.mannequinImageUrl !== 'default_mannequin_image'
            ? mannequin.mannequinImageUrl
            : defaultMannequinImage
        })
        setOriginalMannequinImages(initialImages)

        // 첫 번째 마네킹을 기본 선택 및 이미지 즉시 설정 (깜빡임 방지)
        if (result.data.length > 0 && result.data[0]) {
          setSelectedMannequinIndex(0)
          const firstMannequinImage =
            result.data[0].mannequinImageUrl !== 'default_mannequin_image'
              ? result.data[0].mannequinImageUrl
              : defaultMannequinImage
          setMannequinImage(firstMannequinImage)
          setOriginalMannequinImage(firstMannequinImage)
        }
      }
    } catch (error) {
      console.error('마네킹 목록 조회 실패:', error)
    }
  }, [isLoggedIn])

  // 비로그인 시 메인페이지로 리다이렉트 + 토스트 표시
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/main', {
        replace: true,
        state: { showLoginToast: true },
      })
      return
    }

    // 로그인된 경우에만 데이터 가져오기
    fetchWishlist()
    fetchCoordination()
    fetchMannequins()
  }, [isLoggedIn, navigate, fetchWishlist, fetchCoordination, fetchMannequins])

  // 스토어의 activeCategory와 로컬 상태 동기화
  useEffect(() => {
    setActiveCategory(storeActiveCategory)
  }, [storeActiveCategory])

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)

    // 탭 변경 시 선택 모드 및 삭제 모드 종료
    if (uiState.selection.isMode) {
      uiDispatch({ type: 'SET_SELECTION_MODE', value: false })
      uiDispatch({ type: 'RESET_SELECTION' })
    }
    if (uiState.deleteMode.isMode) {
      uiDispatch({ type: 'SET_DELETE_MODE', value: false })
      uiDispatch({ type: 'RESET_DELETE_SELECTION' })
    }

    if (tab === 'wishlist') {
      // 찜목록 탭 클릭 시 API 호출하여 최신 데이터 가져오기
      fetchWishlist()
      // 에러가 있다면 클리어
      if (wishlistError) {
        clearWishlistError()
      }
    } else if (tab === 'mycodi') {
      // 내코디 탭 클릭 시 API 호출하여 최신 데이터 가져오기
      fetchCoordination()
      // 에러가 있다면 클리어
      if (coordinationError) {
        clearCoordinationError()
      }
    }

    setActiveCategory('Total') // 탭 변경 시 카테고리 초기화
    setCategory('Total') // 스토어 상태도 초기화
  }

  const handleCategoryClick = (category: CategoryType) => {
    setActiveCategory(category)
    setCategory(category) // 스토어 상태도 업데이트
  }

  const handleUploadClick = () => {
    uiDispatch({ type: 'TOGGLE_MODAL', modal: 'upload', value: true })
  }

  const handleDeleteClick = async () => {
    if (!isLoggedIn || !member) {
      showError('오류!', '로그인이 필요합니다.')
      return
    }

    if (uiState.loading.delete || uiState.loading.upload) return

    // 현재 선택된 마네킹이 기본 이미지인지 확인
    const selectedMannequin = mannequins[selectedMannequinIndex]
    if (
      !selectedMannequin ||
      selectedMannequin.mannequinImageUrl === 'default_mannequin_image'
    ) {
      warning('삭제 불가', '삭제할 마네킹 이미지가 없습니다.')
      return
    }

    try {
      uiDispatch({ type: 'SET_LOADING', key: 'delete', value: true })

      // 삭제 API 호출
      await deleteMannequin(selectedMannequin.mannequinId)

      // 마네킹 목록 데이터를 'default_mannequin_image'로 업데이트
      const updatedMannequins = [...mannequins]
      updatedMannequins[selectedMannequinIndex] = {
        ...updatedMannequins[selectedMannequinIndex],
        mannequinImageUrl: 'default_mannequin_image',
      }
      setMannequins(updatedMannequins)

      // 즉시 디폴트 마네킹 이미지로 UI 업데이트
      setMannequinImage(defaultMannequinImage)

      success('삭제 완료', '마네킹 이미지가 삭제되었습니다.')
    } catch (error) {
      console.error('마네킹 이미지 삭제 실패:', error)
      if (error instanceof AxiosError) {
        showError(
          '삭제 실패',
          `마네킹 이미지 삭제에 실패했습니다: ${error.response?.data?.message || error.message}`,
        )
      } else {
        showError('삭제 실패', '마네킹 이미지 삭제에 실패했습니다.')
      }
    } finally {
      uiDispatch({ type: 'SET_LOADING', key: 'delete', value: false })
    }
  }

  const handleUploadModalClose = () => {
    uiDispatch({ type: 'TOGGLE_MODAL', modal: 'upload', value: false })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processUploadedFile(file)
    }
  }

  // 파일 유효성 검사 함수
  const validateFile = (file: File): { isValid: boolean; message?: string } => {
    // 파일 크기 검사 (10MB 제한)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return {
        isValid: false,
        message:
          '파일 크기가 10MB를 초과합니다. 더 작은 이미지를 사용해주세요.',
      }
    }

    // 파일 확장자 검사 (.gif 차단, 이미지 파일만 허용)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        message:
          '지원하지 않는 파일 형식입니다. JPG, PNG, WEBP 파일만 업로드해주세요.',
      }
    }

    return { isValid: true }
  }

  const processUploadedFile = async (file: File) => {
    if (!file) {
      warning('파일 선택 필요', '파일이 선택되지 않았습니다.')
      return
    }

    // 파일 유효성 검사
    const validation = validateFile(file)
    if (!validation.isValid) {
      warning(
        '파일 검증 실패',
        validation.message || '파일 유효성 검사에 실패했습니다.',
      )
      return
    }

    if (!isLoggedIn || !member) {
      showError('오류!', '로그인이 필요합니다.')
      return
    }

    if (uiState.loading.upload) return

    try {
      uiDispatch({ type: 'SET_LOADING', key: 'upload', value: true })

      // 현재 선택된 마네킹 ID 확인
      if (mannequins.length === 0) {
        warning(
          '잠시만 기다려주세요',
          '마네킹 목록을 불러오는 중입니다. 잠시 후 다시 시도해주세요.',
        )
        return
      }

      const selectedMannequin = mannequins[selectedMannequinIndex]
      const mannequinId = selectedMannequin.mannequinId

      // API 호출로 마네킹 이미지 변경
      const result = await updateMannequin(mannequinId, file)

      if (result.success) {
        // 성공 시 업로드된 이미지 URL로 마네킹 이미지 업데이트
        setMannequinImage(result.data.mannequinImageUrl)
        // 새로 업로드된 이미지를 원본 이미지로도 설정
        setOriginalMannequinImage(result.data.mannequinImageUrl)

        // 마네킹 목록 데이터도 업데이트
        const updatedMannequins = [...mannequins]
        updatedMannequins[selectedMannequinIndex] = {
          ...updatedMannequins[selectedMannequinIndex],
          mannequinImageUrl: result.data.mannequinImageUrl,
        }
        setMannequins(updatedMannequins)

        success('업로드 완료', '마네킹 이미지가 성공적으로 변경되었습니다!')
        uiDispatch({ type: 'TOGGLE_MODAL', modal: 'upload', value: false })
      }
    } catch (error: unknown) {
      console.error('마네킹 이미지 변경 실패:', error)

      let errorMessage = '마네킹 이미지 변경에 실패했습니다.'

      // Axios 에러 처리
      if (error instanceof AxiosError) {
        const status = error.response?.status

        if (status === 413) {
          errorMessage =
            '파일 크기가 너무 큽니다. 10MB 이하의 이미지를 사용해주세요.'
        } else if (status === 405) {
          errorMessage =
            'API 메소드가 지원되지 않습니다.\n\n백엔드팀에 /my/mannequins 엔드포인트의 허용 메소드(PUT/POST/PATCH)를 확인해주세요.'
        } else if (status === 400) {
          // 400 Bad Request - 요청 형식 오류
          const backendMessage =
            error.response?.data?.message || '잘못된 요청입니다.'
          errorMessage = `요청 형식 오류: ${backendMessage}\n\n가능한 원인:\n• 파일 형식 문제\n• 파라미터명 불일치\n• 필수값 누락`
        } else if (status === 415) {
          errorMessage =
            '지원하지 않는 파일 형식입니다.\n\nPNG 또는 JPG 파일만 업로드해주세요.'
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.message === 'Network Error') {
          errorMessage =
            'CORS 또는 네트워크 오류가 발생했습니다.\n\n개발 중에는 백엔드 CORS 설정이 필요합니다.'
        }
      } else if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = (error as { code: number }).code
        errorMessage = `에러 코드: ${errorCode}`
      }

      showError('업로드 실패', errorMessage)
    } finally {
      uiDispatch({ type: 'SET_LOADING', key: 'upload', value: false })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    uiDispatch({ type: 'SET_DRAG_OVER', value: true })
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    uiDispatch({ type: 'SET_DRAG_OVER', value: false })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    uiDispatch({ type: 'SET_DRAG_OVER', value: false })

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      processUploadedFile(files[0])
    }
  }

  // 첫 시착 처리 헬퍼 함수
  const handleFirstTryOn = useCallback(() => {
    if (uiState.tryOn.isFirstTryOn) {
      setOriginalMannequinImage(mannequinImage)
      setOriginalMannequinImages(mannequinImages)
      uiDispatch({ type: 'SET_FIRST_TRY_ON', value: false })
    }
  }, [uiState.tryOn.isFirstTryOn, mannequinImage, mannequinImages])

  // 코디 데이터 조회 헬퍼 함수
  const findCoordinationData = useCallback(
    (coordinationId: number) => {
      const rawData = apiCoordinationItems.find(
        (item) =>
          item.coordinationId === coordinationId && item.isFullCoordination,
      )
      const originalData = rawCoordinationData.find(
        (data) => data.coordinationId === coordinationId,
      )
      return { rawData, originalData }
    },
    [apiCoordinationItems, rawCoordinationData],
  )

  // 시착 데이터 준비 헬퍼 함수
  const prepareTryOnData = useCallback(
    (itemId: string, itemType: string, selectedMannequin: Mannequin) => {
      if (itemType === 'full') {
        const coordinationId = parseInt(itemId.replace('-full', ''))
        const { rawData, originalData } = findCoordinationData(coordinationId)

        if (!rawData || !originalData?.upperId || !originalData?.lowerId) {
          throw new Error('코디 정보를 찾을 수 없습니다.')
        }

        return {
          mannequinId: selectedMannequin.mannequinId,
          upperId: originalData.upperId,
          lowerId: originalData.lowerId,
        }
      } else {
        const actualItemId = itemId.includes('-')
          ? itemId.split('-')[0]
          : itemId
        const newTryOnData: TryOnRequest = {
          mannequinId: selectedMannequin.mannequinId,
        }

        if (itemType === 'top') {
          newTryOnData.upperId = actualItemId
          if (uiState.tryOn.currentItems.lowerId) {
            newTryOnData.lowerId = uiState.tryOn.currentItems.lowerId
          }
        } else if (itemType === 'bottom') {
          newTryOnData.lowerId = actualItemId
          if (uiState.tryOn.currentItems.upperId) {
            newTryOnData.upperId = uiState.tryOn.currentItems.upperId
          }
        }

        return newTryOnData
      }
    },
    [findCoordinationData, uiState.tryOn.currentItems],
  )

  // 시착하기 함수 - 분할된 버전
  const handleTryOn = async (itemId: string, itemType: string) => {
    if (uiState.loading.tryOn) return

    // 실패시 되돌리기 위해 원래 상태 저장
    const originalTryOnState = { ...uiState.tryOn.currentItems }

    try {
      uiDispatch({ type: 'SET_LOADING', key: 'tryOn', value: true })

      // 즉시 하이라이팅을 위해 시착 버튼 클릭 시점에 상태 업데이트
      if (itemType === 'full') {
        const coordinationId = parseInt(itemId.replace('-full', ''))
        const { originalData } = findCoordinationData(coordinationId)
        if (originalData) {
          uiDispatch({
            type: 'SET_CURRENT_TRY_ON',
            items: {
              upperId: originalData.upperId || undefined,
              lowerId: originalData.lowerId || undefined,
            },
          })
        }
      } else {
        const actualItemId = itemId.includes('-')
          ? itemId.split('-')[0]
          : itemId
        const newItemState: { upperId?: string; lowerId?: string } = {}

        if (itemType === 'top') {
          newItemState.upperId = actualItemId
          if (uiState.tryOn.currentItems.lowerId) {
            newItemState.lowerId = uiState.tryOn.currentItems.lowerId
          }
        } else if (itemType === 'bottom') {
          newItemState.lowerId = actualItemId
          if (uiState.tryOn.currentItems.upperId) {
            newItemState.upperId = uiState.tryOn.currentItems.upperId
          }
        }

        uiDispatch({ type: 'SET_CURRENT_TRY_ON', items: newItemState })
      }

      handleFirstTryOn()

      const selectedMannequin = mannequins[selectedMannequinIndex]
      if (!selectedMannequin) {
        warning('마네킹 선택 필요', '마네킹을 선택해주세요.')
        return
      }

      const tryOnData = prepareTryOnData(itemId, itemType, selectedMannequin)

      // 시착하기 API 호출
      const response = await tryOnClothes(tryOnData)

      // 마네킹 이미지 즉시 업데이트 - data 객체에서 찾기
      const imageUrl =
        response.data?.UnionImageUrl ||
        response.data?.unionImageUrl ||
        response.data?.imageUrl ||
        response.data?.image_url ||
        response.UnionImageUrl ||
        response.unionImageUrl ||
        response.imageUrl ||
        response.image_url

      if (!imageUrl) {
        throw new Error(
          'AI 이미지 URL을 받지 못했습니다. 서버 응답을 확인해주세요.',
        )
      }

      // 상태 업데이트는 이미 클릭 시점에 완료됨

      // 캐시 방지를 위한 타임스탬프 추가
      const cacheBustingUrl = `${imageUrl}?t=${Date.now()}`

      setMannequinImage(cacheBustingUrl)

      // 로컬 상태에서도 마네킹 이미지 업데이트
      const updatedMannequins = [...mannequins]
      updatedMannequins[selectedMannequinIndex] = {
        ...updatedMannequins[selectedMannequinIndex],
        mannequinImageUrl: cacheBustingUrl,
      }
      setMannequins(updatedMannequins)

      // 이미지 업데이트 확실히 반영 (중복 제거)
      setTimeout(() => {
        setMannequinImage(cacheBustingUrl)
      }, 100)
    } catch (error) {
      console.error('시착하기 실패:', error)

      // 실패시 원래 상태로 되돌리기 (즉시 하이라이팅 해제)
      uiDispatch({ type: 'SET_CURRENT_TRY_ON', items: originalTryOnState })

      let errorMessage = '시착하기에 실패했습니다.'

      if (error instanceof AxiosError && error.response) {
        const status = error.response.status
        if (status === 400) {
          errorMessage = '잘못된 요청입니다. 상품 정보를 확인해주세요.'
        } else if (status === 401) {
          errorMessage = '로그인이 필요합니다.'
        } else if (status === 404) {
          errorMessage = '마네킹 또는 상품을 찾을 수 없습니다.'
        } else if (status === 500) {
          errorMessage =
            'AI 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message
        }
      }

      showError('시착 실패', errorMessage)
    } finally {
      uiDispatch({ type: 'SET_LOADING', key: 'tryOn', value: false })
    }
  }

  // 코디 선택 모드 진입
  const handleSelectClick = () => {
    // 찜목록 탭이 아니면 찜목록으로 전환
    if (activeTab !== 'wishlist') {
      setActiveTab('wishlist')
    }
    uiDispatch({ type: 'SET_SELECTION_MODE', value: true })
    uiDispatch({ type: 'RESET_SELECTION' }) // 선택 초기화
  }

  // 아이템 선택 처리 (상의/하의 각각 1개씩만 선택 가능)
  const handleItemSelect = (itemId: string, itemType: string) => {
    const currentItems = uiState.selection.items
    if (itemType === 'top') {
      // 상의 선택: 이미 선택된 상의라면 해제, 아니면 선택
      const newItems = {
        ...currentItems,
        upperId: currentItems.upperId === itemId ? undefined : itemId,
      }
      uiDispatch({ type: 'SET_SELECTED_ITEMS', items: newItems })
    } else if (itemType === 'bottom') {
      // 하의 선택: 이미 선택된 하의라면 해제, 아니면 선택
      const newItems = {
        ...currentItems,
        lowerId: currentItems.lowerId === itemId ? undefined : itemId,
      }
      uiDispatch({ type: 'SET_SELECTED_ITEMS', items: newItems })
    }
  }

  // 코디 저장 처리
  const handleSaveClick = async () => {
    if (uiState.loading.save) return

    // 유효성 검사
    const validation = validateCoordinationData(uiState.selection.items)
    if (!validation.isValid) {
      warning('유효성 검사 실패', validation.message)
      return
    }

    try {
      uiDispatch({ type: 'SET_LOADING', key: 'save', value: true })

      // API 호출
      const result = await saveCoordination(uiState.selection.items)

      if (result.success) {
        success('저장 완료', result.message || '코디가 저장되었습니다!')

        // 저장 후 처리
        uiDispatch({ type: 'SET_SELECTION_MODE', value: false }) // 선택 모드 종료
        uiDispatch({ type: 'RESET_SELECTION' }) // 선택 초기화
        setActiveTab('mycodi') // 내코디 탭으로 전환

        // 내코디 목록 새로고침
        fetchCoordination()
      }
    } catch (error) {
      console.error('코디 저장 실패:', error)
      const errorMessage =
        error instanceof Error ? error.message : '코디 저장에 실패했습니다'
      showError('코디 저장 실패', errorMessage)
    } finally {
      uiDispatch({ type: 'SET_LOADING', key: 'save', value: false })
    }
  }

  // 저장 가능 여부 확인
  const canSave =
    Boolean(
      uiState.selection.items.upperId || uiState.selection.items.lowerId,
    ) && !uiState.loading.save

  // 시착 중인 아이템이 있는지 확인
  const hasTryOnItems = Boolean(
    uiState.tryOn.currentItems.upperId || uiState.tryOn.currentItems.lowerId,
  )

  // 시착 아이템 저장 가능 여부 확인
  const canTryOnSave = hasTryOnItems && !uiState.loading.save

  // 시착 중인 아이템 저장 처리
  const handleTryOnSaveClick = async () => {
    if (uiState.loading.save) return

    // 현재 시착 중인 아이템이 있는지 확인
    if (
      !uiState.tryOn.currentItems.upperId &&
      !uiState.tryOn.currentItems.lowerId
    ) {
      warning('저장 실패', '시착 중인 아이템이 없습니다.')
      return
    }

    // 유효성 검사
    const validation = validateCoordinationData(uiState.tryOn.currentItems)
    if (!validation.isValid) {
      warning('유효성 검사 실패', validation.message)
      return
    }

    try {
      uiDispatch({ type: 'SET_LOADING', key: 'save', value: true })

      // API 호출 - 현재 시착 중인 아이템들을 저장
      const result = await saveCoordination(uiState.tryOn.currentItems)

      if (result.success) {
        success(
          '저장 완료',
          result.message || '시착 중인 코디가 저장되었습니다!',
        )

        // 저장 후 처리
        setActiveTab('mycodi') // 내코디 탭으로 전환

        // 내코디 목록 새로고침
        fetchCoordination()
      }
    } catch (error) {
      console.error('코디 저장 실패:', error)
      const errorMessage =
        error instanceof Error ? error.message : '코디 저장에 실패했습니다'
      showError('코디 저장 실패', errorMessage)
    } finally {
      uiDispatch({ type: 'SET_LOADING', key: 'save', value: false })
    }
  }

  // 코디 선택 취소 처리
  const handleCancelClick = () => {
    uiDispatch({ type: 'SET_SELECTION_MODE', value: false })
    uiDispatch({ type: 'RESET_SELECTION' })
  }

  // 코디 삭제 모드 진입
  const handleCodiDeleteClick = () => {
    uiDispatch({ type: 'SET_DELETE_MODE', value: true })
    uiDispatch({ type: 'RESET_DELETE_SELECTION' }) // 선택 초기화
  }

  // 코디 삭제 취소 처리
  const handleDeleteCancelClick = () => {
    uiDispatch({ type: 'SET_DELETE_MODE', value: false })
    uiDispatch({ type: 'RESET_DELETE_SELECTION' })
  }

  // 코디 선택 처리 (체크박스)
  const handleCodiSelect = (coordinationId: number) => {
    uiDispatch({ type: 'TOGGLE_CODI_SELECTION', id: coordinationId })
  }

  // 선택된 코디들 삭제 실행
  const handleDeleteSaveClick = async () => {
    if (uiState.loading.deleteCoordination) return

    const selectedIds = uiState.deleteMode.selectedCodiIds
    if (selectedIds.length === 0) {
      warning('선택 필요', '삭제할 코디를 선택해주세요.')
      return
    }

    try {
      uiDispatch({
        type: 'SET_LOADING',
        key: 'deleteCoordination',
        value: true,
      })

      // 선택된 모든 코디를 병렬로 삭제
      const deletePromises = selectedIds.map((id) => deleteCoordination(id))
      const results = await Promise.allSettled(deletePromises)

      // 결과 분석
      const successful = results.filter(
        (result) => result.status === 'fulfilled',
      ).length
      const failed = results.filter((result) => result.status === 'rejected')

      if (successful > 0) {
        if (failed.length > 0) {
          warning(
            '부분 삭제 완료',
            `${successful}개 코디가 삭제되었습니다. ${failed.length}개 코디는 삭제에 실패했습니다.`,
          )
        } else {
          success(
            '삭제 완료',
            `${successful}개 코디가 성공적으로 삭제되었습니다.`,
          )
        }

        // 삭제 후 처리
        uiDispatch({ type: 'SET_DELETE_MODE', value: false })
        uiDispatch({ type: 'RESET_DELETE_SELECTION' })

        // 내코디 목록 새로고침
        fetchCoordination()
      } else {
        // 모든 삭제가 실패한 경우
        const firstError = failed[0]
        const errorMessage =
          firstError.status === 'rejected'
            ? firstError.reason.message
            : '코디 삭제에 실패했습니다.'
        showError('코디 삭제 실패', errorMessage)
      }
    } catch (error) {
      console.error('코디 삭제 실패:', error)
      showError('삭제 오류', '코디 삭제 중 오류가 발생했습니다.')
    } finally {
      uiDispatch({
        type: 'SET_LOADING',
        key: 'deleteCoordination',
        value: false,
      })
    }
  }

  // 삭제 가능 여부 확인
  const canDelete =
    uiState.deleteMode.selectedCodiIds.length > 0 &&
    !uiState.loading.deleteCoordination

  // 마네킹 선택 핸들러들
  const handleLeftArrow = () => {
    const newIndex =
      selectedMannequinIndex === 0 ? 3 : selectedMannequinIndex - 1
    setSelectedMannequinIndex(newIndex)
    updateMannequinImage(newIndex)
  }

  const handleRightArrow = () => {
    const newIndex =
      selectedMannequinIndex === 3 ? 0 : selectedMannequinIndex + 1
    setSelectedMannequinIndex(newIndex)
    updateMannequinImage(newIndex)
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedMannequinIndex(index)
    updateMannequinImage(index)
  }

  // 마네킹 전환 시 이미지 업데이트
  const updateMannequinImage = (index: number) => {
    const mannequin = mannequins[index]
    const imageUrl =
      mannequin && mannequin.mannequinImageUrl !== 'default_mannequin_image'
        ? mannequin.mannequinImageUrl
        : defaultMannequinImage

    setMannequinImage(imageUrl)
    setOriginalMannequinImage(imageUrl)

    // 시착 상태 초기화
    uiDispatch({ type: 'SET_CURRENT_TRY_ON', items: {} })
    uiDispatch({ type: 'SET_FIRST_TRY_ON', value: true })

    // 원본 이미지들 업데이트 - 최적화
    setOriginalMannequinImages(mannequinImages)
  }

  // 마네킹 이미지 초기화 - 시착을 한 번도 하지 않았다면 초기화하지 않음
  const handleResetMannequin = () => {
    // 아직 시착을 한 번도 하지 않았다면 초기화하지 않음
    if (uiState.tryOn.isFirstTryOn) {
      warning('초기화 불가', '시착한 상품이 없어서 초기화할 수 없습니다.')
      return
    }

    setMannequinImage(originalMannequinImage)

    // 썸네일 이미지 원본 복원 - 최적화
    const updatedMannequins = mannequins.map((mannequin, i) => {
      if (!mannequin) return mannequin
      const originalImageUrl = originalMannequinImages[i]
      return {
        ...mannequin,
        mannequinImageUrl:
          originalImageUrl === defaultMannequinImage
            ? 'default_mannequin_image'
            : originalImageUrl,
      }
    })
    setMannequins(updatedMannequins)

    // 시착 상태 초기화
    uiDispatch({ type: 'SET_CURRENT_TRY_ON', items: {} })
    uiDispatch({ type: 'SET_FIRST_TRY_ON', value: true })
  }

  // 상세페이지 모달 열기
  const handleDetailClick = async (itemData: ClothesData) => {
    if (activeTab === 'wishlist') {
      // 찜목록 탭: ClothesDetailModal 사용
      setSelectedClothesData(itemData)
      uiDispatch({ type: 'TOGGLE_MODAL', modal: 'clothesDetail', value: true })
    } else if (activeTab === 'mycodi') {
      // 내 코디 탭: 단일 상품인지 전체 코디인지 구분하여 처리
      const coordinationId = parseInt(itemData.productId)

      // rawCoordinationData에서 해당 코디 정보 찾기
      const coordinationItem = rawCoordinationData.find(
        (item) => item.coordinationId === coordinationId,
      )

      if (!coordinationItem) {
        showError('코디 조회 실패', '코디 정보를 찾을 수 없습니다.')
        return
      }

      // 단일 상품인지 전체 코디인지 구분
      const isSingleItem =
        !coordinationItem.upperId || !coordinationItem.lowerId
      const isFullCoordination =
        coordinationItem.upperId && coordinationItem.lowerId

      if (isSingleItem) {
        // 단일 상품인 경우: ClothesDetailModal 사용
        const singleProductId =
          coordinationItem.upperId || coordinationItem.lowerId

        if (!singleProductId) {
          showError('상품 조회 실패', '상품 정보를 찾을 수 없습니다.')
          return
        }

        try {
          // 단일 상품 정보 가져오기
          const response = await getProductDetail(singleProductId)
          if (response.success && response.data) {
            const singleProductData: ClothesData = {
              productId: response.data.productId,
              productBrand: response.data.productBrand,
              productName: response.data.productName,
              productPrice: response.data.productPrice,
              productUrl: response.data.productUrl,
              styleList: response.data.styleList,
              productImageUrl: response.data.productImageUrl,
              liked: response.data.isLiked,
            }
            setSelectedClothesData(singleProductData)
            uiDispatch({
              type: 'TOGGLE_MODAL',
              modal: 'clothesDetail',
              value: true,
            })
          } else {
            showError('상품 로드 실패', '상품 정보를 불러오는데 실패했습니다.')
          }
        } catch (error) {
          console.error('단일 상품 정보 조회 실패:', error)
          showError('상품 로드 실패', '상품 정보를 불러오는데 실패했습니다.')
        }
      } else if (isFullCoordination) {
        // 전체 코디인 경우: CodiDetailModal 사용 (찜하기 정보 API 연동)

        // 개별 상품 정보 가져오기 함수
        const fetchProductInfo = async (productId: string) => {
          try {
            const response = await getProductDetail(productId)
            if (response.success && response.data) {
              return {
                brand: response.data.productBrand,
                name: response.data.productName,
                price: response.data.productPrice,
                productUrl: response.data.productUrl,
                tags: response.data.styleList,
              }
            }
          } catch (error) {
            console.error(`상품 ${productId} 정보 가져오기 실패:`, error)
          }
          return null
        }

        // 찜 목록 조회하여 찜하기 상태 확인
        const fetchLikedStatus = async () => {
          try {
            const likedProducts = await getLikedProducts()
            const upperLiked = coordinationItem.upperId
              ? likedProducts.some(
                  (item) => item.productId === coordinationItem.upperId,
                )
              : false
            const lowerLiked = coordinationItem.lowerId
              ? likedProducts.some(
                  (item) => item.productId === coordinationItem.lowerId,
                )
              : false
            return { upperLiked, lowerLiked }
          } catch (error) {
            console.error('찜 목록 조회 실패:', error)
            return { upperLiked: false, lowerLiked: false }
          }
        }

        try {
          // 상품 정보와 찜 상태를 동시에 가져오기
          const [upperInfo, lowerInfo, likedStatus] = await Promise.all([
            coordinationItem.upperId
              ? fetchProductInfo(coordinationItem.upperId)
              : Promise.resolve(null),
            coordinationItem.lowerId
              ? fetchProductInfo(coordinationItem.lowerId)
              : Promise.resolve(null),
            fetchLikedStatus(),
          ])

          // 코디 데이터를 CodiDetailModal 형식으로 변환
          const codiData = {
            id: coordinationId.toString(),
            upper: coordinationItem.upperId
              ? {
                  id: coordinationItem.upperId,
                  brand: upperInfo?.brand || '브랜드 정보 없음',
                  name:
                    upperInfo?.name || `상의 (ID: ${coordinationItem.upperId})`,
                  price: upperInfo?.price || 0,
                  productUrl: upperInfo?.productUrl || '',
                  tags: upperInfo?.tags || [],
                  imageUrl: coordinationItem.upperImageUrl || '',
                }
              : undefined,
            lower: coordinationItem.lowerId
              ? {
                  id: coordinationItem.lowerId,
                  brand: lowerInfo?.brand || '브랜드 정보 없음',
                  name:
                    lowerInfo?.name || `하의 (ID: ${coordinationItem.lowerId})`,
                  price: lowerInfo?.price || 0,
                  productUrl: lowerInfo?.productUrl || '',
                  tags: lowerInfo?.tags || [],
                  imageUrl: coordinationItem.lowerImageUrl || '',
                }
              : undefined,
          }

          setSelectedCodiData(codiData)
          setUpperLiked(likedStatus.upperLiked)
          setLowerLiked(likedStatus.lowerLiked)
          uiDispatch({ type: 'TOGGLE_MODAL', modal: 'codiDetail', value: true })
        } catch (error) {
          console.error('전체 코디 정보 조회 실패:', error)
          showError('코디 로드 실패', '코디 정보를 불러오는데 실패했습니다.')
        }
      }
    }
  }

  // 상세페이지 모달 닫기
  const handleDetailModalClose = () => {
    uiDispatch({ type: 'TOGGLE_MODAL', modal: 'clothesDetail', value: false })
    setSelectedClothesData(null)
  }

  // 코디 상세페이지 모달 닫기
  const handleCodiDetailModalClose = () => {
    uiDispatch({ type: 'TOGGLE_MODAL', modal: 'codiDetail', value: false })
    setSelectedCodiData(null)
  }

  // 코디 상의 찜하기/해제
  const handleToggleUpperLike = async () => {
    if (!selectedCodiData?.upper) return

    try {
      // 실제 API 호출로 찜하기 토글
      const response = await toggleProductLike(selectedCodiData.upper.id)

      if (response.success) {
        // 성공적으로 토글된 경우 상태 업데이트
        setUpperLiked(!upperLiked)

        // 찜목록도 새로고침하여 데이터 동기화
        if (activeTab === 'wishlist') {
          fetchWishlist()
        }
      } else {
        console.error('상의 찜하기 토글 실패:', response.message)
      }
    } catch (error) {
      console.error('상의 찜하기 토글 실패:', error)
    }
  }

  // 코디 하의 찜하기/해제
  const handleToggleLowerLike = async () => {
    if (!selectedCodiData?.lower) return

    try {
      // 실제 API 호출로 찜하기 토글
      const response = await toggleProductLike(selectedCodiData.lower.id)

      if (response.success) {
        // 성공적으로 토글된 경우 상태 업데이트
        setLowerLiked(!lowerLiked)

        // 찜목록도 새로고침하여 데이터 동기화
        if (activeTab === 'wishlist') {
          fetchWishlist()
        }
      } else {
        console.error('하의 찜하기 토글 실패:', response.message)
      }
    } catch (error) {
      console.error('하의 찜하기 토글 실패:', error)
    }
  }

  // 코디 시착하기
  const handleCodiTryOn = () => {
    if (!selectedCodiData) return

    // 모달 닫기
    uiDispatch({ type: 'TOGGLE_MODAL', modal: 'codiDetail', value: false })
    setSelectedCodiData(null)

    // 전체 코디 시착하기
    if (selectedCodiData.upper && selectedCodiData.lower) {
      // 전체 코디인 경우
      handleTryOn(`${selectedCodiData.id}-full`, 'full')
    } else if (selectedCodiData.upper) {
      // 상의만 있는 경우
      handleTryOn(selectedCodiData.upper.id, 'top')
    } else if (selectedCodiData.lower) {
      // 하의만 있는 경우
      handleTryOn(selectedCodiData.lower.id, 'bottom')
    }
  }

  // 마네킹 이미지 다운로드
  const handleDownloadClick = async () => {
    if (uiState.loading.download) return

    try {
      // 현재 표시되고 있는 마네킹 이미지 URL 가져오기
      const imageUrl = mannequinImage

      if (!imageUrl || isDefaultMannequinImage(imageUrl)) {
        warning('다운로드 불가', '다운로드할 마네킹 이미지가 없습니다.')
        return
      }

      uiDispatch({ type: 'SET_LOADING', key: 'download', value: true })

      // 캐시 버스팅을 위한 DateTime 추가
      const changedUrl = `${imageUrl}?${Date.now()}`
      const res = await fetch(changedUrl)
      if (!res.ok) throw new Error('fetch failed')
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `mannequin-image-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)

      success(
        '다운로드 완료!',
        '마네킹 이미지가 성공적으로 다운로드되었습니다.',
      )
    } catch {
      showError('다운로드 실패!', '이미지 다운로드에 실패했습니다.')
    } finally {
      uiDispatch({ type: 'SET_LOADING', key: 'download', value: false })
    }
  }

  return (
    <MyPageContainer>
      <MainContent>
        <LeftSection>
          <LeftContentBox>
            <TitleContainer>
              <HighlightText>ON</HighlightText>
              <TitleText> - WEAR</TitleText>
            </TitleContainer>
            <DescriptionText>
              나에게
              <br />
              <GradientText>딱 맞는</GradientText> 코디를
              <br />
              입어보세요
            </DescriptionText>
            <div css={dividerContainerStyle}>
              <div css={dividerStyle} />
              <p css={textTitleStyle}>나만의 피팅 경험</p>
            </div>
            <div css={dividerStyle} />
            <div css={bgTextContainerStyle}>
              <div css={[animateTextStyle, leftStyle]}>
                <span css={scrollingTextStyle}>ON-WEAR&nbsp;</span>
                <span css={scrollingTextStyle}>ON-WEAR&nbsp;</span>
                <span css={scrollingTextStyle}>ON-WEAR&nbsp;</span>
              </div>
              <div css={animateTextStyle}>
                <span css={scrollingTextStyle}>GOOD FASHION&nbsp;</span>
                <span css={scrollingTextStyle}>GOOD FASHION&nbsp;</span>
                <span css={scrollingTextStyle}>GOOD FASHION&nbsp;</span>
              </div>
              <div css={[animateTextStyle, leftStyle]}>
                <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                  STYLE&nbsp;
                </span>
                <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                  STYLE&nbsp;
                </span>
                <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                  STYLE&nbsp;
                </span>
              </div>
              <div css={animateTextStyle}>
                <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                  TREND&nbsp;
                </span>
                <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                  TREND&nbsp;
                </span>
                <span css={[scrollingTextStyle, { opacity: 0.2 }]}>
                  TREND&nbsp;
                </span>
              </div>
            </div>
            <DecorContainer>
              <Circle />
              <Line />
            </DecorContainer>
          </LeftContentBox>
        </LeftSection>

        <ModelSection>
          <ModelViewerContainer>
            <ModelViewer
              mannequinImage={mannequinImage}
              currentAvatarIndex={selectedMannequinIndex}
              avatarImages={mannequinImages}
              onLeftArrow={handleLeftArrow}
              onRightArrow={handleRightArrow}
              onThumbnailClick={handleThumbnailClick}
              isLoading={uiState.loading.tryOn}
            />
            <ActionButtons
              onUploadClick={handleUploadClick}
              onDeleteClick={handleDeleteClick}
              onDownloadClick={handleDownloadClick}
              isUploading={uiState.loading.upload}
              isDeleting={uiState.loading.delete}
              isDownloading={uiState.loading.download}
              isDefaultMannequin={isDefaultMannequinImage(mannequinImage)}
            />
            <ResetButton
              onClick={handleResetMannequin}
              title="마네킹 이미지 초기화"
            >
              <RefreshCw size={20} />
            </ResetButton>
          </ModelViewerContainer>
        </ModelSection>

        <SidePanel>
          <TabsContainer>
            <TabButtons activeTab={activeTab} onTabClick={handleTabClick} />

            {/* OUTFITS(내 코디) 선택 시 Total, Upper, Lower 버튼 숨김 */}
            {activeTab === 'wishlist' && (
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryClick}
              />
            )}
          </TabsContainer>

          <GridContainer>
            <HybridScrollGrid
              items={
                activeTab === 'wishlist'
                  ? apiWishlistItems
                  : apiCoordinationItems
              }
              activeTab={activeTab}
              activeCategory={activeCategory}
              isLoading={
                activeTab === 'wishlist' ? wishlistLoading : coordinationLoading
              }
              error={
                activeTab === 'wishlist' ? wishlistError : coordinationError
              }
              onRetry={
                activeTab === 'wishlist' ? fetchWishlist : fetchCoordination
              }
              isSelectionMode={uiState.selection.isMode}
              selectedItems={uiState.selection.items}
              onItemSelect={handleItemSelect}
              onTryOn={handleTryOn}
              isTryingOn={uiState.loading.tryOn}
              onDetailClick={handleDetailClick}
              rawWishlistData={rawWishlistData}
              rawCoordinationData={rawCoordinationData}
              isDeleteMode={uiState.deleteMode.isMode}
              selectedCodiIds={uiState.deleteMode.selectedCodiIds}
              onCodiSelect={handleCodiSelect}
              currentTryOnItems={uiState.tryOn.currentItems}
            />
          </GridContainer>

          <ButtonsContainer
            activeTab={activeTab}
            isSelectionMode={uiState.selection.isMode}
            isDeleteMode={uiState.deleteMode.isMode}
            onSelectClick={handleSelectClick}
            onSaveClick={handleSaveClick}
            onCancelClick={handleCancelClick}
            canSave={canSave}
            onDeleteClick={handleCodiDeleteClick}
            onDeleteSaveClick={handleDeleteSaveClick}
            onDeleteCancelClick={handleDeleteCancelClick}
            canDelete={canDelete}
            hasTryOnItems={hasTryOnItems}
            onTryOnSaveClick={handleTryOnSaveClick}
            canTryOnSave={canTryOnSave}
          />
        </SidePanel>
      </MainContent>

      <UploadModal
        showUploadModal={uiState.modals.upload}
        isDragOver={uiState.selection.dragOver}
        onClose={handleUploadModalClose}
        onFileUpload={handleFileUpload}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />

      {selectedClothesData && (
        <FittingClothesDetailModal
          open={uiState.modals.clothesDetail}
          onClose={handleDetailModalClose}
          data={selectedClothesData}
        />
      )}

      {selectedCodiData && (
        <CodiDetailModal
          open={uiState.modals.codiDetail}
          onClose={handleCodiDetailModalClose}
          data={selectedCodiData}
          upperLiked={upperLiked}
          lowerLiked={lowerLiked}
          onToggleUpperLike={handleToggleUpperLike}
          onToggleLowerLike={handleToggleLowerLike}
          onTryOn={handleCodiTryOn}
        />
      )}
    </MyPageContainer>
  )
}

const MyPageContainer = styled.div`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  width: auto;
  min-height: 100vh;
  margin: 0;
  background: #0f1115;
  border: none;
  overflow: hidden;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`

const MainContent = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh);
  min-height: 600px;
  gap: 24px;
  overflow: visible;
  background: #0f1115;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.3);
  @media (max-width: 1200px) {
    min-height: 500px;
    gap: 16px;
    padding: 12px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    min-height: 400px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    min-height: 350px;
  }
`

const LeftSection = styled.div`
  flex: 0 0 20%;
  height: 100%;
  background: #072bed;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  min-width: 200px;

  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 0;
  }
`

const LeftContentBox = styled.div`
  padding: 20px 20px 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 32px;
  }

  @media (max-width: 1024px) {
    padding: 28px;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`

const TitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`

const HighlightText = styled.span`
  font-size: 32px;
  font-weight: 800;
  color: #a8e840;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    font-size: 42px;
  }

  @media (max-width: 1024px) {
    font-size: 38px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`

const TitleText = styled.span`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;

  @media (max-width: 1200px) {
    font-size: 42px;
  }

  @media (max-width: 1024px) {
    font-size: 38px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`

const DescriptionText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin: 0;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    font-size: 22px;
  }

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

const GradientText = styled.span`
  color: #a8e840;
  font-weight: 800;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const DecorContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    bottom: 24px;
    left: 24px;
  }
`

const Circle = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a8e840;
  box-shadow: 0 0 10px rgba(168, 232, 64, 0.5);
`

const Line = styled.span`
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
`

// RecommendBody에서 가져온 애니메이션 스타일들
const dividerContainerStyle = css`
  margin-top: 40px;
`

const dividerStyle = css`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 15px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`

const textTitleStyle = css`
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
  margin: 0;
`

const bgTextContainerStyle = css`
  position: relative;
  width: 100%;
  overflow: hidden;
  transform: skewY(-5deg);
  margin: 20px 0;
  margin-top: 150px;
  height: 400px;
`

const animateTextStyle = css`
  animation: textScrolling 20s linear infinite;
  will-change: transform;
  display: block;
  position: relative;
  white-space: nowrap;

  @keyframes textScrolling {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
`

const leftStyle = css`
  animation-direction: reverse;
`

const scrollingTextStyle = css`
  font-family: 'Montserrat', sans-serif;
  font-size: 100px;
  color: transparent;
  -webkit-text-stroke: 2px #a8e840;
  text-transform: uppercase;
  display: inline-block;
  line-height: 0.75;
  font-weight: 800;
  opacity: 0.9;
  user-select: none;
  text-shadow:
    0 0 10px rgba(168, 232, 64, 0.4),
  filter: drop-shadow(0 0 8px rgba(168, 232, 64, 0.6));
`

const ModelSection = styled.div`
  flex: 0 0 40%;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
  min-width: 280px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
    margin-bottom: 0;
  }
`

const ModelViewerContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1; /* 전체 ModelSection 공간을 차지 */
  display: flex;
  flex-direction: column;
`

const ResetButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border: 1px solid #404650;
  background: #2c3038;
  color: #e0e6ed;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 12;

  &:hover {
    background: #404650;
    border-color: #5a6169;
    color: #ffffff;
    transform: rotate(180deg) scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: rotate(180deg) scale(0.95);
  }

  @media (max-width: 1024px) {
    width: 42px;
    height: 42px;
    top: 18px;
    right: 18px;

    svg {
      width: 19px;
      height: 19px;
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    top: 16px;
    right: 16px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    top: 12px;
    right: 12px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`

const SidePanel = styled.div`
  flex: 0 0 35%; /* 40% → 35%로 축소하여 과도한 너비 문제 해결 */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  padding-bottom: 25px;
  position: relative;
  min-width: 350px; /* 400px → 350px로 축소하여 최적화 */
  overflow: visible;
  transition: all 0.3s ease;
  align-items: center; /* SidePanel 내부 요소들을 중앙 정렬 */
  justify-content: flex-start; /* 위쪽부터 배치 */

  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 0;
    padding: 16px;
    align-items: center; /* 모바일에서도 중앙 정렬 유지 */
  }

  @media (max-width: 768px) {
    padding: 12px;
    align-items: center; /* 작은 화면에서도 중앙 정렬 유지 */
  }
`

const TabsContainer = styled.div`
  flex-shrink: 0;
  z-index: 10;
  background: #0f1115;
  border-bottom: 1px solid #404650;
  padding: 16px 50px 12px 0px; /* GridContainer와 동일한 우측 여백 적용 */
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  justify-content: center;
  width: 100%; /* 전체 너비 확보 */
  max-width: 100%; /* 부모 컨테이너 너비를 초과하지 않도록 제한 */
  text-align: center; /* 하위 요소들까지 중앙 정렬 */

  @media (max-width: 768px) {
    padding: 8px 40px 8px 0px; /* 모바일에서도 우측 여백 유지 */
    margin: 0;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.8% 35px 0.8% 0px; /* 작은 화면에서도 우측 여백 유지 */
    width: 100%;
  }
`

const GridContainer = styled.div`
  flex: 1;
  position: relative;
  overflow-y: hidden; /* auto → hidden으로 변경하여 스크롤 제거 */
  overflow-x: visible; /* 페이지네이션 바가 잘리지 않도록 수평 오버플로 허용 */
  max-height: 100%; /* 70%에서 55%로 높이 감소 */
  min-height: 100px;
  padding-right: 50px; /* 페이지네이션 바를 위한 추가 여백 */
  padding-bottom: 0; /* 하단 패딩 제거 - ButtonsContainer와 분리됨 */
  background: #0f1115;
  width: 100%; /* GridContainer가 SidePanel의 전체 너비를 사용하도록 설정 */
  align-self: stretch; /* SidePanel의 중앙 정렬에 영향받지 않고 전체 너비 사용 */

  @media (min-width: 1440px) {
    min-height: 200px;
    padding: 2% 50px 0 1.5%; /* 하단 패딩 제거 */
  }

  @media (min-width: 1200px) and (max-width: 1439px) {
    min-height: 175px;
    padding: 1.8% 1.5%; /* 하단 패딩 제거 */
  }

  @media (max-width: 768px) {
    min-height: 120px;
    padding: 1% 1%; /* 하단 패딩 제거 */
  }

  @media (max-width: 480px) {
    min-height: 100px;
    padding: 0.8% 0.8%; /* 하단 패딩 제거 */
  }
`

const MyPage = () => {
  return (
    <ToastProvider>
      <MyPageContent />
    </ToastProvider>
  )
}

export default MyPage
