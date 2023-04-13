import Loading from '@/components/Loading'
import PageLayout from '@/components/PageLayout'
import Pagination from '@/components/Pagination'
import SearchAdd from '@/components/SearchAdd'
import Table from '@/components/Table'
import ModalAdd from '@/components/modal'
import { getAllCocktails } from '@/services/cocktailsActions'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/* eslint-disable space-before-function-paren */
export default function Bebidas({ cocktails }) {
  const [loaded, setLoaded] = useState(false)
  const [openModal, setOpenModal] = useState({ action: 'add', state: false, product: '' })
  const [dataFiltered, setDataFiltered] = useState(cocktails)
  const [searching, setSearching] = useState(false)
  const [copyData, setCopyData] = useState()
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

  const search = async ({ target }) => {
    if (!searching) {
      setCopyData(dataFiltered)
      setSearching(true)
    }
    if (target.value === '') {
      setDataFiltered(copyData)
      return
    }
    const filter = dataFiltered.filter(cocktail => cocktail.name.toLowerCase().includes(target.value.toLowerCase()))
    setDataFiltered(filter)
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
                    <SearchAdd search={search} setOpenModal={setOpenModal} openModal={openModal} />
                    <Table dataFiltered={dataFiltered} currentPage={currentPage} setOpenModal={setOpenModal} />
                    <Pagination dataFilteredLength={dataFiltered.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                  </div>
                </section>
                <ModalAdd setDataFiltered={setDataFiltered} open={openModal} setOpen={setOpenModal} page='bebidas' />
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
