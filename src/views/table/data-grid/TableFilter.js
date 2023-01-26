// ** React Imports
import { useState, forwardRef,  useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'
import { TransitionProps } from '@mui/material/transitions';
import { ShoppingCartOutlined } from '@mui/icons-material'
import { display } from '@mui/system'
import axios from 'axios'


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.full_name ? row.full_name : row.order_number)}
      </CustomAvatar>
    )
}

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const orders = [
  {
    orderName:"SEA SHORE RESTAURANT LLC",
    orderId:"FSH04O1000379",
    orderAmount:"AED189.00",
    orderDate:"14 Apr 2023"
  },
  {
    orderName:"RESTAURANT LLC",
    orderId:"eSH04O1000379",
    orderAmount:"AED189.00",
    orderDate:"15 Apr 2023"
  },
  {
    orderName:"SHORE RESTAURANT LLC",
    orderId:"jSH04O1000379",
    orderAmount:"AED189.00",
    orderDate:"16 Apr 2023"
  },
  {
    orderName:" LLC",
    orderId:"kSH04O1000379",
    orderAmount:"AED189.00",
    orderDate:"16 Apr 2023"
  }
]

const columns = [
  {
    flex: 0.275,
    minWidth: 290,
    field: 'order_number',
    headerName: 'order_number',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.order_number}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'order_date',
    field: 'order_date',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.order_date}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'Salesman Name',
    headerName: ' salesman',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.salesman}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'age',
    minWidth: 80,
    headerName: 'Customer Name',
    field:"customer",
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
      {params.row.customer}
        
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'age',
    minWidth: 80,
    headerName: 'Amount',
    field:"grand_total",
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
      {params.row.grand_total}
        
      </Typography>
    )
  },
  {
    flex: 0.125,
    minWidth: 80,
    headerName: 'Status',
    field:"approval_status",
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
      {params.row.approval_status}
        
      </Typography>
    )
  }
 
]

const TableColumns = (props) => {
  // ** States
  // console.log(props,"pp")
  const [data] = useState(rows)
  const [pageSize, setPageSize] = useState(7)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState(props.data?props.data:[])

  const [singleOrder,setSingleOrder] = useState({})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = orderData.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  useEffect(() => {
    console.log("hii")
  axios.post("http://139.162.41.99/msfa-backend/public/api/order/list",
  {},{headers:{Authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzMxZTdmN2Q0ZjM0ZjY0ZDQ2MjJjY2VhNzlmYzMyNGE3OTljYzM3MGI1MGE1YTc5ZTYyZjA5NTUxNTRlNzUwM2QzNzEzMTc2ODg1ZjM2MzAiLCJpYXQiOjE2NzQ1NDkzNzQuMzM1MzU3LCJuYmYiOjE2NzQ1NDkzNzQuMzM1MzYxLCJleHAiOjE3MDYwODUzNzQuMzMyNjM0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.eb5dJSFuW8F5Gag0TLBVVecYq5TmjHyVXyGptSb27JW95mCqw_qpN0HTg-RaCdWu98Enk_-UWjlzUYIYuWGXL42uG1u2YfWTgbctFv1CtARHsdHpQVlvK7gGN_TOkCg46Awtrfwnh8kERP-hoE4taVKZUenGXOR3kLa_b_b4JUGlfspfgBhj3iaAuZxLeFuP5LLg5wbrJUTwLP6A1Lr0iDpadJYGl8eZjfcEruPt3-07bCYG2fjNuBF5OAxD1lU4Rll-AvWay4viJ7_QUKIOExdFNkrayddpnA8ycaE83zfNr1h81_B8qbuTFvVnIk1mmdWHjLwIJ54SZRU0WTYLUk6gOQoP7jfOEy1Sz9CHY24mkaLl-cPvYBxDfGInmb-vCUM4NMBV2LEh0uY0ReZN34bch-yTgvczXX6Icz-I5E4e8v5QKVeYPjAj4oijSUzc-iFzPXxqS4hMdawEqOcUNcTek-VyBNTfPOCh_ueXxh8Je99XefaEIcEYBMAEZuo8UMdGT_tK3Kopb8qsQMqeURrmLS-UywPrHaf30ucagJybuLliOceuVLsBTGYWG0O8VBNtNZiQDt2OVI05M7K1aQzIBtCDOFrnvkJQyK1KhK3sezV-16S9jK9RjE1wcFOsZ5weOwO53z4sew_dE839OnvDXE2F4Eo451loPCwafgw"} })
  .then((res)=>{
    let newArray = []
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
    setSingleOrder(newArray[0])
    setOrderData(newArray)

  })
  }, [])

  return (
    <Card>
      <CardHeader title='Quick Filter' />
      <DataGrid
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        components={{ Toolbar: QuickSearchToolbar }}
        rows={filteredData.length ? filteredData : orderData}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        onRowClick={(value, arr) => setOpen(true)}
        componentsProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value)
          }
        }}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', background: "white", color: "black" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Orders
            </Typography>

          </Toolbar>
        </AppBar>
        <Typography style={{display:"flex"}}>
          <Typography style={{borderRight:"1px solid silver",width:"350px",position:"absolute",height:"100%"}}>
          <List>
            {
              orderData.map((order,index)=>{
                return(
                  <div key={index}>
                  <ListItem style={{cursor:"pointer"}} onClick={()=>setSingleOrder(order)}>
                    <ListItemText  style={{width:"60%"}}>
                           <div style={{fontSize:"12px",fontWeight:"700"}}>{order.customer}</div><div style={{fontSize:"12px",color:"blue"}}>{order.order_number}</div>
                    </ListItemText>
                    <ListItemText  style={{width:"40%",textAlign:"center"}}>
                           <div style={{fontSize:"12px"}}>{order.grand_total}</div><div  style={{fontSize:"11px",color:"blue",margin:"0 auto"}}> {order.order_date}</div>
                    </ListItemText>
                  </ListItem>
                  <Divider />
               </div>
                )
              })
            }
            </List>
          </Typography>
          <Typography style={{width:"calc(100% - 350px)",marginLeft:"350px"}}>
                  <Typography style={{display:"flex",alignItems:"center",padding:"20px",fontSize:"22px",borderBottom:"1px solid silver"}}>
                        <ShoppingCartOutlined/>#{singleOrder.order_number}
                  </Typography>
          </Typography>
        </Typography>
      </Dialog>
    </Card>
  )
}

export default TableColumns
