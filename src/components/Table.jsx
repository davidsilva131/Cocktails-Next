import { numberToMoney } from '@/utils/stringsFunctions'
import Image from 'next/image'
import NoData from './NoData'

const Table = ({ dataFiltered, currentPage, setOpenModal }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500 '>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='px-4 py-3'>Bebida</th>
            <th scope='col' className='px-4 py-3'>Precio</th>
            <th scope='col' className='px-4 py-3' />
          </tr>
        </thead>
        <tbody>
          {
            dataFiltered.length !== 0
              ? (dataFiltered.slice(currentPage.start, currentPage.end).map(product => (
                <tr key={product.id} className='border-b'>
                  <th scope='row' className='px-4 py-3 flex flex-col justify-center gap-2 font-medium text-gray-900 whitespace-nowrap'>
                    {
                      product.image && <Image className='rounded' width={50} height={50} src={product.image} alt={`${product.name} image`} />
                    }
                    {product.name}
                  </th>
                  <td className='px-4 py-3'>{numberToMoney(product.price)}</td>
                  <td className='px-4 py-3 flex gap-2 items-center justify-end'>
                    <button
                      onClick={() => { setOpenModal({ action: 'edit', state: true, product: product }) }}
                      className='bg-primary-100 hover:bg-primary-50 inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:outline-none'
                      type='button'
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => { setOpenModal({ action: 'delete', state: true, product: product.id }) }}
                      className='bg-red-600 hover:bg-red-500 inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:outline-none'
                      type='button'
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>)))
              : (<NoData />)
          }

        </tbody>
      </table>
    </div>
  )
}

export default Table
