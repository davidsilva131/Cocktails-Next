import PageLayout from '@/components/PageLayout'
import SellingTable from '@/components/SellingTable'
import SellingsModal from '@/components/SellingsModal'
import { getAllCocktails } from '@/services/cocktailsActions'
import { getInventory } from '@/services/inventoryActions'
import { getAllSellings } from '@/services/sellingsActions'
import { useState } from 'react'

export default function Ventas ({ sellings, allData }) {
  const [sellingsData, setSellingsData] = useState(sellings)
  const [data] = useState(allData)
  return (
    <>
      <PageLayout title='Ventas' />
      <SellingsModal data={data} />
      <SellingTable data={sellingsData} setData={setSellingsData} />
    </>
  )
}

export async function getServerSideProps () {
  const sellings = await getAllSellings()
  const cocktailsData = await getAllCocktails()
  const inventoryData = await getInventory()
  const allData = [...cocktailsData, ...inventoryData]
  return {
    props: {
      sellings,
      allData
    }
  }
}
