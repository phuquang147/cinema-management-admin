import { Stack, Typography } from "@mui/material";
import DonutChart from "~/components/Chart/DonutChart";
import { useAppSelector } from "~/redux/hooks";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

const ReportByDate = () => {
  const { movieReportByDate } = useAppSelector((state) => state.report);

  return (
    <Stack>
      <DonutChart
        series={[
          movieReportByDate?.data.soldTicketQuantity || 0,
          movieReportByDate?.data.remainingTicketQuantity || 0,
        ]}
        options={{ labels: ["Vé đã bán", "Vé còn lại"] }}
      />
      <Typography fontWeight="bold" textAlign="end">
        {printNumberWithCommas(movieReportByDate?.data.totalRevenue || 0)} VNĐ
      </Typography>
    </Stack>
  );
};

export default ReportByDate;
