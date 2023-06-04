<template>
  <header>
    <nav class="wrapper">
      <ElMenu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
        <ElMenuItem index="1">
          <RouterLink to="/">Home</RouterLink>
        </ElMenuItem>
        <div class="flew-grow"></div>
        <ElMenuItem index="2">
          <RouterLink to="/about">About</RouterLink>
        </ElMenuItem>
        <ElMenuItem index="3">
          <RouterLink to="/add/blog">Add Blog</RouterLink>
        </ElMenuItem>
        <ElMenuItem v-if="auth?.currentUser == null" index="4">
          <div
            role="button"
            tabindex="0"
            type="button"
            aria-label="Press this button to login or signin"
            @click="isModalVisible = true"
          >
            Login
          </div>
        </ElMenuItem>
        <ElMenuItem v-else index="5">
          <ElPopconfirm title="Are you sure you want to logout?" @confirm="handleLogout">
            <template #reference>
              <div
                role="button"
                tabindex="0"
                type="button"
                aria-label="Press this button to Logout"
              >
                Logout
              </div>
            </template>
          </ElPopconfirm>
        </ElMenuItem>
      </ElMenu>
    </nav>
    <LoginRegisterView
      v-model:is-modal-visible="isModalVisible"
      @before-close="activeIndex = '1'"
    />
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import LoginRegisterView from '@/views/LoginRegister/LoginRegisterTab.vue'
import { auth } from '@/configs/firebase'
import { ElMessage } from 'element-plus'
const activeIndex = ref('1')
const isModalVisible = ref(false)

const router = useRouter()

const handleLogout = () => {
  auth
    .signOut()
    .then(() => {
      ElMessage.success('Successfully logged out')
      router.push('/')
      isModalVisible.value = true
    })
    .catch((error) => {
      ElMessage.error('There was an error while logging out.')
      ElMessage.error('Please try again later')
      console.log(error)
    })
}
</script>
