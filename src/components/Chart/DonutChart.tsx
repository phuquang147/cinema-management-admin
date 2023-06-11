import { ApexOptions } from "apexcharts";
import { FC } from "react";
import ReactApexChart from "react-apexcharts";

type DonutChartProps = {
  series: number[];
  options: ApexOptions;
};

const DonutChart: FC<DonutChartProps> = ({ series, options }) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={360}
    />
  );
};
export default DonutChart;
