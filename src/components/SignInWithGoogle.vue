<template>
  <ElRow justify="center">
    <ElTooltip content="Continue with Google Account, no email or password required">
      <ElButton class="g-btn" @click="handleClick"> Sign in with Google Account </ElButton>
    </ElTooltip>
  </ElRow>
</template>

<script setup lang="ts">
import { auth, googleProvider } from '@/configs/firebase'
import { ElMessage } from 'element-plus'
import { signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  signInWithPopup(auth, googleProvider)
    .then(() => {
      ElMessage.success('Successfully logged in')
      router.push('/')
    })
    .catch((error) => {
      console.log(error)
      ElMessage.error(error.message)
    })
}
</script>
<style scoped lang="scss">
.g-btn {
  padding: 1.4rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  color: #fff;
  background-color: #42b883;
}
</style>
