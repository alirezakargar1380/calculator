'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import GoldPriceForecastBasedOnDollarForm from "../gold-price-forecast-based-on-dollar-form";

export default function GoldPriceForecastBasedOnDollarView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <GoldPriceForecastBasedOnDollarForm />
            </Container>
        </Box>
    );
}