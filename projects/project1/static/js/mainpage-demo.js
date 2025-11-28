// 데모 버전용 JavaScript - 목데이터 사용

// 목데이터 레시피
const mockRecipes = {
    '양파': [
        {
            title: '양파 볶음밥',
            ingredients: ['양파', '밥', '계란', '식용유'],
            description: '간단하고 맛있는 양파 볶음밥입니다.',
            steps: ['양파를 잘게 썬다', '팬에 기름을 두르고 양파를 볶는다', '밥을 넣고 볶는다', '계란을 넣고 마무리한다']
        },
        {
            title: '양파 스프',
            ingredients: ['양파', '버터', '생크림', '육수'],
            description: '부드럽고 고소한 양파 스프입니다.',
            steps: ['양파를 볶는다', '육수를 넣고 끓인다', '믹서로 갈아낸다', '생크림을 넣고 마무리한다']
        },
        {
            title: '양파 튀김',
            ingredients: ['양파', '튀김가루', '계란', '식용유'],
            description: '바삭한 양파 튀김입니다.',
            steps: ['양파를 링 모양으로 썬다', '계란을 묻힌다', '튀김가루를 묻힌다', '기름에 튀긴다']
        }
    ],
    '당근': [
        {
            title: '당근 케이크',
            ingredients: ['당근', '밀가루', '설탕', '계란', '식용유'],
            description: '달콤하고 건강한 당근 케이크입니다.',
            steps: ['당근을 갈아낸다', '재료를 섞는다', '오븐에 굽는다', '식힌 후 서빙한다']
        },
        {
            title: '당근 샐러드',
            ingredients: ['당근', '올리브오일', '레몬즙', '소금'],
            description: '신선하고 건강한 당근 샐러드입니다.',
            steps: ['당근을 채썬다', '드레싱을 만든다', '버무린다', '서빙한다']
        },
        {
            title: '당근 주스',
            ingredients: ['당근', '사과', '물'],
            description: '비타민이 풍부한 당근 주스입니다.',
            steps: ['당근과 사과를 준비한다', '믹서기에 넣는다', '갈아낸다', '서빙한다']
        }
    ],
    '감자': [
        {
            title: '감자 튀김',
            ingredients: ['감자', '식용유', '소금'],
            description: '바삭한 감자 튀김입니다.',
            steps: ['감자를 썬다', '기름에 튀긴다', '소금을 뿌린다', '서빙한다']
        },
        {
            title: '감자 스튜',
            ingredients: ['감자', '양파', '당근', '육수'],
            description: '부드럽고 따뜻한 감자 스튜입니다.',
            steps: ['야채를 준비한다', '볶는다', '육수를 넣고 끓인다', '마무리한다']
        },
        {
            title: '감자 샐러드',
            ingredients: ['감자', '마요네즈', '계란', '양파'],
            description: '고소한 감자 샐러드입니다.',
            steps: ['감자를 삶는다', '으깬다', '재료를 섞는다', '서빙한다']
        }
    ],
    '양파 당근': [
        {
            title: '야채 볶음',
            ingredients: ['양파', '당근', '식용유', '소금'],
            description: '간단한 야채 볶음입니다.',
            steps: ['야채를 준비한다', '볶는다', '소금으로 간한다', '서빙한다']
        },
        {
            title: '야채 스프',
            ingredients: ['양파', '당근', '육수', '버터'],
            description: '부드러운 야채 스프입니다.',
            steps: ['야채를 볶는다', '육수를 넣는다', '끓인다', '서빙한다']
        }
    ],
    '양파 당근 감자': [
        {
            title: '야채 볶음밥',
            ingredients: ['양파', '당근', '감자', '밥', '계란'],
            description: '영양만점 야채 볶음밥입니다.',
            steps: ['야채를 준비한다', '볶는다', '밥을 넣는다', '계란을 넣고 마무리한다']
        },
        {
            title: '야채 스튜',
            ingredients: ['양파', '당근', '감자', '육수', '버터'],
            description: '따뜻한 야채 스튜입니다.',
            steps: ['야채를 준비한다', '볶는다', '육수를 넣고 끓인다', '서빙한다']
        }
    ]
};

//최근 검색어 추가 및 삭제 기능
function removeRecentIngredient(ingredient) {
    let recentIngredients = JSON.parse(localStorage.getItem('recentIngredients')) || [];
    recentIngredients = recentIngredients.filter(item => item !== ingredient);
    localStorage.setItem('recentIngredients', JSON.stringify(recentIngredients));

    const recentIngredientsContainer = document.getElementById("recent-ingredients");
    Array.from(recentIngredientsContainer.children).forEach(item => {
        if (item.textContent.trim().startsWith(ingredient)) {
            recentIngredientsContainer.removeChild(item);
        }
    });
}

// 최근 검색어 클릭 시 해당 검색어로 검색
function searchWithIngredient(ingredient) {
    const ingredientInput = document.getElementById('ingredient-search');
    ingredientInput.value = ingredient;
    submitSearch(ingredient);
}

