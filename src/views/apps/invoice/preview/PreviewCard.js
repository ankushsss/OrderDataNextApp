// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(2)} !important`
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const PreviewCard = ({ data }) => {
  // ** Hook
  const theme = useTheme()

  const value = {
    nvoiceNo: '064517583',
    id: 2737544,
    invoice_date: '2023-02-01',
    invoice_time: '07:42 am',
    invoice_type: '3',
    invoice_code: 'S',
    total_amount: 250000,
    created_date: '2023-02-01 07:42:10',
    sap_id: '',
    customername: 'Tusiime Sharon Wholesale ',
    ccode: 'AC00151864',
    salesmanname1: 'William',
    routename: 'W0088',
    depot_name: 'Jackov And Sons Agencies Ltd - Masindi',
    depot_code: 'DP0142'
  }

  return (
    <Card>
      <CardContent>
        <Grid container sx={{ p: { sm: 4, xs: 0 } }}>
          <Grid item sm={6} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: { sm: 0, xs: 6 } }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <img src='https://osa.harissint.com/images/img.jpg' width='100px' height='100px' />
              </Box>
              <div>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>{value.depot_name}</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Table sx={{ maxWidth: '200px' }}>
                <TableBody>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='h5'>Invoice</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='h5'>{data.invoiceNo}</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography sx={{ color: 'text.secondary' }}>Date Issued:</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{data.invoice_date}</Typography>
                    </MUITableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ my: '0 !important' }} />

      <CardContent>
        <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: theme => `${theme.spacing(1)} !important` }}>
          <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 5 } }}>
            <Typography sx={{ mb: 4, fontWeight: 500 }}>Invoice To:</Typography>
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{data.customername}</Typography>
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{data.ccode}</Typography>
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{data.depot_name}</Typography>
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{data.depot_code}</Typography>
            <Typography sx={{ mb: 1, color: 'text.secondary' }}>{data.routename}</Typography>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              display: 'flex',
              px: { sm: 4, xs: 0 },
              justifyContent: ['flex-start', 'flex-end']
            }}
          >
            <div>
              <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Bill To:</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Total Due:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{data.total_amount}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Invoice Code:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>{data.invoice_code}</MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell sx={{ pb: '0 !important' }}>Country:</MUITableCell>
                      <MUITableCell sx={{ pb: '0 !important' }}>India</MUITableCell>
                    </TableRow>

                    <TableRow>
                      <MUITableCell>SWIFT code:</MUITableCell>
                      <MUITableCell>11200</MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ mb: '0 !important' }} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ py: 2 }}>item_name</TableCell>
              <TableCell sx={{ py: 2 }}>qty</TableCell>
              <TableCell sx={{ py: 2 }}>item_total</TableCell>
              <TableCell sx={{ py: 2 }}>net_total</TableCell>
              <TableCell sx={{ py: 2 }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Details.map(details => {
              return (
                <>
                  <TableRow>
                    <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>{details.item_name}</TableCell>
                    <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>{details.quantity}</TableCell>
                    <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>{details.itemvalue}</TableCell>
                    <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>{details.net_total}</TableCell>
                    <TableCell sx={{ py: theme => `${theme.spacing(2.75)} !important` }}>
                      {details.item_total}
                    </TableCell>
                  </TableRow>
                </>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <CardContent>
        <Grid container sx={{ pt: 6, pb: 4 }}>
          <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
            <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.secondary' }}>Customer Name:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{data.customername}</Typography>
            </Box>

            <Typography sx={{ color: 'text.secondary' }}>Thanks for your business</Typography>
          </Grid>
        </Grid>
      </CardContent>

      <Divider
        sx={{ mt: theme => `${theme.spacing(2)} !important`, mb: theme => `${theme.spacing(0.5)} !important` }}
      />

      <CardContent>
        <Typography sx={{ color: 'text.secondary' }}>
          <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind for
          future freelance projects. Thank You!
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PreviewCard
