import os
import requests
from openai import OpenAI
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def generate_ai_image(prompt: str) -> str:
    try:
        response = client.images.generate(prompt=prompt, n=1, size="512x512")
        image_url = response.data[0].url

        image_response = requests.get(image_url)
        if image_response.status_code != 200:
            print("이미지 다운로드 실패")
            return None

        filename = f"ai_post_images/{prompt[:30].replace(' ', '_')}.png"
        saved_path = default_storage.save(filename, ContentFile(image_response.content))

        return default_storage.url(saved_path)

    except Exception as e:
        print(f"OpenAI 이미지 생성 실패: {e}")
        return None
