'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import PregnancyForm from "../pregnancy-form";

export default function PregnancyCalculatorView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <PregnancyForm />
            </Container>
        </Box>
    );
}