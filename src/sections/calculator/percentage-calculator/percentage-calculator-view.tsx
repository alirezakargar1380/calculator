'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import PercentageCalculatorForm from "./percentage-calculator-form";

export default function PercentageCalculatorView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <PercentageCalculatorForm />
            </Container>
        </Box>
    );
}