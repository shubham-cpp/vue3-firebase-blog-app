<template>
  <ElCard class="about">
    <template #header><h1>Made By Shubham Pawar</h1></template>
    <h3>This is A blog website</h3>
    <p>Build with Technologies such as</p>
    <ul>
      <li>Vue 3</li>
      <li>Element Plus</li>
      <li>
        FireBase
        <ul>
          <li>Authentication</li>
          <li>FireStore</li>
        </ul>
      </li>
    </ul>
    <a href="http://github.com/shubham-cpp" target="_blank"
      >Visit Github Repo
      <ElIcon>
        <TopRight />
      </ElIcon>
    </a>
  </ElCard>
</template>
<script setup lang="ts">
import { TopRight } from '@element-plus/icons-vue'
</script>
