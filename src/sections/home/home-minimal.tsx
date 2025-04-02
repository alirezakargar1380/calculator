import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';
import { Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import ChartRadarBar from '../_examples/extra/chart-view/chart-radar-bar';
import ChartSemi from '../_examples/extra/chart-view/chart-semi';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/home/health-logo-fitness.jpg',
    title: 'Fitness & Health Calculators',
    description: 'Consistent design makes it easy to brand your own.',
    items: [
      {
        title: 'BMI Calculator',
        link: paths.calculate.fitness.bmi
      },
      {
        title: 'Healthy Weight Calculator',
        link: paths.calculate.fitness.healthyWeightCalculator
      },
      {
        title: 'Period Calculator',
        link: paths.calculate.fitness.period
      },
      {
        title: 'Pregnancy Calculator (Coming Soon)',
        // link: paths.calculate.fitness.pregnancy
        link: paths.comingSoon
      },
      {
        title: 'Pace Calculator (Coming Soon)',
        link: paths.comingSoon
      },
    ]
  },
  {
    icon: ' /assets/icons/home/math-illustration.jpg',
    title: 'Math Calculators',
    description: 'the useful mathamatics formoula are here to use!',
    items: [
      {
        title: 'Percentage Calculator',
        link: paths.calculate.math.percentageCalculator
      },
      {
        title: 'Random Number Generator',
        link: paths.calculate.math.randomNumber
      },
      {
        title: 'Ratio Calculator (Coming Soon)',
        link: paths.comingSoon
      },
      {
        title: 'Log Calculator (Coming Soon)',
        link: paths.comingSoon
      },
      {
        title: 'Matrix Calculator (Coming Soon)',
        link: paths.comingSoon
      },
      {
        title: 'Big Number Generator (Coming Soon)',
        link: paths.comingSoon
      },
    ]
  },
  {
    icon: ' /assets/icons/home/40450-1067x800.jpg',
    title: 'Financial Calculators',
    description: 'Consistent design makes it easy to brand your own.',
    items: [
      {
        title: 'Loan Calculator',
        link: paths.calculate.financial.loan
      },
      {
        title: 'Saving Calculator',
        link: paths.calculate.financial.saving
      },
      {
        title: 'Gold Price Forecast Based on Dollar',
        link: paths.calculate.financial.goldPriceForecastBasedOnDollar
      },
      {
        title: 'Margin Calculator (Coming Soon)',
        link: paths.comingSoon
      },
      {
        title: 'Budget Calculator (Coming Soon)',
        link: paths.comingSoon
      },
      
      {
        title: 'Investment Calculator (Coming Soon)',
        link: paths.comingSoon
      },
    ]
  }
];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            Calculator
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">
            here is our Calculators
          </Typography>
        </m.div>
      </Stack>

      <Box
        gap={{ xs: 3, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {CARDS.map((card, index) => (
          <m.div variants={varFade().inUp} key={card.title}>
            <Card
              sx={{
                textAlign: 'left',
                // boxShadow: { md: 'none' },
                bgcolor: 'background.default',
                p: (theme) => theme.spacing(2, 2, 4, 2),
                boxShadow: (theme) => ({
                  md: `-40px 40px 80px ${theme.palette.mode === 'light'
                    ? alpha(theme.palette.grey[500], 0.16)
                    : alpha(theme.palette.common.black, 0.4)
                    }`,
                }),
                // ...(index === 1 && {
                //   boxShadow: (theme) => ({
                //     md: `-40px 40px 80px ${
                //       theme.palette.mode === 'light'
                //         ? alpha(theme.palette.grey[500], 0.16)
                //         : alpha(theme.palette.common.black, 0.4)
                //     }`,
                //   }),
                // }),
              }}
            >
              <Box
                component="img"
                src={card.icon}
                alt={card.title}
                sx={{ mx: 'auto', width: 1, height: 200, borderRadius: 1, objectFit: 'cover' }}
              />

              <Typography variant="h5" sx={{ mt: 2, mb: 1, textAlign: 'left' }}>
                {card.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary', textAlign: 'left' }}>
                {card.description}
              </Typography>

              <Stack spacing={2} mt={2}>
                {card?.items?.map((item) => (
                  <Button
                    key={item.title}
                    color="inherit"
                    size="small"
                    variant="text"
                    startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
                    target="_blank"
                    rel="noopener"
                    href={item.link}
                    sx={{ borderColor: 'text.primary', width: 'fit-content' }}
                  >
                    {item.title}
                  </Button>
                ))}
              </Stack>

            </Card>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
