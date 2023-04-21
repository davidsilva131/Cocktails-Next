import { useState } from 'react'
import FormNewSell from './FormNewSell'

const SellingsModal = ({ data }) => {
  const [open, setOpen] = useState(false)

  const handleAdd = () => {
    const form = document.getElementById('form')
    const formData = new FormData(form)
    const product = data[formData.get('product')]
    const productQuantity = parseInt(formData.get('productQuantity'))
    console.log(product)
    console.log(productQuantity)
  }
  return (
    <>
      <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
        <button
          onClick={() => { setOpen(true) }}
          type='button'
          className='flex items-center justify-center text-white bg-secondary-100 hover:bg-secondary-50 focus:ring-4 focus:ring-secondary-50 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none'
        >
          Agregar
        </button>
      </div>

      <div className={open ? 'z-10 relative' : 'hidden'} aria-labelledby='modal-title' role='dialog' aria-modal='true'>

        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>

            <div className='relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-center'>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <FormNewSell data={data} />
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  className={`inline-flex w-full justify-center rounded-md ${open.action === 'add' ? 'bg-green-600 hover:bg-green-500' : open.action === 'edit' ? 'bg-blue-950 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-500'}  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto`}
                  onClick={handleAdd}
                >
                  Agregar
                </button>
                <button
                  type='button'
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                  onClick={() => { setOpen(false) }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SellingsModal
