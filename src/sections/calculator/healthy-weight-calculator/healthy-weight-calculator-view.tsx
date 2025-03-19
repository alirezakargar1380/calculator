'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import HealthyWeightCalculatorForm from "./healthy-weight-calculator-form";

export default function HealthyWeightCalculatorView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <HealthyWeightCalculatorForm />
            </Container>
        </Box>
    );
}