export interface Blog {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
  createdBy: string
  tags: string[]
}

// const data: Blog[] = [
//   {
//     id: crypto.randomUUID(),
//     title: 'Blog 1',
//     content: 'Blog 1 content',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     createdBy: 'admin',
//     tags: []
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Blog 2',
//     content: 'Blog 2 content',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     createdBy: 'other',
//     tags: []
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Blog 3',
//     content: 'Blog 3 content',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     createdBy: 'other 2',
//     tags: []
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Blog 3',
//     content: 'Blog 3 content',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     createdBy: 'other 2',
//     tags: []
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Blog 3',
//     content: 'Blog 3 content',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     createdBy: 'other 2',
//     tags: []
//   },
//   {
//     id: crypto.randomUUID(),
//     title: 'Blog 3',
//     content: 'Blog 3 content',
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     createdBy: 'other 2',
//     tags: []
//   }
// ]
