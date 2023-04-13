import PageLayout from '@/components/PageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getInventory } from '@/services/inventoryActions'
import ModalAdd from '@/components/modal'
import SearchAdd from '@/components/SearchAdd'
import Loading from '@/components/Loading'
import TableInventory from '@/components/TableInventory'
import Pagination from '@/components/Pagination'

/* eslint-disable space-before-function-paren */
export default function Inventory({ inventory }) {
  const [loaded, setLoaded] = useState(false)
  const [openModal, setOpenModal] = useState({ action: 'add', state: false, product: '' })
  const [dataFiltered, setDataFiltered] = useState(inventory)
  const [currentPage, setCurrentPage] = useState({
    page: 1,
    start: 0,
    end: 5
  })
  const [copyData] = useState([...dataFiltered])

  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/')
    } else setLoaded(true)
  }, [])

  const search = async ({ target }) => {
    if (target.value === '') {
      setDataFiltered(copyData)
      return
    }
    const filter = copyData.filter(cocktail => cocktail.name.toLowerCase().includes(target.value.toLowerCase()))
    setDataFiltered(filter)
  }

  return (
    <>
      {
        loaded
          ? (
            <>
              <PageLayout title='Inventario' />
              <main className='w-full flex flex-col'>
                <section className='bg-gray-50  p-3 sm:p-5'>
                  <div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
                    <SearchAdd search={search} setOpenModal={setOpenModal} openModal={openModal} />
                    <TableInventory dataFiltered={dataFiltered} currentPage={currentPage} setOpenModal={setOpenModal} />
                    <Pagination dataFilteredLength={dataFiltered.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                  </div>
                </section>
                <ModalAdd setDataFiltered={setDataFiltered} open={openModal} setOpen={setOpenModal} page='inventario' />
              </main>
            </>)
          : (<Loading />)
      }
    </>
  )
}

export async function getServerSideProps() {
  const inventory = await getInventory()
  return {
    props: {
      inventory
    }
  }
}
