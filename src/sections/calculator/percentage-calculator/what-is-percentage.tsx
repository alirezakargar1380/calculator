import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect } from 'react';

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
import { formant } from 'src/utils/format-number';
import WhatIsPercentageForm1 from './what-is-percentage-form-1';
import WhatIsPercentageForm2 from './what-is-percentage-form-2';

// ----------------------------------------------------------------------

type Props = {
    currentData?: IFormBMI;
};

export default function WhatIsPercentageForm({ currentData }: Props) {

    const { enqueueSnackbar } = useSnackbar();

    const NewProductSchema = Yup.object().shape({
        number: Yup.number().required('number is required'),
        percentage: Yup.number().required('percentage is required'),
        result: Yup.number(),
    });

    const defaultValues = useMemo(
        () => ({
            percentage: 20,
            number: 120,
            result: 24,
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
            setValue('result', (data.percentage / 100) * data.number);

            enqueueSnackbar('Done!', {
                variant: 'info'
            });

        } catch (error) {
            console.error(error);
        }
    });

    return (

        <Card>
            <CardHeader title="What Is Percentage of Number" />

            <Stack sx={{ p: 3 }} spacing={6}>
                <WhatIsPercentageForm1 />
                <WhatIsPercentageForm2 />

            </Stack>

        </Card>
    );
}