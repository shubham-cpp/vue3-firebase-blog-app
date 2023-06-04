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
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

interface Props {
  isModalVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), { isModalVisible: false })

const emit = defineEmits<{
  (e: 'update:isModalVisible', value: boolean): void
}>()

const dialogVisible = computed({
  get: () => props.isModalVisible,
  set: (value: boolean) => emit('update:isModalVisible', value)
})

const router = useRouter()
const userStore = useUserStore()

const handleClick = () => {
  console.log(auth.currentUser)
  signInWithPopup(auth, googleProvider)
    .then((user) => {
      ElMessage.success('Successfully logged in')
      router.push('/')
      dialogVisible.value = false
      userStore.setUser(user.user)
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
