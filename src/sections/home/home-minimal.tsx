'use client';

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
import { useLocales, useTranslate } from 'src/locales';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

// const CARDS = [
//   {
//     icon: ' /assets/icons/home/health-logo-fitness.jpg',
//     title: 'Fitness & Health Calculators',
//     description: 'improve your health and fitness',
//     items: [
//       {
//         title: 'BMI Calculator',
//         link: paths.calculate.fitness.bmi
//       },
//       {
//         title: 'Healthy Weight Calculator',
//         link: paths.calculate.fitness.healthyWeightCalculator
//       },
//       {
//         title: 'Period Calculator',
//         link: paths.calculate.fitness.period
//       },
//       {
//         title: 'Pregnancy Calculator (Coming Soon)',
//         // link: paths.calculate.fitness.pregnancy
//         link: paths.comingSoon
//       },
//       {
//         title: 'Pace Calculator (Coming Soon)',
//         link: paths.comingSoon
//       },
//     ]
//   },
//   {
//     icon: ' /assets/icons/home/math-illustration.jpg',
//     title: 'Math Calculators',
//     description: 'the useful mathamatics formoula are here to use!',
//     items: [
//       {
//         title: 'Percentage Calculator',
//         link: paths.calculate.math.percentageCalculator
//       },
//       {
//         title: 'Random Number Generator',
//         link: paths.calculate.math.randomNumber
//       },
//       {
//         title: 'Ratio Calculator (Coming Soon)',
//         link: paths.comingSoon
//       },
//       {
//         title: 'Log Calculator (Coming Soon)',
//         link: paths.comingSoon
//       },
//       {
//         title: 'Matrix Calculator (Coming Soon)',
//         link: paths.comingSoon
//       },
//       {
//         title: 'Big Number Generator (Coming Soon)',
//         link: paths.comingSoon
//       },
//     ]
//   },
//   {
//     icon: ' /assets/icons/home/40450-1067x800.jpg',
//     title: 'Financial Calculators',
//     description: 'the useful financial formoula are here to use!',
//     items: [
//       {
//         title: 'Loan Calculator',
//         link: paths.calculate.financial.loan
//       },
//       {
//         title: 'Saving Calculator',
//         link: paths.calculate.financial.saving
//       },
//       {
//         title: 'Gold Price Forecast Based on Dollar',
//         link: paths.calculate.financial.goldPriceForecastBasedOnDollar
//       },
//       {
//         title: 'Intrinsic Gold Value',
//         link: paths.calculate.financial.intrinsicValueOfGold
//       },
//       {
//         title: 'Margin Calculator (Coming Soon)',
//         link: paths.comingSoon
//       },
//       {
//         title: 'Budget Calculator (Coming Soon)',
//         link: paths.comingSoon
//       },

//       {
//         title: 'Investment Calculator (Coming Soon)',
//         link: paths.comingSoon
//       },
//     ]
//   }
// ];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const [mounted, setMounted] = useState(false);
  const [cards, setCards] = useState<any[]>([]);

  const { t, ready } = useTranslate();
  const { currentLang } = useLocales();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define CARDS inside useEffect to ensure translations are ready
  useEffect(() => {
    if (mounted && ready) {
      const CARDS = [
        {
          icon: '/assets/icons/home/health-logo-fitness.jpg',
          title: t('calculators.health.title'),
          description: t('calculators.health.desccription'),
          items: [
            {
              title: t('calculators.health.bmi'),
              link: paths.calculate.fitness.bmi
            },
            {
              title: t('calculators.health.healthy_weight'),
              link: paths.calculate.fitness.healthyWeightCalculator
            },
            {
              title: t('calculators.health.period'),
              link: paths.calculate.fitness.period
            },
            // {
            //   title: 'Pregnancy Calculator (Coming Soon)',
            //   link: paths.comingSoon
            // },
            // {
            //   title: 'Pace Calculator (Coming Soon)',
            //   link: paths.comingSoon
            // },
          ]
        },
        {
          icon: '/assets/icons/home/math-illustration.jpg',
          title: t('calculators.math.title'),
          description: t('calculators.math.desccription'),
          items: [
            {
              title: t('calculators.math.percentage'),
              link: paths.calculate.math.percentageCalculator
            },
            {
              title: t('calculators.math.random_number'),
              link: paths.calculate.math.randomNumber
            },
            // {
            //   title: 'Ratio Calculator (Coming Soon)',
            //   link: paths.comingSoon
            // },
            // {
            //   title: 'Log Calculator (Coming Soon)',
            //   link: paths.comingSoon
            // },
            // {
            //   title: 'Matrix Calculator (Coming Soon)',
            //   link: paths.comingSoon
            // },
            // {
            //   title: 'Big Number Generator (Coming Soon)',
            //   link: paths.comingSoon
            // },
          ]
        },
        {
          icon: '/assets/icons/home/40450-1067x800.jpg',
          title: t('calculators.finance.title'),
          description: t('calculators.finance.desccription'),
          items: [
            {
              title: t('calculators.finance.loan'),
              link: paths.calculate.financial.loan
            },
            {
              title: t('calculators.finance.saving'),
              link: paths.calculate.financial.saving
            },
            {
              title: t('calculators.finance.gold_price_based_on_dollar'),
              link: paths.calculate.financial.goldPriceForecastBasedOnDollar
            },
            {
              title: t('calculators.finance.intrinsic_gold_value'),
              link: paths.calculate.financial.intrinsicValueOfGold
            },
            // {
            //   title: 'Margin Calculator (Coming Soon)',
            //   link: paths.comingSoon
            // },
            // {
            //   title: 'Budget Calculator (Coming Soon)',
            //   link: paths.comingSoon
            // },
            // {
            //   title: 'Investment Calculator (Coming Soon)',
            //   link: paths.comingSoon
            // },
          ]
        }
      ];

      setCards(CARDS);
    }
  }, [mounted, ready, t]); // Add ready and t to dependencies

  // Remove this console.log or make it conditional
  if (mounted) {
    console.log(cards);
  }

  return (cards.length > 0) && (
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
            {t('calculators.description')}
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">
            {t('calculators.title')}
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
        {cards.map((card: any, index) => (
          <m.div variants={varFade().inUp} key={card.title}>
            <Card
              sx={{
                textAlign: 'left',
                // boxShadow: { md: 'none' },
                fontFamily: 'peyda-light',
                bgcolor: 'background.default',
                p: (theme) => theme.spacing(2, 2, 4, 2),
                boxShadow: (theme) => ({
                  md: `-40px 40px 80px ${theme.palette.mode === 'light'
                    ? alpha(theme.palette.grey[500], 0.16)
                    : alpha(theme.palette.common.black, 0.4)
                    }`,
                }),
                ...(currentLang.value === 'fa' && {
                  textAlign: 'right',
                  direction: 'rtl',
                })
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

              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                {card.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}>
                {card.description}
              </Typography>

              <Stack spacing={2} mt={2}>
                {card?.items?.map((item: any) => (
                  <Button
                    key={item.title}
                    color="inherit"
                    size="small"
                    variant="text"
                    startIcon={
                      <Iconify icon="eva:external-link-fill" width={24}
                        sx={{
                          ...(currentLang.value === 'fa' && {
                            ml: 1
                          }),
                        }} />
                    }
                    target="_blank"
                    rel="noopener"
                    href={item.link}
                    sx={{ 
                      borderColor: 'text.primary', 
                      width: 'fit-content'
                    }}
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
