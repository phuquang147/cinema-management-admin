import { Box, Button, Stack, Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FC, useEffect } from "react";
import LineChart from "~/components/Chart/LineChart";
import Iconify from "~/components/Iconify";
import Table from "~/components/Table";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { GeneralDateInMonthReport } from "~/redux/reducers/ReportReducer";
import { reportSagaActionTypes } from "~/redux/sagaActionTypes";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import NoData from "../Nodata";

const columns = [
  {
    field: "date",
    headerName: "Ngày",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
    renderCell: (params: GridRowParams<GeneralDateInMonthReport>) => {
      const { row } = params;
      return <Typography>{row.date.slice(0, 10)}</Typography>;
    },
  },
  {
    field: "ticketRevenue",
    headerName: "Danh thu vé",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 180,
    renderCell: (params: GridRowParams<GeneralDateInMonthReport>) => {
      const { row } = params;
      return (
        <Typography>{printNumberWithCommas(row.ticketRevenue)} VNĐ</Typography>
      );
    },
  },

  {
    field: "itemRevenue",
    headerName: "Danh thu bắp nước",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams<GeneralDateInMonthReport>) => {
      const { row } = params;
      return (
        <Typography>{printNumberWithCommas(row.itemRevenue)} VNĐ</Typography>
      );
    },
  },
  {
    field: "totalRevenue",
    headerName: "Tổng doanh thu",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams<GeneralDateInMonthReport>) => {
      const { row } = params;
      return (
        <Typography>{printNumberWithCommas(row.totalRevenue)} VNĐ</Typography>
      );
    },
  },
];

type ReportByMonthProps = {
  view: "list" | "chart";
};

const ReportByMonth: FC<ReportByMonthProps> = ({ view }) => {
  const dispatch = useAppDispatch();
  const { monthlyReport } = useAppSelector((state) => state.report);

  useEffect(() => {
    dispatch({
      type: reportSagaActionTypes.GET_MONTHLY_REPORT_SAGA,
      payload: {
        data: { month: new Date().getMonth(), year: new Date().getFullYear() },
      },
    });
  }, [dispatch]);

  const handleExportMonthReport = async () => {
    if (monthlyReport) {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Báo cáo");

      sheet.columns = [
        {
          header: "Ngày",
          key: "date",
          width: 50,
          style: { alignment: { horizontal: "left" } },
        },
        {
          header: "Doanh thu vé",
          key: "ticketRevenue",
          width: 20,
          style: { alignment: { horizontal: "center" } },
        },
        {
          header: "Doanh thu bắp nước",
          key: "itemRevenue",
          width: 20,
          style: { alignment: { horizontal: "center" } },
        },
        {
          header: "Tổng doanh thu",
          key: "totalRevenue",
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

      for (let movie of monthlyReport?.data) {
        const { date, itemRevenue, ticketRevenue, totalRevenue } = movie;

        sheet.addRow({
          date: date.slice(0, 10),
          ticketRevenue: `${printNumberWithCommas(ticketRevenue)} VNĐ`,
          itemRevenue: `${printNumberWithCommas(itemRevenue)} VNĐ`,
          totalRevenue: `${printNumberWithCommas(totalRevenue)} VNĐ`,
        });
      }

      sheet.insertRow(1, {
        name: `Báo cáo tháng ${monthlyReport.month} năm ${monthlyReport.year}`,
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

      sheet.mergeCells(1, 1, 1, 4);
      sheet.getCell("A1").alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      // sheet.insertRow(monthlyReport.movies.length + 3, {
      //   soldTicketQuantity: "Tổng doanh thu",
      //   ticketRevenue:
      //     printNumberWithCommas(dailyReport.totalMovieRevenue) + " VNĐ",
      // });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(
        new Blob([buf]),
        `Báo cá tháng ${monthlyReport.month} năm ${monthlyReport.year}.xlsx`
      );
    }
  };

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
          {monthlyReport ? (
            <Stack direction="column" alignItems="end" gap={2}>
              <Box height={500} width="100%">
                <Table rows={monthlyReport.data} columns={columns} />
              </Box>
              <Button variant="contained" onClick={handleExportMonthReport}>
                <Iconify icon="file-icons:microsoft-excel" sx={{ mr: 1 }} />
                Xuất Excel
              </Button>
            </Stack>
          ) : (
            <NoData />
          )}
        </Box>
      )}
      {view === "chart" && (
        <Stack>
          <LineChart
            options={{
              xaxis: {
                type: "datetime",
                categories: monthlyReport?.data.map((report) => report.date),
              },
              tooltip: {
                x: {
                  format: "dd/MM/yyyy",
                },
              },
            }}
            series={[
              {
                name: "Vé",
                data: monthlyReport?.data.map(
                  (report) => report.ticketRevenue
                ) as number[],
              },
              {
                name: "Bắp nước",
                data: monthlyReport?.data.map(
                  (report) => report.itemRevenue
                ) as number[],
              },
            ]}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ReportByMonth;
