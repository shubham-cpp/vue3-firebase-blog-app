<template>
  <ElForm
    ref="registerFormRef"
    :rules="registerFormRules"
    :data="registerForm"
    label-width="150"
    @submit.prevent="handleSubmit"
  >
    <ElFormItem prop="fullName" label="Full Name">
      <ElInput v-model="registerForm.fullName" />
    </ElFormItem>
    <ElFormItem prop="email" label="Email Address">
      <ElInput v-model="registerForm.email" type="email" />
    </ElFormItem>
    <ElFormItem prop="password" label="Password">
      <ElInput v-model="registerForm.password" type="password" />
    </ElFormItem>
    <ElFormItem prop="confirmPassword" label="Confirm Password">
      <ElInput v-model="registerForm.confirmPassword" type="password" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" native-type="submit">Register</ElButton>
      <ElButton native-type="reset" @click="registerFormRef?.resetFields()">Clear</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc } from 'firebase/firestore'
import { auth } from '@/configs/firebase'
import { getUsersCollectionRef } from '@/utils'
import { computed } from 'vue'

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

const registerFormRef = ref<FormInstance>()
const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const registerFormRules = reactive<FormRules>({
  fullName: [
    { required: true, message: 'Please input full name', trigger: 'blur' },
    {
      min: 3,
      max: 20,
      message: 'The full name length cannot be less than 3 or more than 20'
    },
    {
      validator: (_rule, value, callback) => {
        if (!/^[A-Za-z]{3,20} [A-Za-z]{3,20}$/i.test(value)) {
          callback(new Error('Please enter a valid full name'))
        } else {
          callback()
        }
      }
    }
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        // if value doesn't match a email regex throw error
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          callback(new Error('Please enter a valid email address'))
        } else {
          callback()
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
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('The two passwords do not match'))
        } else {
          callback()
        }
      }
    }
  ]
})

const handleSubmit = () => {
  registerFormRef.value?.validate(async (valid) => {
    if (!valid) return
    try {
      await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password)
      await addDoc(getUsersCollectionRef(), {
        fullName: registerForm.fullName,
        email: registerForm.email,
        provider: 'local',
        createdAt: Date.now()
      })
      dialogVisible.value = false
    } catch (error) {
      console.log(error)
      ElMessage.error('Something went wrong')
    }
  })
}
</script>
