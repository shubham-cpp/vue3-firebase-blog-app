<template>
  <ElForm ref="rulesRef" :model="form" :rules="rules" @submit.prevent="handleSubmit">
    <ElFormItem label="Blog Title" prop="title">
      <ElInput v-model="form.title" size="large" placeholder="Some interesting title" />
    </ElFormItem>
    <ElFormItem label="Blog Author" prop="fullName" class="mt-10">
      <ElInput v-model="form.createdBy" size="large" placeholder="Author Name" />
    </ElFormItem>
    <label class="mt-10"> Blog Content </label>
    <QuillEditor v-model:content="form.content" theme="snow" content-type="html" />
    <ElFormItem label="Tags" class="mt-10">
      <ElSelect
        v-model="form.tags"
        multiple
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="Choose tags for your article"
      >
        <ElOption v-for="tag in tags" :key="tag" :label="tag" :value="tag" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem class="mt-10" required>
      <ElButton type="primary" native-type="submit">Submit</ElButton>
      <ElButton @click="rulesRef?.resetFields()">Reset</ElButton>
      <ElButton @click="router.push('/')">Cancel</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import type { Blog } from '@/types'
import { blogsCollectionRef } from '@/utils'
import { ElMessage, type FormInstance } from 'element-plus'
import { addDoc } from 'firebase/firestore'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defaultBlog, rulesObj } from './common'
import { QuillEditor } from '@vueup/vue-quill'

import '@vueup/vue-quill/dist/vue-quill.snow.css'

const rulesRef = ref<FormInstance>()
const rules = reactive(rulesObj)
const router = useRouter()

const form = reactive<Blog>(defaultBlog)
const tags = ['food', 'computer', 'programming', 'travel']

const handleSubmit = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = form
  addDoc(blogsCollectionRef, rest)
    .then((savedDoc) => {
      ElMessage.success('Blog has been created')
      router.push(`/blogs/${savedDoc.id}`)
    })
    .catch((error) => {
      console.error(error)
      ElMessage.error('Error while creating the blog')
    })
}
</script>
