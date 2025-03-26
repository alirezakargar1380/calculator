'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import SavingForm from "../saving-form";

export default function SavingCalculatorView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <SavingForm />
            </Container>
        </Box>
    );
}