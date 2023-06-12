import { Box, Stack } from "@mui/material";
import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import Table from "~/components/Table";

const columns = [
  {
    field: "date",
    headerName: "Ngày",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
    // renderCell: (params: any) => {
    //   const { row } = params;
    //   return (
    //     <Typography
    //       noWrap
    //       textAlign="start"
    //       sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
    //     >
    //       {row.staff ? row.staff.name : row.customer?.name}
    //     </Typography>
    //   );
    // },
  },

  {
    field: "ticketRevenue",
    headerName: "Danh thu vé",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 180,
    // renderCell: (params: GridRowParams<ITransaction>) => {
    //   const { row } = params;
    //   return (
    //     <Typography
    //       noWrap
    //       textAlign="start"
    //       sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
    //     >
    //       {row.showTime.movie}
    //     </Typography>
    //   );
    // },
  },

  {
    field: "snackRevenue",
    headerName: "Danh thu bắp nước",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    // renderCell: (params: GridRowParams<ITransaction>) => {
    //   const { row } = params;
    //   return <Typography>{ISOToDateTimeFormat(row.createdAt)}</Typography>;
    // },
  },
  {
    field: "totalRevenue",
    headerName: "Tổng doanh thu",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    // renderCell: (params: GridRowParams<ITransaction>) => {
    //   const { row } = params;
    //   return <Typography>{ISOToDateTimeFormat(row.createdAt)}</Typography>;
    // },
  },
];

const data = [
  {
    id: "1babdasdas",
    date: "1/1/2023",
    ticketRevenue: 10,
    snackRevenue: 20,
    totalRevenue: 100000,
  },
  {
    id: "1babdasddssdas",
    date: "1/1/2023",
    ticketRevenue: 10,
    snackRevenue: 20,
    totalRevenue: 100000,
  },
];

type ReportByYearProps = {
  view: "list" | "chart";
};

const ReportByYear: FC<ReportByYearProps> = ({ view }) => {
  return (
    <Stack gap={2}>
      {view === "list" && (
        <Box
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              fontWeight: "bold",
              color: "#222",
              fontSize: "16px",
            },
          }}
        >
          <Table rows={data} columns={columns} />
        </Box>
      )}
      {view === "chart" && (
        <Stack>
          <ReactApexChart
            options={{
              chart: {
                height: 350,
                type: "area",
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              xaxis: {
                type: "datetime",
                categories: [
                  "2018-09-19T00:00:00.000Z",
                  "2018-09-19T01:30:00.000Z",
                  "2018-09-19T02:30:00.000Z",
                  "2018-09-19T03:30:00.000Z",
                  "2018-09-19T04:30:00.000Z",
                  "2018-09-19T05:30:00.000Z",
                  "2018-09-19T06:30:00.000Z",
                ],
              },
              tooltip: {
                x: {
                  format: "dd/MM/yy HH:mm",
                },
              },
            }}
            series={[
              {
                name: "Vé",
                data: [31, 40, 28, 51, 42, 109, 100],
              },
              {
                name: "Bắp nước",
                data: [11, 32, 45, 32, 34, 52, 41],
              },
            ]}
            type="area"
            height={350}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ReportByYear;
