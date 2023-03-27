// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'
import Dialog from '@mui/material/Dialog'
import Preview from 'src/views/apps/invoice/preview/Preview'

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Select from '@mui/material/Select'
import { useDemoData } from '@mui/x-data-grid-generator'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteInvoice } from 'src/store/apps/invoice'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import axios from 'axios'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Button } from '@mui/material'

// ** Styled components
const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '1rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const invoiceStatusObj = {
  Paid: { color: 'success', icon: 'bx:pie-chart-alt' },
  Sent: { color: 'secondary', icon: 'bx:paper-plane' },
  Downloaded: { color: 'info', icon: 'bx:down-arrow-circle' },
  Draft: { color: 'primary', icon: 'bxs:save' },
  'Past Due': { color: 'error', icon: 'bx:info-circle' },
  'Partial Payment': { color: 'warning', icon: 'bx:adjust' }
}

// ** renders client column
const renderClient = row => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor || 'primary'}
      sx={{ mr: 3, width: 30, height: 30, fontSize: '.8rem', lineHeight: 1.5 }}
    >
      {getInitials(row.name || 'John Doe')}
    </CustomAvatar>
  )
}
/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

/* eslint-enable */
const InvoiceList = () => {
  // ** State
  const [dates, setDates] = useState([])
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [statusValue, setStatusValue] = useState('')
  const [endDateRange, setEndDateRange] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])
  const [startDateRange, setStartDateRange] = useState(null)
  const [inventoryData, setInventoryData] = useState([])

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 5
  })
  const [open, setOpen] = useState(false)

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 100,
    page: 0,
    pageSize: 7
  })
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  async function callInventoryData(start, limit) {
    setPageState({ ...pageState, isLoading: true })

    const res = await axios.post(
      'https://osa-efris.harissint.com/index.php/api/invoice_list',
      {
        start_date: startDateRange,
        end_date: endDateRange,
        start: start + 1,
        limit: limit
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    setInventoryData(res.data.Result)
    setPageState({ ...pageState, isLoading: false, data: res.data.Result, total: res.data.totalCount })
  }
  useEffect(() => {
    callInventoryData(pageState.page, pageState.pageSize)
  }, [pageState.page, endDateRange, startDateRange])

  // ** Hooks

  const handleFilter = val => {
    console.log(val, 'val')
    setValue(val)
    if (val == '') {
      callInventoryData()
    } else {
      setInventoryData(
        inventoryData.filter(filterData => {
          return filterData.depot_name.toLowerCase().includes(val)
        })
      )

      setPageState({
        ...pageState,
        data: inventoryData.filter(filterData => {
          return filterData.depot_name.toLowerCase().includes(val)
        })
      })
    }
  }

  const handleStatusValue = e => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }

    console.log(start, end)
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6
  })

  const columns = [
    {
      flex: 0.275,
      minWidth: 80,
      field: 'invoiceNo',
      headerName: 'invoiceNo',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
      field: 'depot_name',
      headerName: 'depot_name',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
    },
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Preview'>
            <IconButton size='small' onClick={handleClickOpen}>
              <Icon icon='bx:show' fontSize={20} />
            </IconButton>
          </Tooltip>
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            iconButtonProps={{ size: 'small' }}
            options={[{ text: 'Download' }, { text: 'Edit', href: `/invoice/edit/${row.id}` }, { text: 'Duplicate' }]}
          />
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='invoice-status-select'>Invoice Status</InputLabel>

                    <TextField
                      fullWidth
                      value={value}
                      sx={{ mr: 4, mb: 2 }}
                      label='Invoice Status'
                      onChange={e => handleFilter(e.target.value)}
                      labelId='invoice-status-select'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Invoice Date'
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <DataGrid
              autoHeight
              rows={pageState.data}
              rowCount={pageState.total}
              loading={pageState.isLoading}
              columns={columns}
              rowsPerPageOptions={[7]}
              pagination
              page={pageState.page}
              pageSize={pageState.pageSize}
              paginationMode='server'
              onPageChange={newPage => setPageState(old => ({ ...old, page: newPage }))}
              onPageSizeChange={newPageSize => setPageState(oldPage => ({ ...old, pageSize: newPageSize }))}
            />
          </Card>
        </Grid>
        <Dialog fullScreen onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open}>
          <DialogTitle id='full-screen-dialog-title'>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{ top: 8, right: 10, position: 'absolute', color: 'grey.500' }}
            >
              <Icon icon='bx:x' />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ '& + .MuiDialogActions-root': { p: theme => `${theme.spacing(3)} !important` } }}>
            <Preview id='123' />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </DatePickerWrapper>
  )
}

export default InvoiceList
