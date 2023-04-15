import { database } from './firebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const collectionName = 'sellings'
const sellingsCollection = collection(database, collectionName)

export const getAllSellings = async () => {
  const querySnapshot = await getDocs(sellingsCollection)
  const sellings = []
  try {
    querySnapshot.forEach(element => {
      const tempSell = {
        id: element.id,
        ...element.data()
      }
      sellings.push(tempSell)
    })
    return sellings
  } catch (error) {
    console.log(error)
  }
}
export const newSell = (product) => {
  return addDoc(sellingsCollection, {
    ...product
  })
}
export const deleteSell = async (id) => {
  try {
    await deleteDoc(doc(database, collectionName, id))
  } catch (error) {
    console.log(error)
  }
}
export const updateSell = async (product, id) => {
  try {
    const sellRef = doc(database, collectionName, id)
    await updateDoc(sellRef, {
      ...product
    })
  } catch (error) {
    console.log(error)
  }
}
