const deleteAccount = async () => {
  try {
    await axios.delete('http://localhost:8000/api/accounts/delete/')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/login')
  } catch (error) {
    console.error('회원 탈퇴 실패:', error)
    alert('회원 탈퇴에 실패했습니다.')
  }
} 