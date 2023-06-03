import { db } from '@/configs/firebase'
import { collection, doc } from 'firebase/firestore'

export const blogsCollectionRef = collection(db, 'blogs')
export const getBlogDocRef = (id: string) => doc(db, 'blogs', id)