// X 버튼 추가
function addRecentIngredient(ingredient) {
    const recentIngredientsContainer = document.getElementById("recent-ingredients");

    if (Array.from(recentIngredientsContainer.children).some(item => item.textContent.trim() === ingredient)) {
        return;
    }

    const ingredientItem = document.createElement("span");
    ingredientItem.className = "recent-item";
    ingredientItem.textContent = ingredient;

    ingredientItem.onclick = function () {
        searchWithIngredient(ingredient);
    };

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "×";
    removeBtn.onclick = function (event) {
        event.stopPropagation();
        removeRecentIngredient(ingredient);
    };

    ingredientItem.appendChild(removeBtn);
    recentIngredientsContainer.appendChild(ingredientItem);
}

// 로컬 스토리지에 최근 검색어 저장
function saveRecentIngredients(ingredients) {
    let recentIngredients = JSON.parse(localStorage.getItem('recentIngredients')) || [];
    const ingredientStr = ingredients.join(' ');
    if (!recentIngredients.includes(ingredientStr)) {
        recentIngredients.push(ingredientStr);
        if (recentIngredients.length > 5) {
            recentIngredients.shift();
        }
        localStorage.setItem('recentIngredients', JSON.stringify(recentIngredients));
    }
}

// 로컬 스토리지에서 최근 검색어 로드
function loadRecentIngredients() {
    const recentIngredients = JSON.parse(localStorage.getItem('recentIngredients')) || [];
    recentIngredients.forEach(ingredient => addRecentIngredient(ingredient));
}

// Enter 키 입력 처리
function handleIngredientInput(event) {
    if (event.key === "Enter") {
        const ingredientInput = document.getElementById('ingredient-search').value.trim();
        submitSearch(ingredientInput);
        event.preventDefault();
    }
}

// 입력 필드 지우기 함수
function clearInput(inputId) {
    document.getElementById(inputId).value = '';
}

// 레시피 카드 생성
function createRecipeCard(recipe, index) {
    const card = document.createElement('div');
    card.style.cssText = 'background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s;';
    card.onmouseenter = () => card.style.transform = 'translateY(-5px)';
    card.onmouseleave = () => card.style.transform = 'translateY(0)';
    
    card.innerHTML = `
        <h3 style="color: #333; margin-bottom: 15px; font-size: 1.5rem;">${recipe.title}</h3>
        <p style="color: #666; margin-bottom: 15px; line-height: 1.6;">${recipe.description}</p>
        <div style="margin-bottom: 15px;">
            <strong style="color: #333;">재료:</strong>
            <span style="color: #666;">${recipe.ingredients.join(', ')}</span>
        </div>
        <div>
            <strong style="color: #333;">만드는 법:</strong>
            <ol style="color: #666; margin-top: 10px; padding-left: 20px;">
                ${recipe.steps.map(step => `<li style="margin-bottom: 5px;">${step}</li>`).join('')}
            </ol>
        </div>
    `;
    
    return card;
}

// 검색 버튼 클릭 시 검색 동작 (데모 버전)
function submitSearch(ingredientInput = '') {
    ingredientInput = ingredientInput || document.getElementById('ingredient-search').value.trim();
    
    if (!ingredientInput) {
        alert("사용할 재료를 입력해 주세요.");
        return;
    }

    const ingredientsArray = ingredientInput.split(' ').filter(item => item);

    if (ingredientsArray.length > 3) {
        alert("재료는 최대 3개까지만 입력가능합니다.");
        return;
    }

    showLoading();

    // 최근 검색어 저장
    saveRecentIngredients(ingredientsArray);

    // 목데이터에서 레시피 찾기
    setTimeout(() => {
        hideLoading();
        
        const searchKey = ingredientsArray.join(' ');
        let recipes = mockRecipes[searchKey];
        
        // 정확히 일치하는 레시피가 없으면 첫 번째 재료로 검색
        if (!recipes && ingredientsArray.length > 0) {
            recipes = mockRecipes[ingredientsArray[0]];
        }
        
        // 그래도 없으면 기본 레시피 표시
        if (!recipes) {
            recipes = [
                {
                    title: '야채 볶음',
                    ingredients: ingredientsArray,
                    description: '입력하신 재료로 만드는 간단한 볶음 요리입니다.',
                    steps: ['재료를 준비한다', '기름을 두르고 볶는다', '간을 맞춘다', '서빙한다']
                }
            ];
        }

        // 레시피 결과 표시
        displayRecipes(recipes);
        
        // 검색어 추가
        if (!document.getElementById("recent-ingredients").textContent.includes(searchKey)) {
            addRecentIngredient(searchKey);
        }
    }, 1500);
}

// 레시피 결과 표시
function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipe-results');
    const cardsContainer = document.getElementById('recipe-cards-container');
    
    cardsContainer.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const card = createRecipeCard(recipe, index);
        cardsContainer.appendChild(card);
    });
    
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 카메라 버튼 클릭 처리 (데모 버전)
function openCameraOrFile() {
    alert('데모 버전에서는 이미지 인식 기능을 사용할 수 없습니다.\n실제 서비스에서는 YOLOv11 모델을 사용하여 재료를 인식합니다.');
}

// 로딩창 표시
function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'flex';
}

// 로딩창 숨김
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'none';
}

// 페이지 로드 시 최근 검색어 로드
window.addEventListener('DOMContentLoaded', () => {
    loadRecentIngredients();
    const searchInput = document.getElementById('ingredient-search');
    if (searchInput) {
        searchInput.addEventListener('keydown', handleIngredientInput);
    }
});

