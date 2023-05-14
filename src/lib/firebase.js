import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBDHWn_kjYpOgykNCH4OMqAFWMsPpTt-cE',
  authDomain: 'pao-delivery.firebaseapp.com',
  projectId: 'pao-delivery',
  storageBucket: 'pao-delivery.appspot.com',
  messagingSenderId: '463000980783',
  appId: '1:463000980783:web:be7494da13e8c2a11f25da',
  measurementId: 'G-ECTLKJPQWV'
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }
