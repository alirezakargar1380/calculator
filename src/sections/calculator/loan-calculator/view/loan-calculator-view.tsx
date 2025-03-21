'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import LoanCalculatorForm from "../loan-calculator-form";

export default function LoanCalculatorView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <LoanCalculatorForm />
            </Container>
        </Box>
    );
}