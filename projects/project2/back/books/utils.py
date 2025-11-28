import os
import requests
import json
from pathlib import Path
from dotenv import load_dotenv
import logging
import urllib.parse


# 대분류 카테고리 매핑 정의
CATEGORY_MAPPING = {
    "소설": "소설/시/희곡",
    "시": "소설/시/희곡",
    "희곡": "소설/시/희곡",
    "문학": "소설/시/희곡",

    "인문학": "인문학",
    "철학": "인문학",
    "종교": "인문학",

    "컴퓨터": "컴퓨터/모바일",
    "인터넷": "컴퓨터/모바일",
    "IT": "컴퓨터/모바일",

    "건강": "건강/취미",
    "취미": "건강/취미",
    "여행": "건강/취미",

    "자기계발": "자기계발",
    "자기계발서": "자기계발",

    "역사": "역사",

    "경제": "경제경영",
    "경영": "경제경영",
    "투자": "경제경영",

    "사회": "사회과학",
    "정치": "사회과학",
    "교육": "사회과학",
}

# 환경 변수에서 Aladin API Key 로드
load_dotenv()
MY_TTBKEY = os.getenv('ALADIN_API_KEY')

def fetch_books_by_topic(topic, max_results=100):
    """
    알라딘 API를 이용해 특정 주제(topic)로 책 정보를 요청한다.
    요청 실패 시 빈 리스트를 반환.
    """
    url = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx'
    params = {
        'TTBKey': MY_TTBKEY,
        'Query': topic,
        'Output': 'js',
        'Version': '20131101',
        'MaxResults': max_results,
        'SearchTarget': 'Book',
        'Start': 1,
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        return data.get('item', [])
    except requests.RequestException as e:
        print(f"[ERROR] API 요청 실패: {e}")
        return []

def map_to_main_category(subcategory_name):
    """
    서브 카테고리 이름을 받아서 미리 정의된 대분류 카테고리로 매핑한다.
    매핑이 없으면 '기타' 반환.
    """
    for keyword, main_category in CATEGORY_MAPPING.items():
        if keyword in subcategory_name:
            return main_category
    return "기타"

def extract_title_and_subtitle(raw_title):
    """
    제목에 '-'가 있으면 앞부분은 메인 제목, 뒷부분은 부제목으로 분리한다.
    없으면 부제목은 빈 문자열로 반환.
    """
    if '-' in raw_title:
        main, sub = raw_title.split('-', 1)
        return main.strip(), sub.strip()
    return raw_title.strip(), ""

def process_books(raw_books, category_name_to_id, category_id_counter, pk_counter, seen_isbns):
    """
    원시 책 데이터 리스트(raw_books)를 받아 중복 ISBN 체크 후
    필요한 데이터만 가공해서 리턴한다.
    seen_isbns는 외부에서 공유하는 집합(Set)으로,
    이미 처리한 책의 ISBN을 기록해 중복을 막는다.
    """
    processed = []

    for book in raw_books:
        isbn = book.get("isbn", "").strip()
        if not isbn:
            continue  # ISBN 없으면 건너뜀
        
        if isbn in seen_isbns:
            continue  # 이미 처리한 ISBN이면 중복이므로 건너뜀
        seen_isbns.add(isbn)  # 중복 체크용 세트에 추가

        # 카테고리 이름 처리 ('>' 기준으로 두 번째가 서브 카테고리)
        category_full = book.get("categoryName", "")
        second_level = category_full.split('>')[1].strip() if '>' in category_full else ""
        main_category = map_to_main_category(second_level)

        # 카테고리 ID 할당 (새로운 카테고리면 ID 증가시키고 저장)
        if main_category not in category_name_to_id:
            category_name_to_id[main_category] = category_id_counter[0]
            category_id_counter[0] += 1
        category_id = category_name_to_id[main_category]

        # 제목과 부제 추출
        sub_info = book.get("subInfo", {}) or {}
        raw_title = book.get("title", "")
        main_title, extracted_sub = extract_title_and_subtitle(raw_title)

        sub_title = (
            sub_info.get("subTitle") or
            book.get("subTitle") or
            extracted_sub
        )

        # 처리된 책 데이터 포맷에 맞게 정리
        processed.append({
            "model": "books.book",
            "pk": pk_counter[0],
            "fields": {
                "title": main_title,
                "sub_title": sub_title,
                "author": book.get("author", ""),
                "publisher": book.get("publisher", ""),
                "pubdate": book.get("pubDate", None),
                "isbn": isbn,
                "description": book.get("description", "") or book.get("fullDescription", ""),
                "cover": book.get("cover", ""),
                "pricestandard": int(book.get("priceStandard", 0)),
                "customer_review_rank": int(book.get("customerReviewRank", 0)),
                "category_id": category_id
            }
        })
        pk_counter[0] += 1

    return processed

def save_json(data, filename):
    """
    주어진 데이터를 UTF-8 인코딩으로 JSON 파일로 저장한다.
    저장 경로는 book/fixtures/ 하위이며, 폴더가 없으면 생성한다.
    """
    output_path = Path("book/fixtures/") / filename
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[INFO] {output_path} 저장 완료.")

if __name__ == '__main__':
    # API Key 설정 여부 확인
    if not MY_TTBKEY:
        print("[ERROR] ALADIN_API_KEY 환경변수 설정 필요")
        exit(1)

    # 수집할 주제 리스트
    topics = ['소설', '인문학', '컴퓨터', '건강', '자기계발', '역사', '경제', '사회']

    all_books = []
    category_name_to_id = {}
    category_id_counter = [1]  # 리스트로 감싸서 가변 객체처럼 사용
    
    pk_counter = [1]

    # 중복 체크용 ISBN 집합(전역으로 관리해서 주제마다 중복 방지)
    seen_isbns = set()

    # 각 주제별 책 수집 및 가공
    for topic in topics:
        raw_books = fetch_books_by_topic(topic)
        processed = process_books(raw_books, category_name_to_id, category_id_counter, pk_counter, seen_isbns)
        all_books.extend(processed)

    # 카테고리도 Django fixture 포맷으로 변환
    categories = [
        {
            "model": "books.category",
            "pk": cid,
            "fields": {
                "name": name
            }
        }
        for name, cid in category_name_to_id.items()
    ]

    # JSON 파일로 저장
    save_json(all_books, 'books.json')
    save_json(categories, 'categories.json')

    print(f"[INFO] 총 {len(all_books)}권의 책이 추출되었습니다.")


def is_korean(text: str) -> bool:
    # 한글 포함 여부 간단 체크 함수
    for ch in text:
        if ord('가') <= ord(ch) <= ord('힣'):
            return True
    return False


def fetch_author_info_from_wikipedia(author_name: str):
    try:
        lang = "ko" if is_korean(author_name) else "en"
        search_url = f"https://{lang}.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "list": "search",
            "srsearch": author_name,
            "format": "json",
            "srlimit": 5,
        }
        search_res = requests.get(search_url, params=params, timeout=5)
        search_res.raise_for_status()
        search_data = search_res.json()

        candidates = search_data.get("query", {}).get("search", [])
        if not candidates:
            return {"description": None, "image_url": "assets/profile.png"}

        # 후보군에서 작가 관련 카테고리 확인하며 가장 적합한 문서 선택
        for candidate in candidates:
            title = candidate.get("title")
            # 문서 세부 정보 가져오기
            page_detail_url = f"https://{lang}.wikipedia.org/w/api.php"
            detail_params = {
                "action": "query",
                "prop": "extracts|pageimages|categories",
                "explaintext": True,
                "titles": title,
                "format": "json",
                "piprop": "original",
                "cllimit": 50
            }
            detail_res = requests.get(page_detail_url, params=detail_params, timeout=5)
            detail_res.raise_for_status()
            detail_data = detail_res.json()
            pages = detail_data.get("query", {}).get("pages", {})
            page = next(iter(pages.values()))

            categories = page.get("categories", [])
            category_titles = [cat.get("title", "") for cat in categories]

            # 작가 관련 카테고리 포함 여부 판단
            is_writer = any(
                kw in cat for cat in category_titles for kw in
                ["작가", "소설가", "시인", "문학", "수필가"]
            )
            if is_writer:
                description = page.get("extract")
                image_url = page.get("original", {}).get("source", "assets/profile.png")
                return {
                    "description": description,
                    "image_url": image_url or "assets/profile.png"
                }

        # 아무 작가 관련 문서가 없을 경우 첫 번째 문서로 fallback
        fallback_title = candidates[0].get("title")
        fallback_detail_params = {
            "action": "query",
            "prop": "extracts|pageimages",
            "explaintext": True,
            "titles": fallback_title,
            "format": "json",
            "piprop": "original",
        }
        fallback_res = requests.get(search_url, params=fallback_detail_params, timeout=5)
        fallback_res.raise_for_status()
        fallback_data = fallback_res.json()
        pages = fallback_data.get("query", {}).get("pages", {})
        page = next(iter(pages.values()))
        return {
            "description": page.get("extract"),
            "image_url": page.get("original", {}).get("source", "assets/profile.png")
        }

    except Exception as e:
        logging.error(f"Wikipedia long extract fetch error for '{author_name}': {e}")
        return {
            "description": None,
            "image_url": "assets/profile.png"
        }
