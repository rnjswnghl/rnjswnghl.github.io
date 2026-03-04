// 레시피 상세 데이터
const recipeDetails = {
    "김치찌개": { category: "한식", time: "30분", difficulty: "쉬움", ingredients: ["김치 200g", "돼지고기 100g", "두부 1/2모", "대파 1대", "물 500ml"], steps: ["돼지고기를 볶아 기름을 내줍니다.", "김치를 넣고 볶아줍니다.", "물을 넣고 끓여줍니다.", "두부와 대파를 넣고 마무리합니다."] },
    "떡볶이": { category: "한식", time: "20분", difficulty: "쉬움", ingredients: ["떡볶이떡 200g", "어묵 2장", "대파 1대", "고추장 2큰술", "설탕 1큰술", "물 1컵"], steps: ["물을 끓이고 고추장, 설탕을 넣어 양념을 만듭니다.", "떡과 어묵을 넣고 끓입니다.", "대파를 넣고 마무리합니다."] },
    "파스타": { category: "양식", time: "25분", difficulty: "보통", ingredients: ["스파게티 100g", "토마토소스 1컵", "올리브오일 2큰술", "마늘 2쪽", "파슬리", "소금"], steps: ["끓는 물에 소금을 넣고 파스타를 삶습니다.", "마늘을 올리브오일에 볶습니다.", "토마토소스를 넣고 끓입니다.", "삶은 파스타를 넣고 버무립니다."] },
    "나물비빔밥": { category: "한식", time: "40분", difficulty: "보통", ingredients: ["밥 1공기", "시금치", "당근", "콩나물", "고사리", "고추장 1큰술", "참기름"], steps: ["나물들을 각각 데쳐서 양념합니다.", "밥 위에 나물을 돌려 담습니다.", "고추장을 올리고 참기름을 뿌립니다.", "비빔밥으로 섞어 먹습니다."] },
    "미역국": { category: "한식", time: "30분", difficulty: "쉬움", ingredients: ["미역 20g", "소고기 100g", "다진 마늘 1작은술", "간장 1큰술", "참기름", "물 5컵"], steps: ["미역을 불려서 먹기 좋게 썹니다.", "소고기를 볶고 미역을 넣어 함께 볶습니다.", "물을 넣고 끓입니다.", "간장으로 간을 맞춥니다."] },
    "쑥국": { category: "한식", time: "35분", difficulty: "보통", ingredients: ["쑥 100g", "된장 2큰술", "두부 1/2모", "대파 1대", "다진 마늘", "물 4컵"], steps: ["쑥을 끓는 물에 데쳐서 씻습니다.", "된장을 물에 풀어 끓입니다.", "쑥과 두부를 넣고 끓입니다.", "대파를 넣고 마무리합니다."] },
    "냉면": { category: "한식", time: "30분", difficulty: "쉬움", ingredients: ["냉면 1인분", "육수 2컵", "식초 2큰술", "설탕 1큰술", "오이", "계란", "배추김치"], steps: ["육수를 끓여 식혀 냉장보관합니다.", "식초, 설탕으로 양념합니다.", "냉면을 삶아 찬물에 헹굽니다.", "그릇에 담고 고명을 올립니다."] },
    "오이냉국": { category: "한식", time: "15분", difficulty: "쉬움", ingredients: ["오이 1개", "물 3컵", "식초 2큰술", "설탕 1큰술", "소금", "다진 마늘"], steps: ["오이를 채썰어서 준비합니다.", "물에 식초, 설탕, 소금을 넣어 양념합니다.", "오이를 넣고 냉장보관합니다.", "시원하게 먹습니다."] },
    "수박화채": { category: "한식", time: "30분", difficulty: "쉬움", ingredients: ["수박 1/4통", "참외 1개", "오이 1/2개", "설탕", "식초 1작은술", "얼음"], steps: ["수박을 도톰하게 썹니다.", "참외, 오이를 먹기 좋게 썹니다.", "설탕과 식초로 간합니다.", "얼음을 넣어 시원하게 먹습니다."] },
    "감자전": { category: "한식", time: "25분", difficulty: "쉬움", ingredients: ["감자 2개", "밀가루 2큰술", "소금", "식용유"], steps: ["감자를 갈아서 물기를 짭니다.", "밀가루, 소금을 넣어 반죽합니다.", "팬에 기름을 두르고 부칩니다.", "양면이 노릇해질 때까지 굽습니다."] },
    "굴국밥": { category: "한식", time: "20분", difficulty: "쉬움", ingredients: ["굴 100g", "밥 1공기", "대파", "다진 마늘", "간장", "참기름"], steps: ["굴을 깨끗이 씻습니다.", "끓는 물에 밥을 넣고 풀어줍니다.", "굴을 넣고 끓입니다.", "대파, 간장으로 마무리합니다."] },
    "배추김치": { category: "한식", time: "60분", difficulty: "어려움", ingredients: ["배추 1통", "배추김치 양념", "소금", "설탕"], steps: ["배추를 소금물에 절입니다.", "배추를 씻어 물기를 뺍니다.", "양념을 넣고 버무립니다.", "통에 담아 숙성시킵니다."] },
    "부대찌개": { category: "한식", time: "30분", difficulty: "쉬움", ingredients: ["햄", "소시지", "김치", "두부", "대파", "라면사리", "물"], steps: ["김치를 끓는 물에 넣어 끓입니다.", "햄, 소시지, 두부를 넣습니다.", "라면사리를 넣고 끓입니다.", "대파를 넣고 마무리합니다."] },
    "닭한마리": { category: "한식", time: "90분", difficulty: "보통", ingredients: ["닭 1마리", "감자", "당근", "대파", "인삼", "대추", "마늘"], steps: ["닭을 끓는 물에 넣어 끓입니다.", "인삼, 대추, 마늘을 넣습니다.", "감자, 당근을 넣습니다.", "대파를 넣고 마무리합니다."] },
    "밀면": { category: "한식", time: "25분", difficulty: "쉬움", ingredients: ["밀면 1인분", "밀면육수", "고추장", "오이", "계란", "배추김치"], steps: ["밀면을 삶아 찬물에 헹굽니다.", "육수에 고추장을 풀어 양념합니다.", "그릇에 담고 고명을 올립니다.", "비벼서 먹습니다."] },
    "전주비빔밥": { category: "한식", time: "40분", difficulty: "보통", ingredients: ["밥", "나물", "고추장", "계란", "고기", "참기름"], steps: ["나물들을 각각 데쳐 양념합니다.", "밥 위에 나물을 돌려 담습니다.", "계란을 올리고 고추장을 뿌립니다.", "비벼서 먹습니다."] },
    "순대국밥": { category: "한식", time: "30분", difficulty: "쉬움", ingredients: ["순대", "밥", "대파", "다진 마늘", "간장", "고춧가루"], steps: ["순대를 끓는 물에 넣어 끓입니다.", "간장, 고춧가루로 간을 맞춥니다.", "밥을 넣고 끓입니다.", "대파를 넣고 마무리합니다."] }
};

