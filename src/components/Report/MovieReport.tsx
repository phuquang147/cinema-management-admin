import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, KeyboardEvent, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Iconify from "~/components/Iconify";
import Table from "../Table";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import { GridRowParams } from "@mui/x-data-grid";
import DonutChart from "../Chart/DonutChart";

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
  //   {
  //     field: "abc",
  //     headerName: "Người đặt",
  //     headerClassName: "super-app-theme--header",
  //     headerAlign: "left",
  //     align: "left",
  //     minWidth: 200,
  //     renderCell: (params: GridRowParams<ITransaction>) => {
  //       const { row } = params;

  //       return row.staff ? (
  //         <Chip
  //           label="Nhân viên"
  //           color="success"
  //           sx={{
  //             bgcolor: "success.light",
  //             color: "success.dark",
  //             fontSize: "13px",
  //             fontWeight: "bold",
  //             width: "100px",
  //             borderRadius: "4px",
  //           }}
  //         />
  //       ) : (
  //         <Chip
  //           label="Khách hàng"
  //           color="info"
  //           sx={{
  //             bgcolor: "info.light",
  //             color: "info.dark",
  //             fontSize: "13px",
  //             fontWeight: "bold",
  //             width: "100px",
  //             borderRadius: "4px",
  //           }}
  //         />
  //       );
  //     },
  //   },
  {
    field: "soldTickets",
    headerName: "Số vé đã bán",
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
    field: "unsoldTickets",
    headerName: "Số vé còn lại",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    // renderCell: (params: GridRowParams<ITransaction>) => {
    //   const { row } = params;
    //   return (
    //     <Typography>{ISOToDateTimeFormat(row.showTime.startTime)}</Typography>
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

const data = [
  {
    id: "1babdasdas",
    date: "1/1/2023",
    soldTickets: 10,
    unsoldTickets: 20,
    totalRevenue: 100000,
  },
  {
    id: "1babdasddssdas",
    date: "1/1/2023",
    soldTickets: 10,
    unsoldTickets: 20,
    totalRevenue: 100000,
  },
];

const TIME_TYPES = [
  {
    value: "date",
    label: "Ngày",
  },
  {
    value: "month",
    label: "Tháng",
  },
];

const MovieReport: FC = () => {
  const [time, setTime] = useState<Date | null>(new Date());
  const [view, setView] = useState<"list" | "chart">("list");
  const [timeType, setTimeType] = useState(TIME_TYPES[0]);

  const handleChangeView = (
    event: React.MouseEvent<HTMLElement>,
    newView: "list" | "chart"
  ) => {
    setView(newView);
  };

  return (
    <Stack gap={4}>
      <Stack direction="row" gap={2}>
        <Autocomplete
          disablePortal
          options={[]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Phim" />}
          size="small"
        />
        <Autocomplete
          disablePortal
          options={TIME_TYPES}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Thời gian" />}
          disableClearable
          value={timeType}
          onChange={(_, value) => setTimeType(value)}
          size="small"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat="DD/MM/YYYY"
            value={time}
            onChange={(value) => {
              setTime(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                  e.preventDefault();
                }}
                size="small"
              />
            )}
          />
        </LocalizationProvider>
        <Button variant="contained">
          <Iconify icon="file-icons:microsoft-excel" sx={{ mr: 1 }} />
          Xuất Excel
        </Button>
      </Stack>

      {timeType.value === "date" && (
        <Stack>
          <DonutChart
            series={[44, 55]}
            options={{ labels: ["Vé đã bán", "Vé còn lại"] }}
          />
        </Stack>
      )}
      {timeType.value === "month" && (
        <Stack gap={2}>
          <Stack direction="row" justifyContent="end">
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleChangeView}
            >
              <ToggleButton value="list">
                <Iconify
                  icon="fluent:list-24-regular"
                  sx={{ height: 24, width: 24 }}
                />
              </ToggleButton>
              <ToggleButton value="chart">
                <Iconify icon="ph:chart-line" sx={{ height: 24, width: 24 }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
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
                    name: "Vé đã bán",
                    data: [31, 40, 28, 51, 42, 109, 100],
                  },
                  {
                    name: "Vé còn lại",
                    data: [11, 32, 45, 32, 34, 52, 41],
                  },
                ]}
                type="area"
                height={350}
              />
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
                    name: "Doanh thu",
                    data: [31, 40, 28, 51, 42, 109, 100],
                  },
                ]}
                type="area"
                height={350}
              />
            </Stack>
          )}
        </Stack>
      )}

      {/* <Box
      sx={{
        width: "100%",
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Không có dữ liệu</Typography>
    </Box> */}
    </Stack>
  );
};

export default MovieReport;
