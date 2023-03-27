import { useState, forwardRef, SyntheticEvent, ForwardedRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { InvoiceClientType } from 'src/types/apps/invoiceTypes'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'

interface PickerProps {
    label?: string
}

interface Props {
    toggleAddCustomerDrawer: () => void
    studentValues: Function
    collegeValues: Function
    coachingValues: Function
    paymentValues: Function
    installmentPartPaymentNoValues: Function
    fullRollNumber: any
    arrayForInstallmentdetails: any
}



const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
    borderBottom: 0,
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingTop: `${theme.spacing(1)} !important`,
    paddingBottom: `${theme.spacing(1)} !important`
}))


const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
    paddingRight: 0,
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '& .col-title': {
        top: '-1.85rem',
        position: 'absolute',
        color: theme.palette.text.secondary
    },
    [theme.breakpoints.down('lg')]: {
        '& .col-title': {
            top: '0',
            position: 'relative'
        }
    }
}))








const StudentReviewPage = (props: Props) => {
    // ** Props
    const { toggleAddCustomerDrawer, studentValues, collegeValues, coachingValues, paymentValues, installmentPartPaymentNoValues, fullRollNumber, arrayForInstallmentdetails } = props



    // ** Effect
    useEffect(() => {
        console.log(studentValues())
        console.log(collegeValues())
        console.log(coachingValues())
        console.log(paymentValues())
        console.log(installmentPartPaymentNoValues())
    }, [studentValues, collegeValues, coachingValues, paymentValues, installmentPartPaymentNoValues])

    let count = 0;
    let installmentDetailsArray = []

    for (let singleObj of arrayForInstallmentdetails) {
        let obj: any = {}
        if (count == 0) {
            count++
            obj.installmentNumber = count;
            obj.paymentStatus = "payed";
            obj.paymetReceiveDate = singleObj.installmentReceivedDate
            obj.paymentNotes = singleObj.installmentPaymentDescription
            obj.receivedPayment = singleObj.installmentReceivedPayment
            installmentDetailsArray.push(obj)
        } else {
            count++
            obj.installmentNumber = count;
            obj.paymentStatus = "due"
            obj.nextpaymetDate = singleObj.installmentReceivedDate
            obj.paymentNotes = singleObj.installmentPaymentDescription
            obj.duePayment = singleObj.installmentReceivedPayment
            installmentDetailsArray.push(obj)
        }
    }

    // ** Hook
    const theme = useTheme()

    // ** Deletes form
    const deleteForm = (e: SyntheticEvent) => {
        e.preventDefault()

        // @ts-ignore
        e.target.closest('.repeater-wrapper').remove()
    }



    return (
        <Card>
            <CardContent>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
                    <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                                <svg width={22} height={32} viewBox='0 0 55 81' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        fill={theme.palette.primary.main}
                                        d='M30.1984 0.0144043C24.8945 0.425781 25.2534 6.16968 26.6435 7.65326C22.693 10.3649 13.1875 16.8867 6.76944 21.2803C1.21531 25.0824 -0.842975 34.6064 1.11159 40.8262C3.00952 46.8658 12.4904 51.3615 17.5337 52.7256C17.5337 52.7256 11.7188 56.0269 6.60358 60.0482C1.48831 64.0695 -0.622615 69.3436 3.06836 75.262C6.75933 81.1805 12.725 80.761 17.5257 78.6229C22.3264 76.4848 32.1683 69.1692 37.9402 65.1633C42.7282 61.5411 43.9669 53.6444 41.7631 46.9643C39.9758 41.5468 30.0969 36.4284 25.1792 34.6064C27.1946 33.1595 32.4935 29.4242 37.129 26.0909C38.7184 30.5636 43.9998 30.212 45.6103 27.8209C47.6216 23.4326 51.8339 13.4663 53.9579 8.55175C54.8862 4.81044 52.5639 2.78457 50.2227 2.35938C46.8672 1.75 38.3222 0.960115 30.1984 0.0144043Z'
                                    />
                                    <path
                                        fillOpacity='0.2'
                                        fill={theme.palette.common.white}
                                        d='M26.6523 7.65625C24.9492 5.625 25.3239 0.255308 30.2922 0.0105286C33.0074 0.326611 35.7804 0.62685 38.3907 0.909477C43.5904 1.47246 48.1446 1.96556 50.311 2.3748C52.7331 2.83234 54.886 5.06072 53.9543 8.61103C53.2063 10.3418 52.2075 12.6646 51.1482 15.1282C49.1995 19.6601 47.0459 24.6685 45.8717 27.3445C44.7224 29.964 39.111 31.0585 37.1137 26.0951C32.4782 29.4283 27.2884 33.1556 25.273 34.6026C24.931 34.4553 24.3074 34.2381 23.5124 33.9613C20.8691 33.0407 16.331 31.4602 13.9477 29.5966C9.61363 25.5918 11.6259 19.4662 13.1737 16.904C17.8273 13.7183 20.7417 11.7161 23.4984 9.82236C24.5437 9.10427 25.5662 8.40178 26.6523 7.65625Z'
                                    />
                                    <path
                                        fillOpacity='0.2'
                                        fill={theme.palette.common.white}
                                        d='M17.543 52.7266C21.2241 53.9875 28.5535 57.0509 30.091 59.101C32.0129 61.6635 33.1576 64.34 29.2527 71.2039C28.5954 71.6481 27.9821 72.0633 27.4069 72.4528C22.1953 75.9817 20.1085 77.3946 16.6243 79.0531C13.5855 80.2464 6.61575 81.7103 2.66559 74.5653C-1.11764 67.7222 3.23818 62.7113 6.5963 60.065L12.1695 56.0339L14.8359 54.3477L17.543 52.7266Z'
                                    />
                                </svg>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        ml: 2,
                                        lineHeight: 1,
                                        fontWeight: 700,
                                        letterSpacing: '-0.45px',
                                        fontSize: '1.75rem !important'
                                    }}
                                >
                                    Student Review Page
                                </Typography>
                            </Box>

                            <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Student Personal Details :</Typography>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Full Name   :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().firstName.toUpperCase()} {studentValues().lastName.toUpperCase()}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Email  :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().email}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Mobile Number :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().phoneNumber}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Father Name :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().fathersName.toUpperCase()}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Fathers Mobile Number :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().fathersPhoneNumber}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Date Of Birth :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{`${new Date(studentValues().dob).getDate()}`} / {`${new Date(studentValues().dob).getMonth() + 1}`} / {`${new Date(studentValues().dob).getFullYear()}`}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Address :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{studentValues().address.toUpperCase()}</MUITableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item xl={6} xs={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
                            <Box
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    mt: { sm: 0, xs: 2 },
                                    flexDirection: { sm: 'row', xs: 'column' },
                                    alignItems: { sm: 'center', xs: 'flex-start' }
                                }}
                            >
                                <Typography sx={{ mr: 3, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
                                    Date Issued:
                                </Typography>

                                <Typography sx={{ mr: 3, mb: { sm: 0, xs: 3 }, color: 'text.secondary', width: '100px' }}>
                                    {`${new Date().getDate()}`} / {`${new Date().getMonth() + 1}`} /  {`${new Date().getFullYear()}`}
                                </Typography>

                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </CardContent>

            <Divider
                sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
            />

            <CardContent>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
                    <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>College Details :</Typography>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>College  Name : </MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeName.toUpperCase()}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>College  Course :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeCourse.toUpperCase()}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>College  Semester :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().collegeSemester}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Department Name :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{collegeValues().departmentName.toUpperCase()}</MUITableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Coaching Details :</Typography>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Course Name  :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{coachingValues().courseName.toUpperCase()}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Course Duration :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{coachingValues().courseDuration.toUpperCase()}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Mode Of Class :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{coachingValues().modeOfClass.toUpperCase()}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Roll Number :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{fullRollNumber}</MUITableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>

            <Divider
                sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
            />

            <CardContent>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
                    <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Payment Details :</Typography>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Total Payment Amount:</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{paymentValues().totalPaymentAmount}</MUITableCell>
                                        </TableRow>
                                        <TableRow>
                                            <MUITableCell sx={{ pb: '0 !important' }}>Part Payment :</MUITableCell>
                                            <MUITableCell sx={{ pb: '0 !important' }}>{paymentValues().partPayment == false ? "false" : "true"}</MUITableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                    </Grid>
                </Grid>
            </CardContent>

            <Divider
                sx={{ mt: theme => `${theme.spacing(1.25)} !important`, mb: theme => `${theme.spacing(4)} !important` }}
            />


            <CardContent>
                <Grid container sx={{ p: { sm: 4, xs: 0 }, pb: '0 !important' }}>
                    <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 6 } }}>

                        {paymentValues().partPayment == false ? <>
                            <Typography sx={{ mb: 4, color: 'text.secondary', fontWeight: 500 }}>Payment Info :</Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Total Recieved Amount:</MUITableCell>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{paymentValues().totalPaymentAmount}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Payment Description :</MUITableCell>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{installmentPartPaymentNoValues().paymentDescription.toUpperCase()}</MUITableCell>
                                            </TableRow>
                                            <TableRow>
                                                <MUITableCell sx={{ pb: '0 !important' }}>Payment Date :</MUITableCell>
                                                <MUITableCell sx={{ pb: '0 !important' }}>{`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getDate()}`} / {`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getMonth() + 1}`} / {`${new Date(installmentPartPaymentNoValues().paymentReceivedDate).getFullYear()}`}</MUITableCell>
                                            </TableRow