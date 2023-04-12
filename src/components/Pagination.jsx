const Pagination = ({ dataFilteredLength, setCurrentPage, currentPage }) => {
  const pagesCount = Math.ceil(dataFilteredLength / 5)
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
    <nav className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4' aria-label='Table navigation'>
      <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
        Mostrando
        <span className='font-semibold text-gray-900'> 1-5 </span>
        de
        <span className='font-semibold text-gray-900'> {dataFilteredLength} </span>
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
  )
}

export default Pagination
