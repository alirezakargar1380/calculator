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
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
    currentData?: IFormBMI;
};

export default function WhatIsPercentageForm3({ currentData }: Props) {

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
            setValue('result', (data.number / data.percentage * 100));

            enqueueSnackbar('Done!', {
                variant: 'info'
            });

        } catch (error) {
            console.error(error);
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box sx={{ alignItems: 'center', display: 'flex' }}>



                <RHFTextField
                    name="number"
                    variant='filled'
                    label="number"
                    placeholder="0"
                    type="number"
                    helperText={formant(values.number)}
                    sx={{ width: 240, mr: 2 }}
                    InputLabelProps={{ shrink: true }}
                />

                <Box sx={{ mb: 3 }}>is</Box>

                <RHFTextField
                    name="percentage"
                    variant='filled'
                    label={'percentage'}
                    placeholder="0"
                    type="number"
                    helperText={' '}
                    sx={{ ml: 2, width: 240 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Box component="span" sx={{ color: 'text.disabled' }}>
                                    %
                                </Box>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{ shrink: true }}
                />

                <Box sx={{ mb: 3, mx: 2 }}>of what</Box>

                <LoadingButton type="submit" variant="contained" size="large" sx={{ width: 'fit-content', mb: 3.5 }} loading={isSubmitting}>
                    Calculate
                </LoadingButton>
            </Box>

            <Box mt={2}>
                <Typography bgcolor={'greenyellow'} padding={2} mb={2}>Result</Typography>
                <Typography display={'flex'} gap={1}>{values.number} is <Box color='Highlight'>{values.percentage}%</Box> of <Box color='Highlight'>{values.result}</Box></Typography>
            </Box>

        </FormProvider>
    );
}