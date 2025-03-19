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

import { IFormBMI } from 'src/types/bmi';

// ----------------------------------------------------------------------

type Props = {
  currentData?: IFormBMI;
};

export default function PercentageCalculatorForm({ currentData }: Props) {
  const [result, setResult] = useState({
    submit: false,
    severely_underweight: 0,
    underweight: 0,
    normal: '',
    overweight: '',
    obese_class_i: '',
    obese_class_ii: '',
    obese_class_iii: '',
  });

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    height: Yup.number().required('height is required'),
  });

  const defaultValues = useMemo(
    () => ({
      height: 175,
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

      const severelyUnderweightThreshold = 16.0 * fHeight(data.height);
      const underweightThreshold = 18.5 * fHeight(data.height);
      const minHealthyWeight = 18.5 * fHeight(data.height);
      const maxHealthyWeight = 24.9 * fHeight(data.height);
      const overweightThreshold = 25.0 * fHeight(data.height);
      const obeseClass1Threshold = 30.0 * fHeight(data.height);
      const obeseClass2Threshold = 35.0 * fHeight(data.height);
      const obeseClass3Threshold = 40.0 * fHeight(data.height);

      setResult({
        submit: true,
        severely_underweight: severelyUnderweightThreshold,
        underweight: underweightThreshold,
        normal: `${minHealthyWeight.toFixed(1)} kg - ${maxHealthyWeight.toFixed(1)}`,
        overweight: `${overweightThreshold.toFixed(1)} kg - ${obeseClass1Threshold.toFixed(1)}`,
        obese_class_i: `${obeseClass1Threshold.toFixed(1)} kg - ${obeseClass2Threshold.toFixed(1)}`,
        obese_class_ii: `${obeseClass2Threshold.toFixed(1)} kg - ${obeseClass3Threshold.toFixed(1)}`,
        obese_class_iii: `${obeseClass3Threshold.toFixed(1)}`,
      })

    } catch (error) {
      console.error(error);
    }
  });

  const fHeight = (heightCm: number) => +((heightCm / 100) ** 2).toFixed(1)

  const renderProperties = (
    <>

      <Grid xs={12} md={5}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>

            <RHFTextField
              name="height"
              label="Height"
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

      <Grid md={7}>
        {result.submit && (
          <Box>
            <Typography variant='h3' mb={1} bgcolor={'#1c905f'} borderRadius={'8px'} px={1}>Result:</Typography>
            <Box whiteSpace={'break-spaces'}>
              for weight {values.height} kg:
              <br />
              <br />
              Severely Underweight Threshold: <b style={{ background: '#c72222' }}>Below {result.severely_underweight} kg</b>
              <br />
              Underweight Threshold: Below {result.underweight} kg
              <br />
              <Typography display={'flex'} alignItems={'center'}>
                Healthy Weight Range:
                <Typography variant='body1' ml={1} mb={1} width={'fit-content'} bgcolor={'#1c9035'} borderRadius={'8px'} px={1} my={1}>
                  {result.normal} kg
                </Typography>
              </Typography>

              Overweight Threshold: {result.overweight} kg
              <br />
              Obese Class I Threshold: {result.obese_class_i} kg
              <br />
              Obese Class II Threshold: {result.obese_class_ii} kg
              <br />
              Obese Class III Threshold: Above {result.obese_class_iii} kg
            </Box>
          </Box>
        )}
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
