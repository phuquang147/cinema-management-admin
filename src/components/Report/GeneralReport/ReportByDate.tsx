import { Avatar, Box, Stack } from "@mui/material";
import { FC } from "react";
import DonutChart from "~/components/Chart/DonutChart";
import Table from "~/components/Table";

const movieColumns = [
  {
    field: "thumbnail",
    headerName: "",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "center",
    minWidth: 50,
    sortable: false,
    renderCell: (params: any) => {
      const { row } = params;
      return <Avatar />;
    },
  },
  {
    field: "name",
    headerName: "Tên phim",
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
    field: "soldTickets",
    headerName: "Số lượng vé",
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
    field: "totalRevenue",
    headerName: "Danh thu",
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

const snackColumns = [
  {
    field: "thumbnail",
    headerName: "",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "center",
    minWidth: 50,
    sortable: false,
    renderCell: (params: any) => {
      const { row } = params;
      return <Avatar />;
    },
  },
  {
    field: "name",
    headerName: "Tên món",
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
    field: "sold",
    headerName: "Số lượng",
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
    field: "totalRevenue",
    headerName: "Danh thu",
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

const movieData = [
  {
    id: "1babdasdas",
    name: "Fast And Furious",
    soldTickets: 10,
    unsoldTickets: 20,
    totalRevenue: 100000,
  },
  {
    id: "1babdasddssdas",
    name: "Fast And Furious",
    soldTickets: 10,
    unsoldTickets: 20,
    totalRevenue: 100000,
  },
];

const snackData = [
  {
    id: "1babdasdas",
    name: "Fast And Furious",
    sold: 10,
    unsoldTickets: 20,
    totalRevenue: 100000,
  },
  {
    id: "1babdasddssdas",
    name: "Fast And Furious",
    sold: 10,
    unsoldTickets: 20,
    totalRevenue: 100000,
  },
];

type ReportByDateProps = {
  view: "list" | "chart";
};

const ReportByDate: FC<ReportByDateProps> = ({ view }) => {
  return (
    <Stack gap={2}>
      {view === "list" && (
        <Stack gap={2}>
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
            <Table rows={movieData} columns={movieColumns} />
          </Box>

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
            <Table rows={snackData} columns={snackColumns} />
          </Box>
        </Stack>
      )}
      {view === "chart" && (
        <DonutChart
          series={[44, 55]}
          options={{ labels: ["Vé", "Bắp nước"] }}
        />
        // <Stack>
        //   <ReactApexChart
        //     options={{
        //       chart: {
        //         height: 350,
        //         type: "area",
        //       },
        //       dataLabels: {
        //         enabled: false,
        //       },
        //       stroke: {
        //         curve: "smooth",
        //       },
        //       xaxis: {
        //         type: "datetime",
        //         categories: [
        //           "2018-09-19T00:00:00.000Z",
        //           "2018-09-19T01:30:00.000Z",
        //           "2018-09-19T02:30:00.000Z",
        //           "2018-09-19T03:30:00.000Z",
        //           "2018-09-19T04:30:00.000Z",
        //           "2018-09-19T05:30:00.000Z",
        //           "2018-09-19T06:30:00.000Z",
        //         ],
        //       },
        //       tooltip: {
        //         x: {
        //           format: "dd/MM/yy HH:mm",
        //         },
        //       },
        //     }}
        //     series={[
        //       {
        //         name: "Vé đã bán",
        //         data: [31, 40, 28, 51, 42, 109, 100],
        //       },
        //       {
        //         name: "Vé còn lại",
        //         data: [11, 32, 45, 32, 34, 52, 41],
        //       },
        //     ]}
        //     type="area"
        //     height={350}
        //   />
        //   <ReactApexChart
        //     options={{
        //       chart: {
        //         height: 350,
        //         type: "area",
        //       },
        //       dataLabels: {
        //         enabled: false,
        //       },
        //       stroke: {
        //         curve: "smooth",
        //       },
        //       xaxis: {
        //         type: "datetime",
        //         categories: [
        //           "2018-09-19T00:00:00.000Z",
        //           "2018-09-19T01:30:00.000Z",
        //           "2018-09-19T02:30:00.000Z",
        //           "2018-09-19T03:30:00.000Z",
        //           "2018-09-19T04:30:00.000Z",
        //           "2018-09-19T05:30:00.000Z",
        //           "2018-09-19T06:30:00.000Z",
        //         ],
        //       },
        //       tooltip: {
        //         x: {
        //           format: "dd/MM/yy HH:mm",
        //         },
        //       },
        //     }}
        //     series={[
        //       {
        //         name: "Doanh thu",
        //         data: [31, 40, 28, 51, 42, 109, 100],
        //       },
        //     ]}
        //     type="area"
        //     height={350}
        //   />
        // </Stack>
      )}
    </Stack>
  );
};

export default ReportByDate;
