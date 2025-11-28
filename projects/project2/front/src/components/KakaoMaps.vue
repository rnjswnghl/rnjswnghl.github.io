<template>
    <div id="map" style="width:70%; height:400px;"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    function initMap(lat, lng) {
        const container = document.getElementById('map')
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
        }
        const map = new kakao.maps.Map(container, options)

        const userPosition = new kakao.maps.LatLng(lat, lng)
        const userMarker = new kakao.maps.Marker({
            map,
            position: userPosition,
            image: new kakao.maps.MarkerImage(
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                new kakao.maps.Size(24, 35)
            ),
        })

        const geocoder = new kakao.maps.services.Geocoder()
        geocoder.coord2Address(lng, lat, (result, status) => {
            let address = '주소를 찾을 수 없습니다.'

            if (status === kakao.maps.services.Status.OK) {
                if (result[0]) {
                    address = result[0].address.address_name
                }
            }

            const userInfoWindow = new kakao.maps.InfoWindow({
                content: `
      <div style="
        padding:8px 12px;
        font-size:14px;
        line-height:1.4;
        max-width:400px;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;
      ">
                    <p>📍 현재 위치</p>
                    <p>🏠 ${address}</p>
                </div>`,
                position: userPosition,
            })
            userInfoWindow.open(map, userMarker)
        })

        const ps = new kakao.maps.services.Places()
        const infowindow = new kakao.maps.InfoWindow({ removable: true })

        ps.keywordSearch('도서관', function (data, status) {
            if (status === kakao.maps.services.Status.OK) {
                for (let i = 0; i < data.length; i++) {
                    const place = data[i]
                    const markerPosition = new kakao.maps.LatLng(place.y, place.x)
                    const marker = new kakao.maps.Marker({
                        map,
                        position: markerPosition,
                    })

                    kakao.maps.event.addListener(marker, 'click', () => {
                        const content = `
              <div style="
                padding:5px;
                font-weight:bold;
                max-width:250px;
                word-break:break-word;
              ">
                <p>📚 ${place.place_name}</p>
                <p>📍 ${place.road_address_name || place.address_name}</p>
                <p><a href="https://map.kakao.com/link/to/${encodeURIComponent(place.place_name)},${place.y},${place.x}" target="_blank" style="color:blue;">길찾기</a></p>
              </div>
            `
                        infowindow.setContent(content)
                        infowindow.open(map, marker)
                    })
                }
            }
        }, {
            location: userPosition,
            radius: 5000,
            sort: kakao.maps.services.SortBy.DISTANCE,
        })
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                if (window.kakao && window.kakao.maps) {
                    initMap(lat, lng)
                } else {
                    const retry = () => {
                        if (window.kakao && window.kakao.maps) {
                            initMap(lat, lng)
                        } else {
                            setTimeout(retry, 100)
                        }
                    }
                    retry()
                }
            },
            () => {
                alert('위치 정보를 가져올 수 없습니다. 서울로 기본 설정합니다.')
                initMap(37.5665, 126.9780)
            }
        )
    } else {
        alert('브라우저가 위치 정보를 지원하지 않습니다. 기본 위치(서울)로 설정합니다.')
        initMap(37.5665, 126.9780)
    }
})
</script>

<style scoped>
#map {
    margin-top: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>
