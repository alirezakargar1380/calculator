'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import PeriodForm from "../../pregnancy-calculator/pregnancy-form";

export default function PeriodCalculatorView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <PeriodForm />
            </Container>
        </Box>
    );
}