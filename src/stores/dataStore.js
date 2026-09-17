import { defineStore } from 'pinia'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from 'firebase/firestore'

import { auth, db } from '../firebase'

export const useDataStore = defineStore('data', {
  state: () => ({
    vehicles: [],
    services: [],
    loading: false,
    error: null
  }),

  actions: {

    // =============================
    // VOZILA
    // =============================

    async addVehicle(vehicle) {
      this.loading = true
      this.error = null

      try {
        const vehicleWithUser = {
          ...vehicle,
          userId: auth.currentUser.uid
        }

        const docRef = await addDoc(
          collection(db, 'vehicles'),
          vehicleWithUser
        )

        this.vehicles.push({
          id: docRef.id,
          ...vehicleWithUser
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
        const q = query(
          collection(db, 'vehicles'),
          where('userId', '==', auth.currentUser.uid)
        )

        const snapshot = await getDocs(q)

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
          ...this.vehicles[index],
          ...vehicle
        }
      }
    },


    async deleteVehicle(id) {

      const snapshot = await getDocs(
        collection(db, 'services')
      )

      const vehicleServices = snapshot.docs.filter(
        (document) =>
          document.data().vehicleId === id &&
          document.data().userId === auth.currentUser.uid
      )

      for (const service of vehicleServices) {
        await deleteDoc(
          doc(db, 'services', service.id)
        )
      }

      await deleteDoc(
        doc(db, 'vehicles', id)
      )

      this.vehicles = this.vehicles.filter(
        (vehicle) => vehicle.id !== id
      )

      this.services = this.services.filter(
        (service) => service.vehicleId !== id
      )
    },


    // =============================
    // SERVISI
    // =============================

    async addService(service) {
      this.loading = true
      this.error = null

      try {
        const serviceWithUser = {
          ...service,
          userId: auth.currentUser.uid
        }

        const docRef = await addDoc(
          collection(db, 'services'),
          serviceWithUser
        )

        this.services.push({
          id: docRef.id,
          ...serviceWithUser
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
        const q = query(
          collection(db, 'services'),
          where('userId', '==', auth.currentUser.uid)
        )

        const snapshot = await getDocs(q)

        this.services = snapshot.docs
          .map((document) => ({
            id: document.id,
            ...document.data()
          }))
          .filter(
            (service) => service.vehicleId === vehicleId
          )

      } catch (error) {
        this.error = error.message
        throw error

      } finally {
        this.loading = false
      }
    },


    async getAllServices() {
      this.loading = true
      this.error = null

      try {
        const q = query(
          collection(db, 'services'),
          where('userId', '==', auth.currentUser.uid)
        )

        const snapshot = await getDocs(q)

        this.services = snapshot.docs.map((document) => ({
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


    async updateService(id, service) {
      const serviceRef = doc(db, 'services', id)

      await updateDoc(serviceRef, service)

      const index = this.services.findIndex(
        (service) => service.id === id
      )

      if (index !== -1) {
        this.services[index] = {
          ...this.services[index],
          ...service
        }
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