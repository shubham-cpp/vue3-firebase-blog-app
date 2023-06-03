<script setup lang="ts">
import MyCard from '@/components/MyCard.vue'
import type { Blog } from '@/types'
import { blogsCollectionRef } from '@/utils'
import { onSnapshot, type Unsubscribe } from 'firebase/firestore'
import { onMounted, onUnmounted, ref } from 'vue'

const data = ref<Blog[]>([])
let unsubBlogsSnapshot: Unsubscribe
onMounted(async () => {
  unsubBlogsSnapshot = onSnapshot(blogsCollectionRef, (snapshot) => {
    data.value = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      } as Blog
    })
  })
})

onUnmounted(() => {
  unsubBlogsSnapshot()
})
</script>

<template>
  <ElRow :gutter="5" class="mt-10">
    <ElCol v-for="blog in data" :key="blog.id" :xs="24" :sm="12" :md="8" :lg="8">
      <MyCard :blog="blog" />
    </ElCol>
  </ElRow>
</template>
