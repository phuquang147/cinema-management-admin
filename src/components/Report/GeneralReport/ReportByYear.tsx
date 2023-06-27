import { Box, Button, Stack, Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FC, useEffect } from "react";
import LineChart from "~/components/Chart/LineChart";
import Iconify from "~/components/Iconify";
import Table from "~/components/Table";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { GeneralMonthInYearReport } from "~/redux/reducers/ReportReducer";
import { reportSagaActionTypes } from "~/redux/sagaActionTypes";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import NoData from "../Nodata";

const columns = [
  {
    field: "month",
    headerName: "Tháng",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
  },

  {
    field: "ticketRevenue",
    headerName: "Danh thu vé",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 180,
    renderCell: (params: GridRowParams<GeneralMonthInYearReport>) => {
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
    minWidth: 200,
    renderCell: (params: GridRowParams<GeneralMonthInYearReport>) => {
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
    renderCell: (params: GridRowParams<GeneralMonthInYearReport>) => {
      const { row } = params;
      return (
        <Typography>{printNumberWithCommas(row.totalRevenue)} VNĐ</Typography>
      );
    },
  },
];

type ReportByYearProps = {
  view: "list" | "chart";
};

const ReportByYear: FC<ReportByYearProps> = ({ view }) => {
  const dispatch = useAppDispatch();
  const { yearlyReport } = useAppSelector((state) => state.report);

  useEffect(() => {
    dispatch({
      type: reportSagaActionTypes.GET_YEARLY_REPORT_SAGA,
      payload: {
        year: new Date().getFullYear(),
      },
    });
  }, [dispatch]);

  const handleExportYearReport = async () => {
    if (yearlyReport) {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Báo cáo");

      sheet.columns = [
        {
          header: "Tháng",
          key: "month",
          width: 30,
          style: { alignment: { horizontal: "left" } },
        },
        {
          header: "Doanh thu vé",
          key: "ticketRevenue",
          width: 30,
          style: { alignment: { horizontal: "center" } },
        },
        {
          header: "Doanh thu bắp nước",
          key: "itemRevenue",
          width: 30,
          style: { alignment: { horizontal: "center" } },
        },
        {
          header: "Tổng doanh thu",
          key: "totalRevenue",
          width: 30,
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

      for (let data of yearlyReport?.data) {
        const { month, itemRevenue, ticketRevenue, totalRevenue } = data;

        sheet.addRow({
          month: `Tháng ${month}`,
          ticketRevenue: `${printNumberWithCommas(ticketRevenue)} VNĐ`,
          itemRevenue: `${printNumberWithCommas(itemRevenue)} VNĐ`,
          totalRevenue: `${printNumberWithCommas(totalRevenue)} VNĐ`,
        });
      }

      sheet.insertRow(1, {
        name: `Báo cáo năm ${yearlyReport.year}`,
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

      // sheet.insertRow(yearlyReport.movies.length + 3, {
      //   soldTicketQuantity: "Tổng doanh thu",
      //   ticketRevenue:
      //     printNumberWithCommas(dailyReport.totalMovieRevenue) + " VNĐ",
      // });

      const buf = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buf]), `Báo cáo năm ${yearlyReport.year}.xlsx`);
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
          {yearlyReport ? (
            <Stack direction="column" alignItems="end" gap={2}>
              <Box height={500} width="100%">
                <Table rows={yearlyReport.data} columns={columns} />
              </Box>
              <Button variant="contained" onClick={handleExportYearReport}>
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
                type: "category",
                categories: yearlyReport?.data.map(
                  (data) => `Tháng ${data.month}`
                ),
              },
            }}
            series={[
              {
                name: "Vé",
                data: yearlyReport?.data.map(
                  (data) => data.ticketRevenue
                ) as number[],
              },
              {
                name: "Bắp nước",
                data: yearlyReport?.data.map(
                  (data) => data.itemRevenue
                ) as number[],
              },
            ]}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ReportByYear;
