import { useState } from 'react'

const FormNewSell = ({ data }) => {
  const [shop, setShop] = useState([])

  const newShop = () => {
    const form = document.getElementById('form')
    const formData = new FormData(form)
    const product = data[formData.get('product')]
    const productQuantity = parseInt(formData.get('productQuantity'))
    const today = new Date()
    const newData = {
      name: product.name,
      quantity: productQuantity,
      price: product.price * product.quantity,
      date: today.getFullYear() + '-' + (today.getMonth() + '-' + today.getDate())
    }
    console.log(newData)
    // setShop([...shop, newData])
  }
  const getTotal = () => {
    let total = 0
    shop.forEach(element => {
      total = total + element.price
    })
    return total
  }

  return (
    <>
      <form id='form' className='flex flex-col gap-2 mt-2'>
        <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>Nueva Venta</h3>
        <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Select an option</span>
        <select name='product' id='product' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
          <option selected>Choose a country</option>
          {
            data.map((product, index) => (
              <option key={product.id} value={index}>{product.name}</option>
            ))
          }
        </select>
        <input type='number' placeholder='Cantidad' name='productQuantity' className='border-2 border-blue-950 rounded pl-2' />
        {/* <input readOnly type='number'>{getTotal()}</input> */}
      </form>
      <button onClick={newShop}>Agregar</button>
    </>
  )
}

export default FormNewSell
