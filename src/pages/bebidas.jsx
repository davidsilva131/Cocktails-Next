import Loading from '@/components/Loading'
import PageLayout from '@/components/PageLayout'
import Pagination from '@/components/Pagination'
import SearchAdd from '@/components/SearchAdd'
import Table from '@/components/Table'
import ModalAdd from '@/components/modal'
import { getAllCocktails } from '@/services/cocktailsActions'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Bebidas ({ cocktails }) {
  const [loaded, setLoaded] = useState(false)
  const [openModal, setOpenModal] = useState({
    action: 'add',
    state: false,
    product: ''
  })
  const [dataFiltered, setDataFiltered] = useState(cocktails)
  const [copyData] = useState([...dataFiltered])
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
    if (target.value === '') {
      setDataFiltered(copyData)
      return
    }
    const filter = copyData.filter(cocktail =>
      cocktail.name.toLowerCase().includes(target.value.toLowerCase())
    )
    setDataFiltered(filter)
  }
  return (
    <>
      {loaded
        ? (
          <>
            <PageLayout title='Bebidas' />
            <main className='w-full h-full pt-20 z-0 flex flex-col'>
              <section className='bg-gray-50 h-full p-3 sm:p-5'>
                <div className='mx-auto max-w-screen-xl px-4 lg:px-12'>
                  <SearchAdd
                    search={search}
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                  />
                  <Table
                    dataFiltered={dataFiltered}
                    currentPage={currentPage}
                    setOpenModal={setOpenModal}
                  />
                  <Pagination
                    dataFilteredLength={dataFiltered.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </div>
              </section>
              <ModalAdd
                setDataFiltered={setDataFiltered}
                open={openModal}
                setOpen={setOpenModal}
                page='bebidas'
              />
            </main>
          </>
          )
        : (
          <Loading />
          )}
    </>
  )
}

export async function getServerSideProps () {
  const cocktails = await getAllCocktails()
  return {
    props: {
      cocktails
    }
  }
}
