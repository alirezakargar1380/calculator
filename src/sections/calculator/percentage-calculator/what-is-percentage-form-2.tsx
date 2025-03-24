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

// ----------------------------------------------------------------------

type Props = {
    currentData?: IFormBMI;
};

export default function WhatIsPercentageForm2({ currentData }: Props) {

    const { enqueueSnackbar } = useSnackbar();

    const NewProductSchema = Yup.object().shape({
        number_1: Yup.number().required('number is required'),
        number_2: Yup.number().required('number is required'),
        result: Yup.number(),
    });

    const defaultValues = useMemo(
        () => ({
            number_1: 120,
            number_2: 120,
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
            setValue('result', (data.number_1 / data.number_2) * 100);

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
                    name="number_1"
                    variant='filled'
                    label="number"
                    placeholder="0"
                    type="number"
                    helperText={formant(values.number_1)}
                    sx={{ width: 150, mr: 2 }}
                    InputLabelProps={{ shrink: true }}
                />

                <Box sx={{ mb: 3 }}>is what % of</Box>

                <RHFTextField
                    name="number_2"
                    variant='filled'
                    label="number"
                    placeholder="0"
                    type="number"
                    helperText={formant(values.number_2)}
                    sx={{ width: 150, mx: 2 }}
                    InputLabelProps={{ shrink: true }}
                />

                <Box sx={{ mb: 3 }}>=</Box>

                <RHFTextField
                    name="result"
                    variant='filled'
                    label="result"
                    placeholder="0"
                    type="number"
                    disabled
                    sx={{ width: 150, mx: 2, mb: 3 }}
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

                <LoadingButton type="submit" variant="contained" size="large" sx={{ width: 'fit-content', mb: 3.5 }} loading={isSubmitting}>
                    Calculate
                </LoadingButton>
            </Box>
        </FormProvider>
    );
}