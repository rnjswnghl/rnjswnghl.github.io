<template>
    <div class="d-flex justify-content-center mt-3 gap-4">
        <div @click="showFollowers = true" class="follow-stat text-center" style="cursor: pointer;">
            <strong>{{ followers.length }}</strong><br />팔로워
        </div>
        <div @click="showFollowing = true" class="follow-stat text-center" style="cursor: pointer;">
            <strong>{{ following.length }}</strong><br />팔로잉
        </div>

        <div v-if="showFollowers" class="follow-modal">
            <div class="follow-overlay" @click="showFollowers = false"></div>
            <div class="follow-content">
                <h5>팔로워 목록</h5>
                <ul>
                    <li v-for="user in followers" :key="user.id">
                        <a href="#" @click.prevent="goToProfile(user.username)">{{ user.username }}</a>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="showFollowing" class="follow-modal">
            <div class="follow-overlay" @click="showFollowing = false"></div>
            <div class="follow-content">
                <h5>팔로잉 목록</h5>
                <ul>
                    <li v-for="user in following" :key="user.id">
                        <a href="#" @click.prevent="goToProfile(user.username)">{{ user.username }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    followers: Array,
    following: Array,
});

const showFollowers = ref(false);
const showFollowing = ref(false);

const router = useRouter();

function goToProfile(username) {
    showFollowers.value = false;
    showFollowing.value = false;

    router.push({ name: 'MyPageViewByUsername', params: { username } });
}
</script>

<style scoped>
.follow-stat:hover {
    text-decoration: underline;
}

.follow-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
}

.follow-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.follow-content {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-height: 60%;
    overflow-y: auto;
    width: 300px;
}
</style>
