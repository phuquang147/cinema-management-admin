import { ApexOptions } from "apexcharts";
import { FC } from "react";
import ReactApexChart from "react-apexcharts";

const _ = require("lodash");

type BarChartProps = {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
  height: number;
};

const BarChart: FC<BarChartProps> = ({ series, options, height }) => {
  const chartOptions = {
    plotOptions: {
      bar: { horizontal: true, barHeight: "80%", borderRadius: 2 },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
  };

  return (
    <ReactApexChart
      type="bar"
      series={series}
      options={_.merge(chartOptions, options)}
      height={height}
    />
  );
};

export default BarChart;
