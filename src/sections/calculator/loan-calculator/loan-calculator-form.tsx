import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useResponsive } from 'src/hooks/use-responsive';

import {
  _tags,
  PRODUCT_GENDER_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFMultiCheckbox,
} from 'src/components/hook-form';

import ChartSemi from '../../_examples/extra/chart-view/chart-semi';
import { IFormBMI } from 'src/types/bmi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { fCurrency, formant } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  currentData?: IFormBMI;
};

export default function LoanCalculatorForm({ currentData }: Props) {
  const [result, setResult] = useState<any>({
    amortizationSchedule: [],
    annualInterestRate: 4,
    loanAmount: 1000000000,
    monthlyPayment: 85149904.195556,
    numberOfInstallments: 12,
    totalInterest: 21798850.346672058,
    totalPayment: 1021798850.346672,
  });

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    amount: Yup.number().required('amount is required'),
    installments: Yup.number().required('installments is required'),
    rate: Yup.number().required('rate is required'),
  });

  const defaultValues = useMemo(
    () => ({
      amount: 1000000000,
      installments: 12,
      rate: 4
    }),
    [currentData]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentData) {
      reset(defaultValues);
    }
  }, [currentData, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {

      const loanExample = calculateLoan(values.amount, values.installments, values.rate);

      setResult(loanExample);

    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => { onSubmit() }, [])

  function calculateLoan(loanAmount: number, numberOfInstallments: number, annualInterestRate: number, startDate = new Date()) {
    // Convert annual interest rate to monthly rate (decimal)
    const monthlyInterestRate = annualInterestRate / 100 / 12;

    // Calculate monthly payment using the formula: P = L[i(1+i)^n]/[(1+i)^n-1]
    // Where P = payment, L = loan amount, i = monthly interest rate, n = number of payments
    const monthlyPayment = loanAmount *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfInstallments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfInstallments) - 1);

    // Calculate total payment over the life of the loan
    const totalPayment = monthlyPayment * numberOfInstallments;

    // Calculate total interest paid
    const totalInterest = totalPayment - loanAmount;

    // Generate amortization schedule
    const amortizationSchedule = [];
    let remainingBalance = loanAmount;
    let currentDate = new Date(startDate);

    for (let i = 1; i <= numberOfInstallments; i++) {
      // Calculate interest for this period
      const interestPayment = remainingBalance * monthlyInterestRate;

      // Calculate principal for this period
      const principalPayment = monthlyPayment - interestPayment;

      // Update remaining balance
      remainingBalance -= principalPayment;

      // Advance to next month
      currentDate.setMonth(currentDate.getMonth() + 1);

      // Add this payment to the schedule
      amortizationSchedule.push({
        paymentNumber: i,
        paymentDate: new Date(currentDate),
        monthlyPayment: monthlyPayment,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        remainingBalance: Math.max(0, remainingBalance) // Ensure we don't go below zero due to rounding
      });
    }

    return {
      loanAmount,
      numberOfInstallments,
      annualInterestRate,
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortizationSchedule
    };
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  function formatDate(date: any) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }

  const renderProperties = (
    <>

      <Grid xs={12}>
        <Card>
          <CardHeader title="Loan Calculator" />

          <Stack spacing={3} sx={{ p: 3 }}>

            <RHFTextField
              name="amount"
              label="loan amount"
              placeholder="0"
              type="number"
              helperText={formant(values.amount)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      $
                    </Box>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />

            <RHFTextField
              name="installments"
              label="number of installments"
              placeholder="0"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      Cm
                    </Box>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />

            <RHFTextField
              name="rate"
              label="return rate"
              placeholder="0"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      Cm
                    </Box>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />

            <LoadingButton type="submit" variant="contained" size="medium" sx={{ width: 'fit-content' }} loading={isSubmitting}>
              Calculate
            </LoadingButton>

          </Stack>
        </Card>
      </Grid>

      <Grid xs={12}>
        <Card>
        <CardHeader title="Result" color='#1c9035' />
          <Stack spacing={1} p={3}>
            <Box display={'flex'} gap={1}>
              <Typography variant='h6'>Loan Amount:</Typography>
              <Typography variant='h6' color={'teal'}>{fCurrency(result.loanAmount)}</Typography>
            </Box>
            <Box display={'flex'} gap={1}>
              <Typography variant='h6'>Number of Installments:</Typography>
              <Typography variant='h6' color={'teal'}>{result.numberOfInstallments} months</Typography>
            </Box>
            <Box display={'flex'} gap={1}>
              <Typography variant='h6'>Annual Interest Rate:</Typography>
              <Typography variant='h6' color={'teal'}>{result.annualInterestRate + '%'}</Typography>
            </Box>
            <Box display={'flex'} gap={1}>
              <Typography variant='h6'>Monthly Payment:</Typography>
              <Typography variant='h6' color={'teal'}>{fCurrency(result.monthlyPayment)}</Typography>
            </Box>
            <Box display={'flex'} gap={1}>
              <Typography variant='h6'>Total Payment:</Typography>
              <Typography variant='h6' color={'teal'}>{fCurrency(result.totalPayment)}</Typography>
            </Box>
            <Box display={'flex'} gap={1}>
              <Typography variant='h6'>Total Interest:</Typography>
              <Typography variant='h6' color={'teal'}>{fCurrency(result.totalInterest)}</Typography>
            </Box>
          </Stack>
        </Card>
      </Grid>

      <Grid xs={12}>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.amortizationSchedule.map((item: any, index: number) => (
                  <TableRow>
                    <TableCell>{item.paymentNumber}</TableCell>
                    <TableCell>{formatDate(item.paymentDate)}</TableCell>
                    <TableCell>{fCurrency(item.monthlyPayment)}</TableCell>
                    <TableCell>{fCurrency(item.principalPayment)}</TableCell>
                    <TableCell>{fCurrency(item.interestPayment)}</TableCell>
                    <TableCell>{fCurrency(item.remainingBalance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderProperties}
      </Grid>
    </FormProvider>
  );
}
