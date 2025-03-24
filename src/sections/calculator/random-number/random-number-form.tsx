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

export default function RandomNumberForm({ currentData }: Props) {
  const [result, setResult] = useState<any>(0);

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    lower: Yup.number().required('lower is required'),
    upper: Yup.number().required('upper is required'),
  });

  const defaultValues = useMemo(
    () => ({
      lower: 3,
      upper: 100
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

      // randon number js
      const randomNumber = Math.floor(Math.random() * (data.upper - data.lower + 1)) + data.lower;

      setResult(randomNumber);

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
              <Box>
                <Typography variant="subtitle2" sx={{ flexGrow: 1, mb: 1 }}>
                  Lower Limit
                </Typography>
                <IncrementerButton
                  name="lower"
                  // quantity={values.lower}
                  // disabledDecrease={values.lower <= 1}
                  // disabledIncrease={values.lower >= 0}
                  onIncrease={() => setValue('lower', values.lower + 1)}
                  onDecrease={() => setValue('lower', values.lower - 1)}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ flexGrow: 1, mb: 1 }}>
                  Upper Limit
                </Typography>
                <IncrementerButton
                  name="upper"
                  // quantity={values.upper}
                  // disabledDecrease={values.lower <= 1}
                  // disabledIncrease={values.lower >= 0}
                  onIncrease={() => setValue('upper', values.upper + 1)}
                  onDecrease={() => setValue('upper', values.upper - 1)}
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
        <Grid xs={12}>
          <Card>
            <CardHeader title="Result" color='#1c9035' sx={{ bgcolor: 'greenyellow', pb: 3 }} />
            <Box p={3}>{result}</Box>
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
