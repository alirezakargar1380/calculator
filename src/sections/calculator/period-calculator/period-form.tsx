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
  RHFSelect,
} from 'src/components/hook-form';

import ChartSemi from '../../_examples/extra/chart-view/chart-semi';
import { IFormBMI } from 'src/types/bmi';
import { MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { fCurrency, formant } from 'src/utils/format-number';
import IncrementerButton from '../common/incrementer-button';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

type Props = {
  currentData?: IFormBMI;
};

export default function PregnancyForm({ currentData }: Props) {
  const [result, setResult] = useState<any>(0);

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    date: Yup.date().required('lower is required'),
    based: Yup.string().required('based is required'),
  });

  const defaultValues = useMemo(
    () => ({
      date: new Date(),
      based: '1'
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
    formState: { isSubmitting, isSubmitted },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentData) {
      reset(defaultValues);
    }
  }, [currentData, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {

    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => { onSubmit() }, [])

  const renderProperties = (
    <>

      <Grid xs={12}>
        <Card>
          <CardHeader title="Random Number Generator" />

          <Box p={3}>
            This version of the generator creates a random integer. It can deal with very large integers up to a few thousand digits.
            <br />
            <br />
            <Stack spacing={3} direction={'row'}>

              <RHFSelect name='based' label="Calculate Based on" size="medium">
                <MenuItem value={'1'}>Due Date</MenuItem>
                <MenuItem value={'2'}>Last period</MenuItem>
              </RHFSelect>

              <DatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                label="Year, month and date"
                value={values.date}
                onChange={(newValue) => {
                  if (newValue)
                    setValue("date", newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    // margin: 'normal',
                  },
                }}
              />

            </Stack>
            <LoadingButton type="submit" variant="contained" size="medium" sx={{ width: 'fit-content', mt: 3 }} loading={isSubmitting}>
              Calculate
            </LoadingButton>
          </Box>

        </Card>
      </Grid>

      {isSubmitted && (
        <Grid xs={12}>
          <Card>
            <CardHeader title="Result" color='#1c9035' sx={{ bgcolor: 'greenyellow', pb: 3 }} />
            <Box p={3}>{formant(result)}</Box>
          </Card>
        </Grid>
      )}

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
