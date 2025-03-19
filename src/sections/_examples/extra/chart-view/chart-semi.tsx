import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Chart, { useChart } from 'src/components/chart';
import { fNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 380;
const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    marginBottom: theme.spacing(3),
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  bmi?: number;
};

export default function ChartSemi({ bmi = 48 }: Props) {

  // Determine color based on BMI value
  const getBmiColor = (bmiValue: number) => {
    if (bmiValue < 18.5) return '#3b82f6'; // Underweight - blue
    if (bmiValue >= 18.5 && bmiValue < 25) return '#22c55e'; // Normal - green
    if (bmiValue >= 25 && bmiValue < 30) return '#eab308'; // Overweight - yellow
    return '#ef4444'; // Obese - red
  };

  // For radialBar, the series must be a percentage (0-100)
  // We'll map our BMI range (1-50) to a percentage
  const bmiPercentage = Math.min(100, Math.max(0, (bmi / 50) * 100));

  const bmiColor = getBmiColor(bmi);

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: [bmiColor],
    fill: {
      type: 'solid',
    },
    stroke: {
      lineCap: 'round',
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '60%',
        },
        track: {
          background: '#f2f2f2',
          strokeWidth: '97%',
          margin: 5,
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: -30,
          },
          value: {
            offsetY: -16,
            fontSize: '22px',
            fontWeight: 600,
            formatter: () => fNumber(bmi),
          },
          total: {
            show: true,
            label: 'Your BMI:',
            fontSize: '16px',
            fontWeight: 600,
            formatter: () => `${bmi}`,
          },
        },
      },
    },
  });

  return (
    <Box sx={{ position: 'relative' }}>
      <StyledChart
        dir="ltr"
        type="radialBar"
        series={[bmiPercentage]} // Use the calculated percentage
        options={chartOptions}
        width="100%"
        height={280}
      />

      {/* BMI Legend */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        mt: -20
      }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          BMI Categories:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
              width: 12,
              height: 12,
              bgcolor: '#3b82f6',
              borderRadius: '50%',
              mr: 0.5
            }} />
            <Typography variant="caption">Underweight: &lt;18.5</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
              width: 12,
              height: 12,
              bgcolor: '#22c55e',
              borderRadius: '50%',
              mr: 0.5
            }} />
            <Typography variant="caption">Normal: 18.5-24.9</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
              width: 12,
              height: 12,
              bgcolor: '#eab308',
              borderRadius: '50%',
              mr: 0.5
            }} />
            <Typography variant="caption">Overweight: 25-29.9</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
              width: 12,
              height: 12,
              bgcolor: '#ef4444',
              borderRadius: '50%',
              mr: 0.5
            }} />
            <Typography variant="caption">Obese: 30+</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
