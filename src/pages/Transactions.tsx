import { Card, Chip, Container, Stack, Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import ActionsMenu from "~/components/ActionsMenu";
import Table from "~/components/Table";
import TransactionDetail from "~/components/Transactions/TransactionDetail";
import Transaction from "~/interfaces/transaction.interface";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

const transactions: Transaction[] = [
  {
    _id: "tran1",
    name: "Phu Quang",
    movieName: "Fast and Furious",
    showTime: new Date().toISOString(),
    bookTime: new Date().toISOString(),
    seats: ["A1", "A2", "A3", "A4"],
    total: 500000,
  },
];

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 120,
  },
  {
    field: "name",
    headerName: "Tên người đặt",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
    renderCell: (params: GridRowParams) => {
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
    field: "abc",
    headerName: "Loại người đặt",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return (
        <Chip
          label="Khách hàng"
          color="info"
          sx={{
            bgcolor: "info.light",
            color: "info.dark",
            fontSize: "13px",
            fontWeight: "bold",
            width: "100px",
            borderRadius: "4px",
          }}
        />
      );
    },
  },
  {
    field: "movieName",
    headerName: "Phim",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 180,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return (
        <Typography
          noWrap
          textAlign="start"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {row.movieName}
        </Typography>
      );
    },
  },
  {
    field: "showTime",
    headerName: "Xuất chiếu",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return <Typography>{ISOToDateTimeFormat(row.showTime)}</Typography>;
    },
  },
  {
    field: "bookTime",
    headerName: "Thời gian đặt",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return <Typography>{ISOToDateTimeFormat(row.showTime)}</Typography>;
    },
  },
  {
    field: "seats",
    headerName: "Ghế",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 160,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return (
        <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {row.seats.join(", ")}
        </Typography>
      );
    },
  },
  {
    field: "total",
    headerName: "Tổng tiền",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 150,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return (
        <Typography fontWeight={800} color="primary">
          {printNumberWithCommas(row.total)} VNĐ
        </Typography>
      );
    },
  },
  {
    field: "Hành động",
    headerName: "",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "right",
    sortable: false,
    hideable: false,
    filterable: false,
    minWidth: 60,
    flex: 1,
    renderCell: (params: any) => {
      const { handleEdit, handleOpenDetail, handleDelete, ...actor } =
        params.row;

      return (
        <ActionsMenu
          item={actor}
          handleOpenDetail={handleOpenDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    },
  },
];

const Transactions: React.FC = () => {
  const [transactionDetail, setTransactionDetail] =
    useState<Transaction | null>(null);

  const handleOpenTransactionDetail = (transaction: Transaction) => {
    setTransactionDetail(transaction);
  };

  const handleCloseTransactionDetail = () => {
    setTransactionDetail(null);
  };
  //   const dispatch = useAppDispatch();
  //   const actors = useAppSelector((state) => state.actor.actors);

  const mappedRows = transactions.map((transaction: Transaction) => ({
    ...transaction,
    id: transaction._id,
    handleOpenDetail: handleOpenTransactionDetail,
  }));

  //   useEffect(() => {
  //     dispatch({ type: actorSagaActionTypes.GET_ACTORS_SAGA });
  //   }, [dispatch]);

  const handleShowTransactionDetail = (a: any) => {
    console.log(a);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        columnGap={2}
      >
        <Typography variant="h4">Giao dịch</Typography>
      </Stack>

      <Card
        sx={{
          width: "100%",
          "& .super-app-theme--header": {
            fontWeight: "bold",
            color: "#222",
            fontSize: "16px",
          },
        }}
      >
        <Table
          rows={mappedRows}
          columns={columns}
          onRowClick={handleShowTransactionDetail}
        />
      </Card>
      <TransactionDetail
        open={!!transactionDetail}
        onClose={handleCloseTransactionDetail}
      />
    </Container>
  );
};

export default Transactions;
