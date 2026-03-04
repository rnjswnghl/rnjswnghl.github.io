// 숫자랑 한글은 '나눔글씨 외할머니글씨' / 영어는 'Marcellus' 되도록 작성
// 성능: requestAnimationFrame으로 렌더링 후 처리, 빈 요소 스킵

document.addEventListener("DOMContentLoaded", function () {
    requestAnimationFrame(function () {
        const elements = document.querySelectorAll("h1, h2, h3, p, a, button");
        elements.forEach(element => {
            const text = element.textContent;
            if (!text || !text.trim()) return;
            const words = text.split(/(\s+)/);
            const formattedWords = words.map(word => {
                if (/^[\u3131-\uD79D]+$/.test(word) || /^\d+$/.test(word)) {
                    return `<span class="korean-font">${word}</span>`;
                } else if (/^[a-zA-Z]+$/.test(word)) {
                    return `<span class="english-font">${word}</span>`;
                }
                return word;
            });
            element.innerHTML = formattedWords.join("");
        });
    });
});
