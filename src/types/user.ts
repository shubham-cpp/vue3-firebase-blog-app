export interface User {
  uid: string
  email: string
  fullName: string
  photoURL?: string
  age?: number
  provider: 'local' | 'google'
}