// 레시피명 가져오기: sessionStorage 우선 (클릭 시 저장), URL 쿼리 fallback
function getRecipeName() {
    const fromStorage = sessionStorage.getItem('project1_recipe_name');
    if (fromStorage) {
        sessionStorage.removeItem('project1_recipe_name');
        return String(fromStorage).trim();
    }
    try {
        const params = new URLSearchParams(window.location.search);
        const name = params.get("name");
        return name ? String(name).trim() : "";
    } catch (e) {}
    return "";
}

// 레시피 상세 로드
function loadRecipe() {
    const name = getRecipeName();
    const recipe = name && recipeDetails[name] ? recipeDetails[name] : recipeDetails["김치찌개"];
    const displayName = name && recipeDetails[name] ? name : "김치찌개";

    const img = document.getElementById("recipe-main-image");
    const dishName = document.getElementById("dish-name");
    const category = document.getElementById("recipe-category");
    const time = document.getElementById("recipe-time");
    const difficulty = document.getElementById("recipe-difficulty");
    const ingredientsList = document.getElementById("ingredients-list");
    const stepsContent = document.getElementById("cooking-steps-content");

    if (img) {
        img.src = "static/images/recipes/" + displayName + ".jpg";
        img.alt = displayName;
    }
    if (dishName) dishName.textContent = "요리 이름: " + displayName;
    if (category) category.textContent = recipe.category;
    if (time) time.textContent = recipe.time;
    if (difficulty) difficulty.textContent = recipe.difficulty;

    if (ingredientsList) {
        ingredientsList.innerHTML = recipe.ingredients.map((ing, i) =>
            `<li><input type="checkbox" class="ingredient-checkbox" data-substitute="대체재료: 없음"><span class="ingredient-name">${ing}</span></li>`
        ).join("");
    }

    if (stepsContent) {
        stepsContent.innerHTML = recipe.steps.map((s, i) => `<p>${i + 1}. ${s}</p>`).join("");
    }

    document.title = displayName + " - 요리의 정원";
}

