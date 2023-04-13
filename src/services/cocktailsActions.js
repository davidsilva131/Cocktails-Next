import { database } from '../services/firebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const collectionName = 'cocktails'
const cocktailsCollection = collection(database, collectionName)

export const getAllCocktails = async () => {
  const querySnapshot = await getDocs(cocktailsCollection)
  const cocktails = []
  try {
    querySnapshot.forEach(element => {
      const tempCocktail = {
        id: element.id,
        ...element.data()
      }
      cocktails.push(tempCocktail)
    })
    return cocktails
  } catch (error) {
    console.log(error)
  }
}

export const createCocktail = (cocktail) => {
  return addDoc(cocktailsCollection, {
    ...cocktail
  })
}

export const deleteCocktail = async (id) => {
  try {
    await deleteDoc(doc(database, collectionName, id))
  } catch (error) {
    console.log(error)
  }
}

export const updateCocktail = async (cocktail, id) => {
  try {
    const cocktailRef = doc(database, collectionName, id)
    await updateDoc(cocktailRef, {
      ...cocktail
    })
  } catch (error) {
    console.log(error)
  }
}
