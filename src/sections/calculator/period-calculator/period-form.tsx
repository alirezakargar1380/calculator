import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';
// import { format, addDays } from 'date-fns';
import { format, addDays } from 'date-fns-jalali';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';
import Scrollbar from 'src/components/scrollbar';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';

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

export default function PeriodForm({ currentData }: Props) {
  const [results, setResults] = useState<PeriodResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const PeriodSchema = Yup.object().shape({
    lastPeriodDate: Yup.date().required('Last period date is required'),
    periodLength: Yup.number()
      .required('Period length is required')
      .min(1, 'Period length must be at least 1 day')
      .max(10, 'Period length must be less than 10 days'),
    cycleLength: Yup.number()
      .required('Cycle length is required')
      .min(21, 'Cycle length must be at least 21 days')
      .max(35, 'Cycle length must be less than 35 days'),
  });

  const defaultValues = useMemo(
    () => ({
      lastPeriodDate: new Date(),
      periodLength: 5,
      cycleLength: 28,
    }),
    [currentData]
  );

  const methods = useForm({
    resolver: yupResolver(PeriodSchema),
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

  const calculatePeriods = (data: any) => {
    const { lastPeriodDate, periodLength, cycleLength } = data;
    const numberOfCycles = 6; // Calculate next 6 periods
    
    const results: PeriodResult[] = [];
    
    let currentPeriodStart = new Date(lastPeriodDate);
    
    for (let i = 0; i < numberOfCycles; i++) {
      // Calculate period end date
      const periodEnd = addDays(currentPeriodStart, periodLength - 1);
      
      // Calculate ovulation window (typically 14 days before next period, with a 5-day window)
      const ovulationMid = addDays(currentPeriodStart, cycleLength - 14);
      const ovulationStart = addDays(ovulationMid, -2);
      const ovulationEnd = addDays(ovulationMid, 2);

      console.log('Period Start:', ovulationMid);
      
      results.push({
        periodStart: new Date(currentPeriodStart),
        periodEnd,
        ovulationStart,
        ovulationEnd,
      });
      
      // Move to next cycle
      currentPeriodStart = addDays(currentPeriodStart, cycleLength);
    }
    
    return results;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const calculatedResults = calculatePeriods(data);
      console.log(calculatedResults)
      setResults(calculatedResults);
      setShowResults(true);
      enqueueSnackbar('Period calculation completed!');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error calculating periods', { variant: 'error' });
    }
  });

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, 'MMMM. d')} – ${format(end, 'MMMM. d')}`;
  };

  const renderForm = (
    <Grid xs={12}>
      <Card>
        <CardHeader title="Period Calculator" />
        <Box p={3}>
          <Typography variant="body1" paragraph>
            Calculate your future periods and most probable ovulation days based on your cycle information.
          </Typography>
          
          <Stack spacing={3}>
            <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
              <DatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                label="First Day of Your Last Period"
                value={values.lastPeriodDate}
                onChange={(newValue) => {
                  if (newValue) setValue("lastPeriodDate", newValue);
                }}
                slotProps={{
                  textField: { fullWidth: true },
                }}
              />
            </LocalizationProvider>
            
            <RHFTextField
              name="periodLength"
              label="How long did it last?"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">days</InputAdornment>,
              }}
            />
            
            <RHFTextField
              name="cycleLength"
              label="Average Length of Cycles"
              type="number"
              InputProps={{
                endAdornment: <InputAdornment position="end">days</InputAdornment>,
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