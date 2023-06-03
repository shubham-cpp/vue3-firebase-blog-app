<template>
  <ElCard class="box-card">
    <template #header>
      <div class="card-header">
        <ElPopover trigger="hover" :content="props.blog.title" width="350">
          <template #reference>
            <ElText truncated>{{ props.blog.title }}</ElText>
          </template>
        </ElPopover>
        <ElButton class="button" type="primary" link>
          <RouterLink :to="`/blogs/${props.blog.id}`">View</RouterLink>
        </ElButton>
      </div>
    </template>
    <div>{{ props.blog.createdBy }} | {{ formatTimeAgo(props.blog.createdAt) }}</div>
  </ElCard>
</template>

<script setup lang="ts">
import type { Blog } from '@/types'
import { formatTimeAgo } from '@/utils'
interface Props {
  blog: Blog
}
const props = defineProps<Props>()
</script>
