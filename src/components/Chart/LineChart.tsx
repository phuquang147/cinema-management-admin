import { ApexOptions } from "apexcharts";
import { FC } from "react";
import ReactApexChart from "react-apexcharts";

const _ = require("lodash");

type LineChartProps = {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
};

const LineChart: FC<LineChartProps> = ({ series, options }) => {
  const chartOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
  };
  return (
    <ReactApexChart
      type="line"
      series={series}
      options={_.merge(chartOptions, options)}
      height={360}
    />
  );
};

export default LineChart;
