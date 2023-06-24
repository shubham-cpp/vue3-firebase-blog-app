<template>
  <ElDialog
    v-model="dialogVisible"
    :before-close="handleClose"
    :width="isLargeScreen ? '50%' : '90%'"
  >
    <ElTabs v-model="activeTabName" stretch>
      <ElTabPane label="Login" name="Login">
        <LoginView v-model:is-modal-visible="dialogVisible" class="tab-login-register" />
      </ElTabPane>

      <ElTabPane label="Register" name="Register">
        <RegisterView v-model:is-modal-visible="dialogVisible" class="tab-login-register" />
      </ElTabPane>
    </ElTabs>
    <p class="text-center">OR</p>
    <template #footer>
      <SignInWithGoogle v-model:is-modal-visible="dialogVisible" />
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import LoginView from './LoginView.vue'
import RegisterView from './RegisterView.vue'
import SignInWithGoogle from '@/components/SignInWithGoogle.vue'
import { computed, ref } from 'vue'

interface Props {
  isModalVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), { isModalVisible: false })

const isLargeScreen = useMediaQuery('(min-width: 800px)')
const emit = defineEmits<{
  (e: 'update:isModalVisible', value: boolean): void
  (e: 'beforeClose'): void
}>()

const dialogVisible = computed({
  get: () => props.isModalVisible,
  set: (value: boolean) => emit('update:isModalVisible', value)
})
const activeTabName = ref<'Login' | 'Register'>('Login')
const handleClose = (done: () => void) => {
  activeTabName.value = 'Login'
  emit('beforeClose')
  done()
}
</script>

<style scoped></style>
