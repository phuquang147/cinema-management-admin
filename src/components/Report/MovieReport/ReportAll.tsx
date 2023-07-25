import { Box, Button, Stack, Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FC } from "react";
import LineChart from "~/components/Chart/LineChart";
import Iconify from "~/components/Iconify";
import Table from "~/components/Table";
import { useAppSelector } from "~/redux/hooks";
import { MovieReport } from "~/redux/reducers/ReportReducer";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

const columns = [
  {
    field: "date",
    headerName: "Ngày",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
  },
  {
    field: "soldTicketQuantity",
    headerName: "Số vé đã bán",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 180,
    renderCell: (params: GridRowParams<MovieReport>) => {
      const { row } = params;
      return (
        <Typography>{printNumberWithCommas(row.soldTicketQuantity)}</Typography>
      );
    },
  },
  {
    field: "remainingTicketQuantity",
    headerName: "Số vé còn lại",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams<MovieReport>) => {
      const { row } = params;
      return (
        <Typography>
          {printNumberWithCommas(row.remainingTicketQuantity)}
        </Typography>
      );
    },
  },
  {
    field: "totalRevenue",
    headerName: "Doanh thu",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams<MovieReport>) => {
      const { row } = params;
      return (
        <Typography>{printNumberWithCommas(row.totalRevenue)} VNĐ</Typography>
      );
    },
  },
];

type ReportAllProps = {
  view: "list" | "chart";
};

const ReportAll: FC<ReportAllProps> = ({ view }) => {
  const { movieReport } = useAppSelector((state) => state.report);

  const handleExportMovieReport = async () => {
    if (movieReport) {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Báo cáo");

      sheet.columns = [
        {
          header: "Ngày",
          key: "date",
          width: 30,
          style: { alignment: { horizontal: "left" } },
        },
        {
          header: "Số vẽ đã bán",
          key: "soldTicketQuantity",
          width: 30,
          style: { alignment: { horizontal: "center" } },
        },
        {
          header: "Số vé còn lại",
          key: "remainingTicketQuantity",
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

      for (let movie of movieReport.data) {
        const { soldTicketQuantity, remainingTicketQuantity, totalRevenue } =
          movie;

        const { date } = movie;

        sheet.addRow({
          date,
          soldTicketQuantity: `${printNumberWithCommas(soldTicketQuantity)}`,
          remainingTicketQuantity: `${printNumberWithCommas(
            remainingTicketQuantity
          )}`,
          totalRevenue: `${printNumberWithCommas(totalRevenue)} VNĐ`,
        });
      }

      sheet.insertRow(1, {
        date: `Báo cáo phim "${movieReport.movie}"`,
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
      saveAs(new Blob([buf]), `Báo cáo phim ${movieReport.movie}.xlsx`);
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
          <Stack direction="column" alignItems="end" gap={2}>
            <Box height={500} width="100%">
              <Table rows={movieReport?.data || []} columns={columns} />
            </Box>
            <Button variant="contained" onClick={handleExportMovieReport}>
              <Iconify icon="file-icons:microsoft-excel" sx={{ mr: 1 }} />
              Xuất Excel
            </Button>
          </Stack>
        </Box>
      )}
      {view === "chart" && (
        <Stack gap={10}>
          <LineChart
            options={{
              xaxis: {
                type: "category",
                categories: movieReport?.data.map((report) => report.date),
              },
            }}
            series={[
              {
                name: "Vé đã bán",
                data:
                  movieReport?.data.map(
                    (report) => report.soldTicketQuantity
                  ) || [],
              },
              {
                name: "Vé còn lại",
                data:
                  movieReport?.data.map(
                    (report) => report.remainingTicketQuantity
                  ) || [],
              },
            ]}
          />
          <LineChart
            options={{
              xaxis: {
                type: "category",
                categories: movieReport?.data.map((report) => report.date),
              },
            }}
            series={[
              {
                name: "Doanh thu",
                data:
                  movieReport?.data.map((report) => report.totalRevenue) || [],
              },
            ]}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ReportAll;
