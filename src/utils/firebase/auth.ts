import { db } from '@/configs/firebase'
import { collection, doc } from 'firebase/firestore'

export const getUsersCollectionRef = () => collection(db, 'users')
export const getUserDocRef = (id: string) => doc(db, 'users', id)
export const name = 'shubha'
