import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import Scrollbar from 'src/components/scrollbar';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

type Props = {
  currentData?: any;
};

interface PeriodResult {
  periodStart: Date;
  periodEnd: Date;
  ovulationStart: Date;
  ovulationEnd: Date;
}

export default function SavingForm({ currentData }: Props) {
  const [results, setResults] = useState<PeriodResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const SavingSchema = Yup.object().shape({
    deposit: Yup.number().required('Deposit Amount is required'),
    annual_contribution: Yup.number().required('Annual Contribution is required'),
    monthly_contribution: Yup.number().required('Monthly Contribution is required'),
    rate: Yup.number().required('Interest Rate is required'),
    compound: Yup.string().required('Compound Rate is required'),
    years_to_save: Yup.number().required('YTS is required'),
  });

  const defaultValues = useMemo(
    () => ({
      deposit: 20000,
      annual_contribution: 0,
      monthly_contribution: 50,
      rate: 3,
      compound: 'daily',
      years_to_save: 1
    }),
    [currentData]
  );

  const methods = useForm({
    resolver: yupResolver(SavingSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentData) {
      reset(defaultValues);
    }
  }, [currentData, defaultValues, reset]);

  const calculateSaving = (data: any) => {
    let { compound, rate, monthly_contribution, annual_contribution, years_to_save, deposit } = data;

    const result = [];

    let principal = deposit + monthly_contribution;
    const daysInYear: number = 365;
    const annualRate: number = rate / 100;
    const dailyRate = annualRate / daysInYear; // Daily interest rate
    const monthlyRate = annualRate / 12; // Monthly interest rate

    // Track total interest for each compounding method
    let totalInterestDaily = 0;
    let totalInterestMonthly = 0;
    let totalInterestAnnual = 0;

    let totalInterest = 0;

    for (let month = 1; month <= (12 * years_to_save); month++) {
      const year = new Date().getFullYear();
      const daysInMonth = new Date(year, month, 0).getDate();

      // DAILY COMPOUNDING
      // Formula from the original code: principal * (Math.pow((1 + dailyRate), daysInMonth) - 1)
      const dailyCompoundFormula = (Math.pow((1 + dailyRate), daysInMonth) - 1);
      const dailyInterest = principal * dailyCompoundFormula;
      const dailyBalance = principal + dailyInterest;
      totalInterestDaily += +dailyInterest.toFixed(2);

      // MONTHLY COMPOUNDING
      // Formula from saving-form.tsx: annual_rate / 12
      // const monthlyCompoundFormula = monthlyRate;
      const monthlyCompoundFormula = Math.pow(1 + (annualRate / (12 * years_to_save)), years_to_save) - 1;
      const monthlyInterest = principal * monthlyCompoundFormula;
      const monthlyBalance = principal + monthlyInterest;
      totalInterestMonthly += +monthlyInterest.toFixed(2);

      // ANNUAL COMPOUNDING
      // Formula from saving-form.tsx: annual_rate / 12
      // Note: This divides the annual rate by 12 to get a monthly portion of the annual interest
      // const annualCompoundFormula = annualRate;
      const annualCompoundFormula = Math.pow(1 + annualRate, (years_to_save / (12 * years_to_save))) - 1;
      const annualInterest = principal * annualCompoundFormula;
      const annualBalance = principal + annualInterest;
      totalInterestAnnual += +annualInterest.toFixed(2);

      // let calculateRate = annual_rate;
      // let days = 0;
      // let compound_formoula = 0;

      // if (compound === 'daily') {
      //   compound_formoula = (Math.pow((1 + daily_rate), daysInMonth) - 1);
      //   // compound_formoula = daily_rate;
      // } else if (compound === 'monthly') {
      //   compound_formoula = (annual_rate / 12);
      // } else if (compound === 'annual') {
      //   compound_formoula = annual_rate / 12;
      // }

      // // =========== calculation ==================
      // const interest = deposit * compound_formoula; // Compound interest for the month
      // const balance = deposit + interest + monthly_contribution; // Total balance after interest
      // totalInterest += interest;

      let interest = 0;
      let balance = 0;

      switch(compound) {
        case 'daily':
          interest = dailyInterest;
          balance = dailyBalance;
          break;
        case 'monthly':
          interest = monthlyInterest;
          balance = monthlyBalance;
          break;
        case 'annual':
          interest = annualInterest;
          balance = annualBalance;
          break;
        default:
          interest = 0;
      }

      console.log(dailyInterest, monthlyInterest, annualInterest);

      result.push({
        month,
        deposit: (month === 1) ? +(deposit + monthly_contribution).toFixed(2) : monthly_contribution,
        interest: +interest.toFixed(2),
        balance: +balance.toFixed(2)
      })

      // Update principal for the next month's calculation
      // deposit = balance; // New principal is the balance after interest

      // =============== new calculation ==================
      // Update principal for the next month's calculation
      // principal = dailyBalance; // Using daily compounding for the next month
      // If you want to track each method separately, you would need separate principal variables
      if (compound === 'daily') {
        principal = dailyBalance;
      } else if (compound === 'monthly') {
        principal = monthlyBalance;
      } else if (compound === 'annual') {
        principal = annualBalance;
      }

      principal += monthly_contribution;
    }

    switch(compound) {
      case 'daily':
        totalInterest = +totalInterestDaily.toFixed(2);
        break;
      case 'monthly':
        totalInterest = +totalInterestMonthly.toFixed(2);
        break;
      case 'annual':
        totalInterest = +totalInterestAnnual.toFixed(2);
        break;
      default:
        totalInterest = 0;
    }

    console.log('interest: ', totalInterestDaily.toFixed(2), totalInterestMonthly.toFixed(2), totalInterestAnnual.toFixed(2));

    return {
      result,
      totalInterest: +totalInterest.toFixed(2),
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const calculatedResults = calculateSaving(data);
      console.log(calculatedResults)
      // setResults(calculatedResults);
      // setShowResults(true);
      enqueueSnackbar('Saving calculation completed!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error calculating periods', { variant: 'error' });
    }
  });

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, 'MMM. d')} – ${format(end, 'MMM. d')}`;
  };

  const renderForm = (
    <Grid xs={12} md={5}>
      <Card>
        <CardHeader title="Saving Calculator" />
        <Box p={3}>
          <Typography variant="body1" paragraph>

          </Typography>

          <Stack spacing={3}>

            <RHFTextField
              name="deposit"
              label="Initial deposit"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
            />

            <RHFTextField
              name="annual_contribution"
              label="Annual contribution"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
            />

            {/* <RHFTextField
              name="annual_increase"
              label="Increase"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
            /> */}

            <RHFTextField
              name="monthly_contribution"
              label="Monthly contribution"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
            />

            <RHFTextField
              name="rate"
              label="Interest Rate"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />

            <RHFSelect label='Compound' name='compound'>
              <MenuItem value={'daily'}>daily</MenuItem>
              <MenuItem value={'monthly'}>monthly</MenuItem>
              <MenuItem value={'annual'}>annual</MenuItem>
            </RHFSelect>

            <RHFTextField
              name="years_to_save"
              label="Years To Save"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>,
              }}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Calculate
            </LoadingButton>
          </Stack>
        </Box>
      </Card>
    </Grid>
  );

  const renderResults = (
    <Grid xs={12}>
      <Card>
        <CardHeader title="Your Period Calendar" />
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Period Dates
              </Typography>
              <TableContainer>
                <Scrollbar>
                  <Table>
                    <TableBody>
                      {results.map((result, index) => (
                        <TableRow key={`period-${index}`}>
                          <TableCell>{formatDateRange(result.periodStart, result.periodEnd)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            </Grid>

            <Grid xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Most Probable Ovulation Days
              </Typography>
              <TableContainer>
                <Scrollbar>
                  <Table>
                    <TableBody>
                      {results.map((result, index) => (
                        <TableRow key={`ovulation-${index}`}>
                          <TableCell>{formatDateRange(result.ovulationStart, result.ovulationEnd)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderForm}
        {showResults && renderResults}
      </Grid>
    </FormProvider>
  );
}