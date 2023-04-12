const FormEdit = ({ product }) => {
  return (
    <form id='form' className='flex flex-col gap-2 mt-2'>
      <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>Editar Bebida</h3>
      <input defaultValue={product.name} type='text' placeholder='Nombre' name='cocktailName' className='border-2 border-blue-950 rounded pl-2' />
      <input defaultValue={product.price} type='number' placeholder='Precio' name='cocktailPrice' className='border-2 border-blue-950 rounded pl-2' />
      <input type='file' name='cocktailPhoto' className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-blue-100' />
    </form>
  )
}

export default FormEdit
