// 로그인 상태에 따른 메뉴 표시
function updateMenuByAuth() {
    const isLoggedIn = localStorage.getItem('project1_logged_in') === 'true';
    const menuLoggedOut = document.getElementById('menu-logged-out');
    const menuLoggedIn = document.getElementById('menu-logged-in');
    const profileSpan = document.querySelector('.profile span');

    if (menuLoggedOut) menuLoggedOut.style.display = isLoggedIn ? 'none' : 'block';
    if (menuLoggedIn) menuLoggedIn.style.display = isLoggedIn ? 'block' : 'none';
    if (profileSpan) profileSpan.textContent = isLoggedIn ? '사용자' : 'Guest';
}

function logout() {
    localStorage.removeItem('project1_logged_in');
    window.location.href = 'index.html';
}

function handleLoginSubmit(e) {
    e.preventDefault();
    localStorage.setItem('project1_logged_in', 'true');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', updateMenuByAuth);
