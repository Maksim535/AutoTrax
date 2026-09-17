import { defineStore } from 'pinia'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'


import { auth } from '../firebase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    async register(name, email, password) {
  this.loading = true
  this.error = null

  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    await updateProfile(result.user, {
      displayName: name
    })

    this.user = result.user

    return result.user

  } catch (error) {
    this.error = error.message
    throw error

  } finally {
    this.loading = false
  }
},

    async login(email, password) {
      this.loading = true
      this.error = null

      try {
        const result = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

        this.user = result.user

        return result.user
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      await signOut(auth)
      this.user = null
    },

    listenToAuthChanges() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
      })
    }
  }
})