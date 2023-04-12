import { fileUpload } from '@/pages/api/fileUpload'
import FormAdd from './FormAdd'
import FormDelete from './FormDelete'
import FormEdit from './FormEdit'
import { createCocktail, deleteCocktail, getAllCocktails, updateCocktail } from '@/pages/api/cocktailsActions'
import Swal from 'sweetalert2'

const ModalAdd = ({ setDataFiltered, open, setOpen }) => {
  const handleCancel = () => {
    const form = document.getElementById('form')
    form.reset()
    setOpen({ ...open, state: false })
  }
  const handleAdd = async () => {
    const form = document.getElementById('form')
    const formData = new FormData(form)
    const cocktailName = formData.get('cocktailName')
    const cocktailPrice = parseInt(formData.get('cocktailPrice'))
    const urlPhoto = await fileUpload(formData.get('cocktailPhoto'))

    if (cocktailName !== '' && cocktailPrice !== '' && urlPhoto) {
      const newCocktail = {
        name: cocktailName,
        price: parseInt(cocktailPrice),
        image: urlPhoto
      }
      try {
        await createCocktail(newCocktail)
        handleCancel()
        const tempData = await getAllCocktails()
        setDataFiltered(tempData)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bebida creada exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido crear la bebida'
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Datos incompletos',
        text: 'Porfavor ingrese todos los campos'
      })
    }
  }
  const handleEdit = async (product) => {
    const form = document.getElementById('form')
    const formData = new FormData(form)
    let updatedCocktail = {
      name: product.name,
      price: product.price,
      image: product.image
    }
    const cocktailName = formData.get('cocktailName')
    if (cocktailName !== product.name) {
      updatedCocktail = {
        ...updatedCocktail,
        name: cocktailName
      }
    }
    const cocktailPrice = parseInt(formData.get('cocktailPrice'))
    if (cocktailPrice !== product.price) {
      updatedCocktail = {
        ...updatedCocktail,
        price: cocktailPrice
      }
    }
    const photo = formData.get('cocktailPhoto')
    if (photo.name !== '') {
      updatedCocktail = {
        ...updatedCocktail,
        image: await fileUpload(formData.get('cocktailPhoto'))
      }
    }
    try {
      await updateCocktail(updatedCocktail, product.id)
      const tempData = await getAllCocktails()
      setDataFiltered(tempData)
      handleCancel()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bebida editada exitosamente!',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido editar la bebida'
      })
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteCocktail(id)
      const tempData = await getAllCocktails()
      setDataFiltered(tempData)
      handleCancel()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bebida eliminada exitosamente!',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha podido eliminar la bebida'
      })
    }
  }
  return (
    <>
      <div className={open.state ? 'z-10 relative' : 'hidden'} aria-labelledby='modal-title' role='dialog' aria-modal='true'>

        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0'>

            <div className='relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-center'>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    {
                      open.action === 'add'
                        ? (<FormAdd />)
                        : open.action === 'edit'
                          ? (<FormEdit product={open.product} />)
                          : (<FormDelete />)
                    }

                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  className={`inline-flex w-full justify-center rounded-md ${open.action === 'add' ? 'bg-green-600 hover:bg-green-500' : open.action === 'edit' ? 'bg-blue-950 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-500'}  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto`}
                  onClick={() => { open.action === 'add' ? handleAdd() : open.action === 'edit' ? handleEdit(open.product) : handleDelete(open.product) }}
                >
                  {
                    open.action === 'add' ? 'Agregar' : open.action === 'edit' ? 'Editar' : 'Eliminar'
                  }
                </button>
                <button
                  type='button'
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                  onClick={() => { handleCancel() }}
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

export default ModalAdd
