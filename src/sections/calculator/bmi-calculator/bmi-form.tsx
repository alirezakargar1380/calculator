import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFSwitch,
  RHFTextField,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';

import { IFormBMI } from 'src/types/bmi';
import ChartSemi from 'src/sections/_examples/extra/chart-view/chart-semi';

// ----------------------------------------------------------------------

type Props = {
  currentData?: IFormBMI;
};

function calculateBMI(weight: number, heightCm: number, gender: string) {
  const heightM = heightCm / 100; // تبدیل قد از سانتی‌متر به متر
  const bmi = weight / (heightM ** 2);

  // if (gender.toLowerCase() === "male") {
  //     console.log(`BMI شما (مرد): ${bmi.toFixed(1)}`);
  // } else if (gender.toLowerCase() === "female") {
  //     console.log(`BMI شما (زن): ${bmi.toFixed(1)}`);
  // } else {
  //     console.log("جنسیت وارد شده معتبر نیست.");
  // }
  return bmi.toFixed(1);
}

export default function BMIForm({ currentData }: Props) {
  const [bmi, setBmi] = useState(0);

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    age: Yup.number().required('Age is required'),
    height: Yup.number().required('height is required'),
    weight: Yup.number().required('weight is required'),
    gender: Yup.string().required('gender is required'),
  });

  const defaultValues = useMemo(
    () => ({
      age: currentData?.age || 20,
      height: currentData?.height || 175,
      weight: currentData?.weight || 80,
      gender: currentData?.gender || 'men',
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

  // useEffect(() => { onSubmit() }, [])

  const onSubmit = handleSubmit(async (data) => {
    try {
      setBmi(+calculateBMI(data.weight, data.height, data.gender));
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentData ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.product.root);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderProperties = (
    <>

      <Grid xs={12} md={6}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="age" label="Age" />

            <Stack spacing={1}>
              <Typography variant="subtitle2">Gender</Typography>
              <RHFMultiCheckbox row name="gender" spacing={2} options={PRODUCT_GENDER_OPTIONS} />
            </Stack>

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

            <RHFTextField
              name="weight"
              label="Weight"
              placeholder="0"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      Kg
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

      <Grid md={6}>
        {isSubmitted && (
          <ChartSemi bmi={bmi} />
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
