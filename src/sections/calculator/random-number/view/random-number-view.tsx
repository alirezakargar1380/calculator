'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import RandomNumberForm from "../random-number-form";

export default function RandomNumberView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <RandomNumberForm />
            </Container>
        </Box>
    );
}