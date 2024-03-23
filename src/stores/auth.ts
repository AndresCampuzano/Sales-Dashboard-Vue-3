import { ref } from 'vue'
import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '@/firebase/firebaseConfig'
import router from '@/router'
import firebase from 'firebase/compat/app'

export const authStore = defineStore('authStore', () => {
  const user = ref<firebase.User | null>(null)
  const init = async () => {
    onAuthStateChanged(FirebaseAuth, async (userDetails) => {
      if (userDetails) {
        user.value = userDetails as firebase.User
      } else {
        user.value = null
      }
    })
  }
  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(FirebaseAuth, email, password)
      await router.push('/')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  const logoutFirebase = async () => await FirebaseAuth.signOut()

  return { init, signInWithEmail, logoutFirebase, user }
})
