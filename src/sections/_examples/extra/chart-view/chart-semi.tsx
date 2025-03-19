import { styled, useTheme } from '@mui/material/styles';

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
  series: number[];
};

export default function ChartSemi({ series }: Props) {
  const theme = useTheme();

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    fill: {
      type: 'color',
      colors: ["#000000"]
    },
    legend: {
      show: false,
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
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
        dataLabels: {
          value: {
            offsetY: 14,
          },
          total: {
            label: 'BMI',
            formatter: () => fNumber(2324),
          },
        },
      },
    },
  });

  return (
    <StyledChart
      dir="ltr"
      type="radialBar"
      series={series}
      options={chartOptions}
      width="100%"
      height={280}
    />
  );
}
