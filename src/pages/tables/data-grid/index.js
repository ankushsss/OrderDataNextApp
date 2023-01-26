// ** MUI Imports
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

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

export async function getStaticProps() {
  const res = await axios.post("http://139.162.41.99/msfa-backend/public/api/order/list",
  {},{headers:{Authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzMxZTdmN2Q0ZjM0ZjY0ZDQ2MjJjY2VhNzlmYzMyNGE3OTljYzM3MGI1MGE1YTc5ZTYyZjA5NTUxNTRlNzUwM2QzNzEzMTc2ODg1ZjM2MzAiLCJpYXQiOjE2NzQ1NDkzNzQuMzM1MzU3LCJuYmYiOjE2NzQ1NDkzNzQuMzM1MzYxLCJleHAiOjE3MDYwODUzNzQuMzMyNjM0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.eb5dJSFuW8F5Gag0TLBVVecYq5TmjHyVXyGptSb27JW95mCqw_qpN0HTg-RaCdWu98Enk_-UWjlzUYIYuWGXL42uG1u2YfWTgbctFv1CtARHsdHpQVlvK7gGN_TOkCg46Awtrfwnh8kERP-hoE4taVKZUenGXOR3kLa_b_b4JUGlfspfgBhj3iaAuZxLeFuP5LLg5wbrJUTwLP6A1Lr0iDpadJYGl8eZjfcEruPt3-07bCYG2fjNuBF5OAxD1lU4Rll-AvWay4viJ7_QUKIOExdFNkrayddpnA8ycaE83zfNr1h81_B8qbuTFvVnIk1mmdWHjLwIJ54SZRU0WTYLUk6gOQoP7jfOEy1Sz9CHY24mkaLl-cPvYBxDfGInmb-vCUM4NMBV2LEh0uY0ReZN34bch-yTgvczXX6Icz-I5E4e8v5QKVeYPjAj4oijSUzc-iFzPXxqS4hMdawEqOcUNcTek-VyBNTfPOCh_ueXxh8Je99XefaEIcEYBMAEZuo8UMdGT_tK3Kopb8qsQMqeURrmLS-UywPrHaf30ucagJybuLliOceuVLsBTGYWG0O8VBNtNZiQDt2OVI05M7K1aQzIBtCDOFrnvkJQyK1KhK3sezV-16S9jK9RjE1wcFOsZ5weOwO53z4sew_dE839OnvDXE2F4Eo451loPCwafgw"} })
  
    let newArray = []
    console.log(res.data.data[0],"res")
    res.data.data.map((data,index)=>{
      let dataObject = {
        id:index,
        order_number:data.order_number,
        order_date:data.order_date,
        salesman:data.salesman.firstname,
        customer:data.customer.firstname,
        approval_status:data.approval_status,
        grand_total:`AED${data.grand_total}`
      } 
     newArray.push(dataObject)
    })
    console.log(newArray,"new")
 
  return {
    props: {
      data:newArray
    },
    revalidate: 2,
  };
}

const DataGrid = (props) => {

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
        <TableFilter data={props.data}/>
      </Grid>
      
      
    </Grid>
  )
}

export default DataGrid
