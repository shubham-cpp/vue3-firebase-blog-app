import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = reactive({})

  return {
    user
  }
})