// 토스트 팝업 (alert 대체)
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// 로그인 여부 확인
function isLoggedIn() {
    return localStorage.getItem('project1_logged_in') === 'true';
}

// 스크랩/좋아요/공유 이벤트
document.addEventListener("DOMContentLoaded", function () {
    loadRecipe();

    const scrapIcon = document.getElementById("scrapIcon");
    const likeIcon = document.getElementById("likeIcon");
    const shareIcon = document.getElementById("shareIcon");

    // 스크랩 (📋 비활성 / 💾 활성)
    if (scrapIcon) {
        scrapIcon.addEventListener("click", function () {
            if (isLoggedIn()) {
                scrapIcon.classList.toggle("active");
                const isActive = scrapIcon.classList.contains("active");
                scrapIcon.textContent = isActive ? scrapIcon.dataset.on : scrapIcon.dataset.off;
                showToast(isActive ? "스크랩했습니다!" : "스크랩을 취소했습니다.");
            } else {
                showToast("로그인이 필요합니다.");
            }
        });
    }

    // 좋아요 (🤍 비활성 / ❤️ 활성)
    if (likeIcon) {
        likeIcon.addEventListener("click", function () {
            if (isLoggedIn()) {
                likeIcon.classList.toggle("active");
                const isActive = likeIcon.classList.contains("active");
                likeIcon.textContent = isActive ? likeIcon.dataset.on : likeIcon.dataset.off;
                showToast(isActive ? "좋아요했습니다!" : "좋아요를 취소했습니다.");
            } else {
                showToast("로그인이 필요합니다.");
            }
        });
    }

    // 공유 (오픈 준비 중)
    if (shareIcon) {
        shareIcon.addEventListener("click", function () {
            showToast("공유 기능 오픈 준비 중입니다.");
        });
    }

    // 재료 체크박스 - 대체재료 토스트 (동적 생성된 요소에 이벤트 위임)
    document.getElementById("ingredients-list")?.addEventListener("click", function (e) {
        const cb = e.target.closest(".ingredient-checkbox");
        if (cb) {
            const msg = cb.getAttribute("data-substitute") || "대체재료: 없음";
            showToast(msg);
        }
    });
});

// 댓글 추가 (기존 - alert를 showToast로 변경)
const commentSubmitBtn = document.querySelector('.comment-submit-button');
if (commentSubmitBtn) {
    commentSubmitBtn.addEventListener('click', function () {
        const commentInput = document.querySelector('.comment-input');
        const commentList = document.querySelector('.comment-list');
        if (!commentInput || !commentList) return;

        const commentText = commentInput.value.trim();

        if (commentText) {
            const newComment = document.createElement('li');
            newComment.innerHTML = `<span class="comment-author">익명:</span> <span class="comment-text">${commentText}</span>`;
            commentList.appendChild(newComment);
            commentInput.value = '';
            showToast('댓글이 등록되었습니다.');
        } else {
            showToast('댓글을 입력하세요.');
        }
    });
}
