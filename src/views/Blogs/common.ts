import type { Blog } from '@/types'
import type { FormRules } from 'element-plus'

export const rulesObj: FormRules = {
  title: [
    {
      required: true,
      message: 'Title cannot be empty',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 50,
      message: 'Title must be between 3 and 50 characters',
      trigger: 'blur'
    }
  ],
  fullName: [
    {
      type: 'string',
      required: true,
      message: 'Full name cannot be empty',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 50,
      message: 'Full name must be between 3 and 50 characters',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (!/^[A-Za-z]{2,24} [A-Za-z]{2,24}$/.test(value)) {
          callback(new Error('Please enter your full name'))
        } else {
          callback()
        }
      }
    }
  ],
  tags: [
    {
      required: true,
      message: 'Tags cannot be empty',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('Please select at least one tag'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}
export const defaultBlog: Blog = {
  title: '',
  content: '',
  createdBy: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tags: [],
  id: ''
}
