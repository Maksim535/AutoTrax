import { defineStore } from 'pinia'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'

import { db } from '../firebase'

export const useDataStore = defineStore('data', {
  state: () => ({
    vehicles: [],
    services: [],
    loading: false,
    error: null
  }),

  actions: {

    async addVehicle(vehicle) {
      this.loading = true
      this.error = null

      try {
        const docRef = await addDoc(
          collection(db, 'vehicles'),
          vehicle
        )

        this.vehicles.push({
          id: docRef.id,
          ...vehicle
        })

      } catch (error) {
        this.error = error.message
        throw error

      } finally {
        this.loading = false
      }
    },

    async getVehicles() {
      this.loading = true
      this.error = null

      try {
        const snapshot = await getDocs(
          collection(db, 'vehicles')
        )

        this.vehicles = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data()
        }))

      } catch (error) {
        this.error = error.message
        throw error

      } finally {
        this.loading = false
      }
    },

    async updateVehicle(id, vehicle) {
      const vehicleRef = doc(db, 'vehicles', id)

      await updateDoc(vehicleRef, vehicle)

      const index = this.vehicles.findIndex(
        (vehicle) => vehicle.id === id
      )

      if (index !== -1) {
        this.vehicles[index] = {
          id,
          ...vehicle
        }
      }
    },

    async deleteVehicle(id) {
      await deleteDoc(
        doc(db, 'vehicles', id)
      )

      this.vehicles = this.vehicles.filter(
        (vehicle) => vehicle.id !== id
      )
    },

    async addService(service) {
      this.loading = true
      this.error = null

      try {
        const docRef = await addDoc(
          collection(db, 'services'),
          service
        )

        this.services.push({
          id: docRef.id,
          ...service
        })

      } catch (error) {
        this.error = error.message
        throw error

      } finally {
        this.loading = false
      }
    },

    async getServices(vehicleId) {
      this.loading = true
      this.error = null

      try {
        const snapshot = await getDocs(
          collection(db, 'services')
        )

        this.services = snapshot.docs
          .map((document) => ({
            id: document.id,
            ...document.data()
          }))
          .filter((service) => service.vehicleId === vehicleId)

      } catch (error) {
        this.error = error.message
        throw error

      } finally {
        this.loading = false
      }
    },

    async deleteService(id) {
      await deleteDoc(
        doc(db, 'services', id)
      )

      this.services = this.services.filter(
        (service) => service.id !== id
      )
    }

  }
})