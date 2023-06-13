import { FC } from "react";
import DonutChart from "../Chart/DonutChart";

type SoldTicketsProps = {
  soldTickets: number;
  remainingTickets: number;
};

const SoldTickets: FC<SoldTicketsProps> = ({
  soldTickets,
  remainingTickets,
}) => {
  const chartOptions = {
    labels: ["Vẽ đã bán", "Vé còn lại"],
  };

  return (
    <DonutChart
      options={chartOptions}
      series={[soldTickets, remainingTickets]}
    />
  );
};

export default SoldTickets;
