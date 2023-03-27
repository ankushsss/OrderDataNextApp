// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import TableBasic from 'src/views/table/data-grid/TableBasic'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import TableColumns from 'src/views/table/data-grid/TableColumns'
import TableEditable from 'src/views/table/data-grid/TableEditable'
import TableBasicSort from 'src/views/table/data-grid/TableBasicSort'
import TableSelection from 'src/views/table/data-grid/TableSelection'
import TableServerSide from 'src/views/table/data-grid/TableServerSide'
import axios from 'axios'

// export async function getStaticProps() {
//   const res = await axios.post("https://osa-efris.harissint.com/index.php/api/invoice_list",
//   {
//     "start_date" : "2023-02-01",
//     "end_date" : "2023-05-01",
//     "start" : "1",
//     "limit" : "7"
//   },{headers:{
//     "Content-Type":"application/json"
//   }})

//   return {
//     props: {
//       data:res.data.Result
//     },
//     revalidate: 2,
//   };
// }

const DataGrid = () => {
  const [inventoryData, setInventoryData] = useState([])
  async function callInventoryData() {
    const res = await axios.post(
      'https://osa-efris.harissint.com/index.php/api/invoice_list',
      {
        start_date: '2023-02-01',
        end_date: '2023-05-01',
        start: '1',
        limit: '7'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setInventoryData(res.data.Result)
    console.log(res.data.Result, 'res')
  }
  useEffect(() => {
    callInventoryData()
  }, [])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <MuiLink href='https://mui.com/x/react-data-grid/' target='_blank'>
              Data Grid
            </MuiLink>
          </Typography>
        }
        subtitle={
          <Typography variant='body2'>
            Data Grid is a fast and extendable react data table and react data grid.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <TableFilter inventoryData={inventoryData} />
      </Grid>
    </Grid>
  )
}

export default DataGrid
