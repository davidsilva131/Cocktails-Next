import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDsonCVMWpdLl-m4GcK_kWMr0tpPQ3_TiE',
  authDomain: 'cocktails-test-c3629.firebaseapp.com',
  projectId: 'cocktails-test-c3629',
  storageBucket: 'cocktails-test-c3629.appspot.com',
  messagingSenderId: '849840611642',
  appId: '1:849840611642:web:9e79b6ee64707033bf3003'
}

const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const auth = getAuth()
