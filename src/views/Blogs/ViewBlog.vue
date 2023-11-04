<template>
  <ElForm ref="formRef" :model="form" :rules="rules" @submit.prevent="handleSubmit">
    <ElCard class="box-card">
      <template #header>
        <div class="card-header">
          <ElFormItem v-if="isEditing" label="Blog Title" prop="title">
            <ElInput v-model="form.title" size="large" />
          </ElFormItem>
          <h1 v-else class="heading">
            {{ form.title }}
          </h1>
          <div class="buttons">
            <ElTooltip
              :content="
                isEditing
                  ? 'Click here to save the blog'
                  : 'Button is disabled while not editing the Blog'
              "
            >
              <ElButton
                type="primary"
                native-type="submit"
                class="btn"
                :icon="DocumentAdd"
                :disabled="!isEditing"
              >
                Save
              </ElButton>
            </ElTooltip>
            <ElTooltip content="Start editing the Blog">
              <ElButton class="button" type="primary" @click="isEditing = !isEditing">
                <ElIcon>
                  <Close v-if="isEditing" />
                  <Edit v-else />
                </ElIcon>
                {{ isEditing ? 'Cancel' : 'Edit' }}
              </ElButton>
            </ElTooltip>
            <ElTooltip content="delete the blog">
              <El-Popconfirm
                title="Are you sure to delete this blog?"
                aria-label="Delete the blog"
                @confirm="deleteBlog"
              >
                <template #reference>
                  <ElButton
                    class="button"
                    type="danger"
                    :icon="DeleteFilled"
                    :disabled="isEditing"
                  />
                </template>
              </El-Popconfirm>
            </ElTooltip>
          </div>
        </div>
      </template>
      <div>
        <h4>
          By <u>{{ form.createdBy }}</u> on {{ formatDate(form.createdAt) }}
        </h4>
      </div>
    </ElCard>
    <ElCard>
      <QuillEditor
        v-if="isEditing"
        v-model:content="form.content"
        theme="snow"
        :enable="isEditing"
        content-type="html"
      />
      <!-- <ckeditor v-if="isEditing" v-model="editorData" :editor="editor"  /> -->
    <div v-else v-html="form.content"></div>
      <ElFormItem v-if="isEditing" label="Tags" prop="tags">
        <ElSelect
          v-model="form.tags"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
        >
          <ElOption v-for="option in options" :key="option" :value="option">
            {{ option }}
          </ElOption>
        </ElSelect>
      </ElFormItem>
      <div v-else>
        <ElTag v-for="tag in form.tags" :key="tag" class="mx-2" effect="plain" size="large">
          {{ tag }}
        </ElTag>
      </div>
    </ElCard>
  </ElForm>
</template>

<script setup lang="ts">
import type { Blog } from '@/types'
import { formatDate, getBlogDocRef } from '@/utils'
import { Close, DeleteFilled, DocumentAdd, Edit } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { onSnapshot, updateDoc, type Unsubscribe, deleteDoc } from 'firebase/firestore'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { defaultBlog, rulesObj } from './common'

import '@vueup/vue-quill/dist/vue-quill.snow.css'

let unsubBlog: Unsubscribe
const params = useRoute().params as { id: string }

const isEditing = ref(false)
const options = reactive(['food', 'computer', 'science'])
const form = reactive<Blog>({
  ...defaultBlog,
  id: params.id
})
const formRef = ref<FormInstance>()
const rules = reactive(rulesObj)
const router = useRouter()

onMounted(() => {
  const q = getBlogDocRef(params.id)

  unsubBlog = onSnapshot(q, (snapshot) => {
    if (!snapshot.exists()) return
    const data = snapshot.data()
    form.title = data.title
    form.content = data.content
    form.createdAt = data.createdAt
    // form.updatedAt = data?.updatedAt ?? data.createdAt
    form.createdBy = data.createdBy
    form.tags = data.tags
  })
})
onUnmounted(() => {
  unsubBlog()
})
const handleSubmit = () => {
  formRef?.value?.validate((valid) => {
    if (!valid) return

    isEditing.value = false
    updateDoc(getBlogDocRef(params.id), form)
      .then(() => {
        console.log('Document successfully written!')
        ElMessage.success('Blog successfully updated')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
        ElMessage.error('Error while updating the blog')
      })
  })
}
const deleteBlog = () => {
  deleteDoc(getBlogDocRef(params.id))
    .then(() => {
      ElMessage.success('Blog successfully deleted')
      router.push('/')
    })
    .catch((error) => {
      ElMessage.error('Error while deleting the blog')
      console.error(error)
    })
}
</script>

<style scoped>
.buttons {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
