<template>
  <ElDialog v-model="dialogVisible" :before-close="handleClose">
    <ElTabs v-model="activeTabName" stretch>
      <ElTabPane label="Login" name="Login">
        <LoginView class="tab-login-register" />
      </ElTabPane>

      <ElTabPane label="Register" name="Register">
        <RegisterView class="tab-login-register" />
      </ElTabPane>
    </ElTabs>
    <p class="text-center">OR</p>
    <template #footer>
      <SignInWithGoogle />
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import LoginView from './LoginView.vue'
import RegisterView from './RegisterView.vue'
import SignInWithGoogle from '@/components/SignInWithGoogle.vue'
import { computed, ref } from 'vue'

interface Props {
  isModalVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), { isModalVisible: false })
const emit = defineEmits<{
  (e: 'update:isModalVisible', value: boolean): void
  (e: 'beforeClose'): void
}>()

const dialogVisible = computed({
  get: () => props.isModalVisible,
  set: (value: boolean) => emit('update:isModalVisible', value)
})
const activeTabName = ref<'Login' | 'Register'>('Login')
const handleClose = () => {
  activeTabName.value = 'Login'
  emit('beforeClose')
}
</script>

<style scoped></style>
