import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FC, useEffect } from "react";
import DonutChart from "~/components/Chart/DonutChart";
import Iconify from "~/components/Iconify";
import Table from "~/components/Table";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import {
  GeneralItemReport,
  GeneralMovieReport,
} from "~/redux/reducers/ReportReducer";
import { reportSagaActionTypes } from "~/redux/sagaActionTypes";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import NoData from "../Nodata";

const movieColumns = [
  {
    field: "thumbnail",
    headerName: "",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "center",
    minWidth: 50,
    sortable: false,
    renderCell: (params: GridRowParams<GeneralMovieReport>) => {
      const { row } = params;
      return <Avatar src={row.thumbnail} />;
    },
  },
  {
    field: "name",
    headerName: "Tên phim",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
    renderCell: (params: GridRowParams<GeneralMovieReport>) => {
      const { row } = params;
      return (
        <Typography
          noWrap
          textAlign="start"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {row.name}
        </Typography>
      );
    },
  },
  {
    field: "soldTicketQuantity",
    headerName: "Số lượng vé",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 180,
  },
  {
    field: "ticketRevenue",
    headerName: "Doanh thu",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams<GeneralMovieReport>) => {
      const { row } = params;
      return (
        <Typography>{printNumberWithCommas(row.ticketRevenue)} VNĐ</Typography>
      );
    },
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
    renderCell: (params: GridRowParams<GeneralItemReport>) => {
      const { row } = params;
      return <Avatar src={row.image} />;
    },
  },
  {
    field: "name",
    headerName: "Tên món",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 180,
    renderCell: (params: GridRowParams<GeneralItemReport>) => {
      const { row } = params;
      return <Typography>{printNumberWithCommas(row.quantity)}</Typography>;
    },
  },
  {
    field: "totalRevenue",
    headerName: "Doanh thu",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams<GeneralItemReport>) => {
      const { row } = params;
      return (
        <Typography>{printNumberWithCommas(row.totalPrice)} VNĐ</Typography>
      );
    },
  },
];

type ReportByDateProps = {
  view: "list" | "chart";
};

const ReportByDate: FC<ReportByDateProps> = ({ view }) => {
  const dispatch = useAppDispatch();
  const { dailyReport } = useAppSelector((state) => state.report);

  useEffect(() => {
    dispatch({
      type: reportSagaActionTypes.GET_DAILY_REPORT_SAGA,
      payload: { date: new Date().toISOString() },
    });
  }, [dispatch]);

  const handleExportMoviesReport = async () => {
    if (dailyReport) {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Báo cáo");

      sheet.columns = [
        {
          header: "Tên phim",
          key: "name",
          width: 50,
          style: { alignment: { horizontal: "left" } },
        },
        {
          header: "Số lượng vé",
          key: "soldTicketQuantity",
          width: 20,
          style: { alignment: { horizontal: "center" } },
        },
        {
          header: "Doanh thu",
          key: "ticketRevenue",
          width: 20,
          style: { alignment: { horizontal: "center" } },
        },
      ];

      sheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFa5d8ff" },
      };

      sheet.getRow(1).font = {
        bold: true,
      };

      for (let movie of dailyReport?.movies) {
        const { name, soldTicketQuantity, ticketRevenue } = movie;

        sheet.addRow({
          name,
          soldTicketQuantity,
          ticketRevenue: `${printNumberWithCommas(ticketRevenue)} VNĐ`,
        });
      }

      sheet.insertRow(1, {
        name: `Báo cáo chung ngày ${dailyReport.date.slice(0, 10)}`,
      });

      sheet.getRow(1).font = {
        bold: true,
      };

      sheet.eachRow({ includeEmpty: true }, function (row) {
        row.border = {
          bottom: { style: "thin" },
        };
        row.height = 40;
        row.alignment = { vertical: "middle" };
      });

      sheet.mergeCells(1, 1, 1, 3);
      sheet.getCell("A1").alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      sheet.insertRow(dailyReport.movies.length + 3, {
        soldTicketQuantity: "Tổng doanh thu",
        ticketRevenue:
          printNumberWithCommas(dailyReport.totalMovieRevenue) + " VNĐ",
      });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(
        new Blob([buf]),
        `Báo cáo chung ngày ${dailyReport.date.slice(0, 10)}.xlsx`
      );
    }
  };

  const handleExportItemsReport = async () => {
    if (dailyReport) {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Báo cáo");

      sheet.columns = [
        {
          header: "Tên món",
          key: "name",
          width: 50,
          style: { alignment: { horizontal: "left" } },
        },
        {
          header: "Số lượng",
          key: "quantity",
          width: 20,
          style: { alignment: { horizontal: "center" } },
        },
        {
          header: "Doanh thu",
          key: "totalPrice",
          width: 20,
          style: { alignment: { horizontal: "center" } },
        },
      ];

      sheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFa5d8ff" },
      };

      sheet.getRow(1).font = {
        bold: true,
      };

      for (let item of dailyReport?.items) {
        const { name, quantity, totalPrice } = item;

        sheet.addRow({
          name,
          quantity: `${printNumberWithCommas(quantity)}`,
          totalPrice: `${printNumberWithCommas(totalPrice)} VNĐ`,
        });
      }

      sheet.insertRow(1, {
        name: `Báo cáo chung ngày ${dailyReport.date.slice(0, 10)}`,
      });

      sheet.getRow(1).font = {
        bold: true,
      };

      sheet.eachRow({ includeEmpty: true }, function (row) {
        row.border = {
          bottom: { style: "thin" },
        };
        row.height = 40;
        row.alignment = { vertical: "middle" };
      });

      sheet.mergeCells(1, 1, 1, 3);
      sheet.getCell("A1").alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      sheet.insertRow(dailyReport.items.length + 3, {
        quantity: "Tổng doanh thu",
        totalPrice:
          printNumberWithCommas(dailyReport.totalItemRevenue) + " VNĐ",
      });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(
        new Blob([buf]),
        `Báo cáo chung ngày ${dailyReport.date.slice(0, 10)}.xlsx`
      );
    }
  };

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
            {dailyReport ? (
              <Stack direction="column" alignItems="end" gap={2}>
                <Box height={500} width="100%">
                  <Table rows={dailyReport?.movies} columns={movieColumns} />
                </Box>
                <Button variant="contained" onClick={handleExportMoviesReport}>
                  <Iconify icon="file-icons:microsoft-excel" sx={{ mr: 1 }} />
                  Xuất Excel
                </Button>
              </Stack>
            ) : (
              <NoData />
            )}
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
            {dailyReport ? (
              <Stack direction="column" alignItems="end" gap={2}>
                <Box height={500} width="100%">
                  <Table rows={dailyReport?.items} columns={snackColumns} />
                </Box>
                <Button variant="contained" onClick={handleExportItemsReport}>
                  <Iconify icon="file-icons:microsoft-excel" sx={{ mr: 1 }} />
                  Xuất Excel
                </Button>
              </Stack>
            ) : (
              <NoData />
            )}
          </Box>
        </Stack>
      )}
      {view === "chart" && (
        <DonutChart
          series={[
            dailyReport ? dailyReport?.totalMovieRevenue : 0,
            dailyReport ? dailyReport?.totalItemRevenue : 0,
          ]}
          options={{ labels: ["Vé", "Bắp nước"] }}
        />
      )}
    </Stack>
  );
};

export default ReportByDate;
