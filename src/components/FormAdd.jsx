const FormAdd = ({ page }) => {
  return (
    <>
      <form id='form' className='flex flex-col gap-2 mt-2'>
        <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>{page === 'bebidas' ? 'Agregar Bebida' : 'Agregar Producto'}</h3>
        <input type='text' placeholder='Nombre' name='productName' className='border-2 border-blue-950 rounded pl-2' />
        <input type='number' placeholder='Precio' name='productPrice' className='border-2 border-blue-950 rounded pl-2' />
        {
          page === 'inventario' && <input type='number' placeholder='Cantidad' name='productQuantity' className='border-2 border-blue-950 rounded pl-2' />
        }
        {
          page === 'bebidas' && <input type='file' name='productPhoto' className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100' />
        }
      </form>
    </>
  )
}

export default FormAdd
