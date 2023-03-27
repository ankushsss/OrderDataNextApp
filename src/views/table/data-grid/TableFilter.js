// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'
import { TransitionProps } from '@mui/material/transitions'
import { ShoppingCartOutlined } from '@mui/icons-material'
import { display } from '@mui/system'
import axios from 'axios'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  return (
    <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
      {getInitials(row.invoice_type ? row.depot_name : row.depot_name)}
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
    orderName: 'SEA SHORE RESTAURANT LLC',
    orderId: 'FSH04O1000379',
    orderAmount: 'AED189.00',
    orderDate: '14 Apr 2023'
  },
  {
    orderName: 'RESTAURANT LLC',
    orderId: 'eSH04O1000379',
    orderAmount: 'AED189.00',
    orderDate: '15 Apr 2023'
  },
  {
    orderName: 'SHORE RESTAURANT LLC',
    orderId: 'jSH04O1000379',
    orderAmount: 'AED189.00',
    orderDate: '16 Apr 2023'
  },
  {
    orderName: ' LLC',
    orderId: 'kSH04O1000379',
    orderAmount: 'AED189.00',
    orderDate: '16 Apr 2023'
  }
]

const columns = [
  {
    flex: 0.275,
    minWidth: 290,
    field: 'invoiceNo',
    headerName: 'invoiceNo',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.invoiceNo}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.275,
    minWidth: 290,
    field: 'depot_name',
    headerName: 'depot_name',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.depot_name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: 'invoice_date',
    field: 'invoice_date',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.invoice_date}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'invoice_time',
    headerName: ' invoice_time',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.invoice_time}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'age',
    minWidth: 80,
    headerName: 'invoice_code',
    field: 'invoice_code',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.invoice_code}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'age',
    minWidth: 80,
    headerName: 'total_amount',
    field: 'total_amount',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.total_amount}
      </Typography>
    )
  }
]

const TableColumns = ({ inventoryData }) => {
  // ** States
  // console.log(props,"pp")
  const [data] = useState(rows)
  const [pageSize, setPageSize] = useState(6)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [open, setOpen] = useState(false)

  // const [orderData, setOrderData] = useState(props.data?props.data:[])

  const [singleOrder, setSingleOrder] = useState({})

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = inventoryData.filter(row => {
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
  function CustomPagination() {
    const apiRef = useGridApiContext()

    // const { state, apiRef } = useGridSlotComponentProps();
    const classes = useStyles()

    return (
      // eslint-disable-next-line react/jsx-no-undef
      <Pagination
        className={classes.root}
        color='primary'
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    )
  }

  return (
    <Card>
      <CardHeader title='Quick Filter' />
      <DataGrid
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 }
          }
        }}
        columns={columns}
        hideFooterPagination={true}
        onPageChange={() => console.log('data')}
        components={{ Toolbar: QuickSearchToolbar, Pagination: CustomPagination }}
        rows={filteredData.length ? filteredData : inventoryData}
        onPageSizeChange={newPageSize => {
          setPageSize(newPageSize)
          console.log('hiiii')
        }}
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
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', background: 'white', color: 'black' }}>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Orders
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography style={{ display: 'flex' }}>
          <Typography style={{ borderRight: '1px solid silver', width: '350px', position: 'absolute', height: '100%' }}>
            <List>
              {console.log(inventoryData, 'inventoryData')}
              {inventoryData.map((order, index) => {
                return (
                  <div key={index}>
                    <ListItem style={{ cursor: 'pointer' }} onClick={() => setSingleOrder(order)}>
                      <ListItemText style={{ width: '60%' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700' }}>{order.customer}</div>
                        <div style={{ fontSize: '12px', color: 'blue' }}>{order.order_number}</div>
                      </ListItemText>
                      <ListItemText style={{ width: '40%', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px' }}>{order.grand_total}</div>
                        <div style={{ fontSize: '11px', color: 'blue', margin: '0 auto' }}> {order.order_date}</div>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                  </div>
                )
              })}
            </List>
          </Typography>
          <Typography style={{ width: 'calc(100% - 350px)', marginLeft: '350px' }}>
            <Typography
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                fontSize: '22px',
                borderBottom: '1px solid silver'
              }}
            >
              <ShoppingCartOutlined />#{singleOrder.order_number}
            </Typography>
          </Typography>
        </Typography>
      </Dialog>
    </Card>
  )
}

export default TableColumns
