<template>
  <header>
    <nav class="wrapper">
      <ElMenu :default-active="activeIndex" mode="horizontal" :ellipsis="false">
        <ElMenuItem index="1">
          <RouterLink to="/">Home</RouterLink>
        </ElMenuItem>
        <div class="flew-grow"></div>
        <ElMenuItem index="2">
          <RouterLink to="/about">About</RouterLink>
        </ElMenuItem>
        <ElMenuItem index="3">
          <RouterLink to="/add/blog">Add Blog</RouterLink>
        </ElMenuItem>
      </ElMenu>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const activeIndex = ref('1')
</script>
