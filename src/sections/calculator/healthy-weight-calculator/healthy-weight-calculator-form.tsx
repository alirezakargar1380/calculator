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
import { useLocales, useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
  currentData?: IFormBMI;
};

export default function HealthyWeightCalculatorForm({ currentData }: Props) {
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

  const { currentLang } = useLocales();
  const { t } = useTranslate();

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
        normal: `${minHealthyWeight.toFixed(1)} ${t('page.health.unit')} - ${maxHealthyWeight.toFixed(1)}`,
        overweight: `${overweightThreshold.toFixed(1)} ${t('page.health.unit')} - ${obeseClass1Threshold.toFixed(1)}`,
        obese_class_i: `${obeseClass1Threshold.toFixed(1)} ${t('page.health.unit')} - ${obeseClass2Threshold.toFixed(1)}`,
        obese_class_ii: `${obeseClass2Threshold.toFixed(1)} ${t('page.health.unit')} - ${obeseClass3Threshold.toFixed(1)}`,
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
              label={t('page.health.height')}
              placeholder="0"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      {currentLang.value === 'fa' ? 'سانتی متر' : 'Cm'}
                    </Box>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />

            <LoadingButton type="submit" variant="contained" size="medium" sx={{ width: 'fit-content' }} loading={isSubmitting}>
              {t('cal_btn')}
            </LoadingButton>

          </Stack>
        </Card>
      </Grid>

      <Grid xs={12} md={7}>
        {result.submit && (
          <Box sx={{
            ...(currentLang.value === 'fa' && {
              textAlign: 'right',
              direction: 'rtl'
            })
          }}>
            <Typography variant='h3' mb={1} bgcolor={'#1c905f'} borderRadius={'8px'} px={1} color={'#fff'}>{t('page.health.result.title')}:</Typography>
            <Box whiteSpace={'break-spaces'}>
              <Typography pb={0} fontSize={18} fontFamily={'peyda-bold'}>{t('page.health.result.for_weight')} {values.height} {t('page.health.unit')}:</Typography>
              <br />
              {/* <br /> */}
              {/* Severely Underweight Threshold */}
              {t('page.health.s_u_t')}: <b style={{ background: '#c72222', color: '#fff', padding: '3px 6px' }}>{t('page.health.result.below')} {result.severely_underweight} {t('page.health.unit')}</b>
              <br />
              {/* Underweight Threshold */}
              {t('page.health.u_t')}: {t('page.health.result.below')} {result.underweight} {t('page.health.unit')}
              <br />
              <Typography display={'flex'} alignItems={'center'}>
                {/* Healthy Weight Range: */}
                {t('page.health.h_w_r')}:
                <Typography variant='body1' ml={1} mb={1} fontSize={14} width={'fit-content'} bgcolor={'#1c9035'} color={'#fff'} px={1} my={1}>
                  {result.normal} {t('page.health.unit')}
                </Typography>
              </Typography>

              {t('page.health.o_t')}: {result.overweight} {t('page.health.unit')}
              <br />
              {t('page.health.o_c_i_t')}: {result.obese_class_i} {t('page.health.unit')}
              <br />
              {t('page.health.o_c_ii_t')}: {result.obese_class_ii} {t('page.health.unit')}
              <br />
              {t('page.health.o_c_iii_t')}: {t('page.health.result.above')} {result.obese_class_iii} {t('page.health.unit')}
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
