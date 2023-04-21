import { numberToMoney } from '@/utils/stringsFunctions'
import NoData from './NoData'

const SellingTable = ({ data, setData }) => {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 '>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-4 py-3'>
                Producto
              </th>
              <th scope='col' className='px-4 py-3'>
                Cantidad
              </th>
              <th scope='col' className='px-4 py-3'>
                Precio
              </th>
              <th scope='col' className='px-4 py-3' />
            </tr>
          </thead>
          <tbody>
            {data.length !== 0
              ? (
                  data.map(product => (
                    <tr key={product.id} className='border-b'>
                      <th
                        scope='row'
                        className='px-4 py-3 flex flex-col justify-center gap-2 font-medium text-gray-900 whitespace-nowrap'
                      >
                        {product.name}
                      </th>
                      <td className='px-4 py-3'>{product.quantity}</td>
                      <td className='px-4 py-3'>{numberToMoney(product.price)}</td>
                      <td className='px-4 py-3 flex gap-2 items-center justify-end'>
                        <button
                          onClick={() => {}}
                          className='bg-primary-100 hover:bg-primary-50 inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:outline-none'
                          type='button'
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {}}
                          className='bg-red-600 hover:bg-red-500 inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:outline-none'
                          type='button'
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )
              : (
                <NoData />
                )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SellingTable
