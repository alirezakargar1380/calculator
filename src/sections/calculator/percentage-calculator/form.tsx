
import Grid from '@mui/material/Unstable_Grid2';

import {
  _tags,
} from 'src/_mock';

import PercentageOfNumberForm from './percentage-of-number';
import WhatIsPercentageForm from './what-is-percentage';
import PercentageDifferenceForm from './percentage-difference';

// ----------------------------------------------------------------------

const md = 10;
const md2 = 2;

export default function PercentageCalculatorForm() {

  const renderPercentageOfNumber = (
    <>
      <Grid xs={12} md={md}>
        <PercentageOfNumberForm />
      </Grid>

      <Grid md={md2} />

      <Grid xs={12} md={md}>
        <WhatIsPercentageForm />
      </Grid>

      <Grid md={md2} />

      <Grid xs={12} md={md}>
        <PercentageDifferenceForm />
      </Grid>

      <Grid md={md2} />
    </>
  );

  return (
    <Grid container spacing={3}>
      {renderPercentageOfNumber}
    </Grid>
  );
}
