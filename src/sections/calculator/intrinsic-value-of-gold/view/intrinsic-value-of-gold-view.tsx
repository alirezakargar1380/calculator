'use client';

import { Box } from "@mui/material";
import { Container } from "@mui/system";
import IntrinsicValueOfGoldForm from "../intrinsic-value-of-gold-form";

export default function IntrinsicValueOfGoldView() {
    return (
        <Box>
            <Container maxWidth={'lg'}>
                <IntrinsicValueOfGoldForm />
            </Container>
        </Box>
    );
}