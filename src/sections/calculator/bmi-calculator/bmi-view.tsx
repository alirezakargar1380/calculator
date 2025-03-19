'use client';

import { Box } from "@mui/material";
import BMIForm from "./bmi-form";
import { Container } from "@mui/system";

export default function BMIView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <BMIForm />
            </Container>
        </Box>
    );
}