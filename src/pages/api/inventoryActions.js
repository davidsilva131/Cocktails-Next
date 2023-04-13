import { database } from '@/pages/api/firebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const collectionName = 'inventory'
const inventoryCollection = collection(database, collectionName)

export const getInventory = async () => {
  const querySnapshot = await getDocs(inventoryCollection)
  const inventory = []
  try {
    querySnapshot.forEach(element => {
      const tempInventory = {
        id: element.id,
        ...element.data()
      }
      inventory.push(tempInventory)
    })
    return inventory
  } catch (error) {
    console.log(error)
  }
}

export const createProduct = (product) => {
  return addDoc(inventoryCollection, {
    ...product
  })
}

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(database, collectionName, id))
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = async (product, id) => {
  try {
    const productRef = doc(database, collectionName, id)
    await updateDoc(productRef, {
      ...product
    })
  } catch (error) {
    console.log(error)
  }
}
