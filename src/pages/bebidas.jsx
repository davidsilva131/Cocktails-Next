import Loading from '@/components/Loading'
import NoData from '@/components/NoData'
import PageLayout from '@/components/PageLayout'
import ModalAdd from '@/components/modal'
import { getAllCocktails } from '@/pages/api/cocktailsActions'
import { numberToMoney } from '@/utils/stringsFunctions'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/* eslint-disable space-before-function-paren */
export default function Bebidas({ cocktails }) {
  const [loaded, setLoaded] = useState(false)
  const [openModal, setOpenModal] = useState({ action: 'add', state: false, product: '' })
  const [dataFiltered, setDataFiltered] = useState(cocktails)
  const pagesCount = Math.ceil(dataFiltered.length / 5)
  console.log(pagesCount)
  const [currentPage, setCurrentPage] = useState({
    page: 1,
    start: 0,
    end: 5
  })
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/')
    } else setLoaded(true)
  }, [])

  const search = ({ target }) => {
    if (target.value !== '') {
      const firstPage = {
        page: 1,
        start: 0,
        end: 5
      }
      setCurrentPage(firstPage)
      const tempData = dataFiltered.filter(cocktail => cocktail.name.toLowerCase().includes(target.value.toLowerCase()))
      setDataFiltered(tempData)
    } else setDataFiltered(cocktails)
  }
  const handleNext = () => {
    if (currentPage.page < pagesCount) {
      const newPage = {
        page: currentPage.page + 1,
        start: currentPage.start + 5,
        end: currentPage.end + 5
      }
      setCurrentPage(newPage)
    }
  }
  const handlePrevious = () => {
    if (currentPage.page > 1) {
      const newPage = {
        page: currentPage.page - 1,
        start: currentPage.start - 5,
        end: currentPage.end - 5
      }
      setCurrentPage(newPage)
    }
  }

  return (
    <>
      {
        loaded
          ? (
            <>
              <PageLayout title='Bebidas' />
              <main className='w-full flex flex-col'>
                <section className='bg-gray-50  p-3 sm:p-5'>
                  <div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
                    <div className='bg-white relative shadow-md sm:rounded-lg overflow-hidden'>
                      <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
                        <div className='w-full md:w-1/2'>
                          <form className='flex items-center'>
                            <label className='sr-only'>Search</label>
                            <div className='relative w-full'>
                              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <svg aria-hidden='true' className='w-5 h-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                  <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' />
                                </svg>
                              </div>
                              <input
                                onChange={(e) => { search(e) }}
                                type='text'
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-100 focus:border-primary-100 block w-full pl-10 p-2'
                                placeholder='Buscar...'
                              />
                            </div>
                          </form>
                        </div>
                        <div className='w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0'>
                          <button
                            onClick={() => { setOpenModal({ ...openModal, action: 'add', state: true }) }}
                            type='button'
                            className='flex items-center justify-center text-white bg-secondary-100 hover:bg-secondary-50 focus:ring-4 focus:ring-secondary-50 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none'
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
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
                              ? (dataFiltered.slice(currentPage.start, currentPage.end).map(cocktail => (
                                <tr key={cocktail.id} className='border-b'>
                                  <th scope='row' className='px-4 py-3 flex flex-col justify-center gap-2 font-medium text-gray-900 whitespace-nowrap'>
                                    <Image className='rounded' width={50} height={50} src={cocktail.image} alt={`${cocktail.name} image`} />
                                    {cocktail.name}
                                  </th>
                                  <td className='px-4 py-3'>{numberToMoney(cocktail.price)}</td>
                                  <td className='px-4 py-3 flex gap-2 items-center justify-end'>
                                    <button
                                      onClick={() => { setOpenModal({ action: 'edit', state: true, product: cocktail }) }}
                                      className='bg-primary-100 hover:bg-primary-50 inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg focus:outline-none'
                                      type='button'
                                    >
                                      Editar
                                    </button>
                                    <button
                                      onClick={() => { setOpenModal({ action: 'delete', state: true, product: cocktail.id }) }}
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
                    <nav className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4' aria-label='Table navigation'>
                      <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                        Mostrando
                        <span className='font-semibold text-gray-900'> 1-5 </span>
                        de
                        <span className='font-semibold text-gray-900'> {dataFiltered.length} </span>
                      </span>
                      <ul className='inline-flex items-stretch -space-x-px'>
                        <li className='cursor-pointer' onClick={handlePrevious}>
                          <span className='flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700'>
                            <span className='sr-only'>Anterior</span>
                            <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                              <path fillRule='evenodd' d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                          </span>
                        </li>
                        <li>
                          <span className='flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'>{currentPage.page}</span>
                        </li>
                        <li className='cursor-pointer' onClick={handleNext}>
                          <span className='flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700'>
                            <span className='sr-only'>Siguiente</span>
                            <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                              <path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd' />
                            </svg>
                          </span>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </section>
                <ModalAdd setDataFiltered={setDataFiltered} open={openModal} setOpen={setOpenModal} />
              </main>
            </>)
          : (<Loading />)
      }
    </>
  )
}

export async function getServerSideProps() {
  const cocktails = await getAllCocktails()
  return {
    props: {
      cocktails
    }
  }
}
