// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PreviewActions = ({ id, toggleSendInvoiceDrawer, toggleAddPaymentDrawer }) => {
  return (
    <Card>
      <CardContent>
        <Button
          fullWidth
          sx={{ mb: 4 }}
          variant='contained'
          onClick={toggleSendInvoiceDrawer}
          startIcon={<Icon icon='bx:paper-plane' />}
        >
          Download
        </Button>
        <Button
          fullWidth
          sx={{ mb: 4 }}
          target='_blank'
          component={Link}
          color='secondary'
          variant='outlined'
          href={`/`}
        >
          Print
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
