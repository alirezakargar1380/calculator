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
import { fCurrency } from 'src/utils/format-number';

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
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Card>
                <CardHeader title="What Is Percentage of Number" />

                <Box sx={{ p: 3 }}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>

                        <Box sx={{ mb: 3 }}>what is</Box>

                        <RHFTextField
                            name="percentage"
                            variant='filled'
                            label={'percentage'}
                            placeholder="0"
                            type="number"
                            helperText={' '}
                            sx={{ mx: 2, width: 160 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start" sx={{
                                        // m: 0
                                    }}>
                                        <Box component="span" sx={{ color: 'text.disabled' }}>
                                            %
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{ shrink: true }}
                        />

                        <Box sx={{ mb: 3 }}>of</Box>

                        <RHFTextField
                            name="number"
                            variant='filled'
                            label="number"
                            placeholder="0"
                            type="number"
                            helperText={fCurrency(values.number)}
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
                            helperText={fCurrency(values.result || 0)}
                            sx={{ width: 150, mx: 2 }}
                            //   InputProps={{
                            //     endAdornment: (
                            //       <InputAdornment position="start">
                            //         <Box component="span" sx={{ color: 'text.disabled' }}>
                            //           %
                            //         </Box>
                            //       </InputAdornment>
                            //     ),
                            //   }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <LoadingButton type="submit" variant="contained" size="medium" sx={{ width: 'fit-content', mt: 3 }} loading={isSubmitting}>
                        Calculate
                    </LoadingButton>
                </Box>

            </Card>
        </FormProvider>
    );
}