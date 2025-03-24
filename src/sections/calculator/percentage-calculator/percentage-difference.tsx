import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useResponsive } from 'src/hooks/use-responsive';

import {
  _tags,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

import { IFormBMI } from 'src/types/bmi';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  currentData?: IFormBMI;
};

export default function PercentageDifferenceForm({ currentData }: Props) {

  const [diff, setDiff] = useState(0);
  const [increase, setIncrease] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    value_1: Yup.number().required('value 1 is required'),
    value_2: Yup.number().required('value 2 is required'),
  });

  const defaultValues = useMemo(
    () => ({
      value_1: 0,
      value_2: 0,
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
      const val_1_and_2_diff = ((data.value_1 - data.value_2) / ((data.value_1 + data.value_2) / 2)) * 100;
      setDiff(Math.abs(val_1_and_2_diff));

      const increace = ((data.value_1 - data.value_2) / data.value_1) * 100;
      setIncrease(Math.abs(increace));

      enqueueSnackbar('Done!', {
        variant: 'info'
      });

    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <CardHeader title="Percentage Difference" />

        <Stack sx={{ p: 3 }} spacing={2}>

          <RHFTextField
            name="value_1"
            variant='filled'
            label={'Value 1'}
            placeholder="0"
            type="number"
            sx={{ mr: 2, width: 1 }}
            InputLabelProps={{ shrink: true }}
          />

          <RHFTextField
            name="value_2"
            variant='filled'
            label={'Value 2'}
            placeholder="0"
            type="number"
            sx={{ mr: 2, width: 1 }}
            InputLabelProps={{ shrink: true }}
          />

          {(isSubmitted) && (
            <Box>
              <Typography bgcolor={'greenyellow'} padding={2} mb={2}>Result</Typography>
              <Typography display={'flex'} gap={1}>Difference of {values.value_1} and {values.value_2} are <Box color='Highlight'>{diff}%</Box></Typography>
              <Typography display={'flex'} gap={1}>{values.value_2} is a <Box color='Highlight'>{increase}%</Box> increase of {values.value_1}</Typography>
            </Box>
          )}

          <LoadingButton type="submit" variant="contained" size="medium" sx={{ width: 'fit-content', mt: 3 }} loading={isSubmitting}>
            Calculate
          </LoadingButton>
        </Stack>

      </Card>
    </FormProvider>
  );
}