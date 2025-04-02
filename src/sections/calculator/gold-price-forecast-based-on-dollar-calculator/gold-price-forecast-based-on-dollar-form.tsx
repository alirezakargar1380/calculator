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
import IncrementerButton from '../common/incrementer-button';

// ----------------------------------------------------------------------

type Props = {
  currentData?: IFormBMI;
};

export default function GoldPriceForecastBasedOnDollarForm({ currentData }: Props) {
  const [result, setResult] = useState<any>(0);

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    dollar: Yup.number().required('dollar is required'),
    ounce: Yup.number().required('ounce is required'),
    bubble: Yup.number().required('bubble is required'),
  });

  const defaultValues = useMemo(
    () => ({
      dollar: 1050000,
      ounce: 3052,
      bubble: 0,
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
      let rial = ((data.dollar * data.ounce) / 31.1) * (18 / 24);

      // +5%
      if (data.bubble > 0)
        rial += rial * (data.bubble / 100);

      setResult(rial);

      enqueueSnackbar('Calculate successfully!', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });

    } catch (error) {
      console.error(error);
    }
  });

  // useEffect(() => { onSubmit() }, [])

  const renderProperties = (
    <>

      <Grid xs={12} md={6}>
        <Card>
          <CardHeader title="Gold Price Forecast Based On Dollar" />

          <Box p={3}>
            Predict the price of 18-karat gold per gram based on the dollar price.
            <br />
            <br />
            <Stack spacing={3}>
              <Box>
                <RHFTextField label='Price Of Each Dollar' type='number' name='dollar' helperText={'dollar price in your countery is: ' + formant(values.dollar)} />
              </Box>
              <Box>
                <RHFTextField
                  label='Gold Ounce'
                  type='number'
                  name='ounce'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          $
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <RHFTextField
                  label='Gold Bubble (%)'
                  type='number'
                  name='bubble'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          %
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Stack>
            <LoadingButton type="submit" variant="contained" size="medium" sx={{ width: 'fit-content', mt: 3 }} loading={isSubmitting}>
              Calculate
            </LoadingButton>
          </Box>

        </Card>
      </Grid>

      {isSubmitted && (
        <Grid xs={12} md={6}>
          <Card>
            <CardHeader title="Result" sx={{ bgcolor: 'greenyellow', pb: 3 }} />
            <Box p={3}>{'The price of each gram of 18-karat gold will be: ' + formant(result)}</Box>
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
