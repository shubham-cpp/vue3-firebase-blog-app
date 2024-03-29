<template>
  <ElForm
    ref="loginFormRef"
    :rules="loginFormRules"
    :model="loginForm"
    label-width="150"
    @submit.prevent="handleSubmit"
  >
    <ElFormItem prop="email" label="Email Address">
      <ElInput v-model="loginForm.email" type="email" />
    </ElFormItem>
    <ElFormItem prop="password" label="Password">
      <ElInput v-model="loginForm.password" type="password" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" native-type="submit"> Login </ElButton>
      <ElButton native-type="reset" @click="loginFormRef?.resetFields()">Clear</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import { auth } from '@/configs/firebase'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

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
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  email: '',
  password: ''
})
const loginFormRules = reactive<FormRules>({
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        // if value doesn't match a email regex throw error
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          callback()
        } else {
          callback(new Error('Please enter a valid email address'))
        }
      }
    }
  ],
  password: [
    { required: true, message: 'Please input your password', trigger: 'blur' },
    {
      type: 'string',
      min: 6,
      max: 24,
      message: 'The password length cannot be less than 6 or more than 24'
    }
  ]
})

const handleSubmit = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (!valid) return
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then(() => {
        ElMessage.success('Successfully logged in')
        router.push('/')
        dialogVisible.value = false
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  })
}
</script>
