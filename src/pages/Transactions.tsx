import { Card, Chip, Container, Stack, Typography } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ActionsMenu from "~/components/ActionsMenu";
import Table from "~/components/Table";
import TransactionDetail from "~/components/Transactions/TransactionDetail";
import ITransaction from "~/interfaces/transaction.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { transactionSagaActionTypes } from "~/redux/sagaActionTypes";
import AuthorizeContainer from "~/routes/AuthorizeContainer";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

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
    renderCell: (params: GridRowParams<ITransaction>) => {
      const { row } = params;
      return (
        <Typography
          noWrap
          textAlign="start"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {row.staff ? row.staff.name : row.customer?.name}
        </Typography>
      );
    },
  },
  {
    field: "abc",
    headerName: "Người đặt",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
    renderCell: (params: GridRowParams<ITransaction>) => {
      const { row } = params;

      return row.staff ? (
        <Chip
          label="Nhân viên"
          color="success"
          sx={{
            bgcolor: "success.light",
            color: "success.dark",
            fontSize: "13px",
            fontWeight: "bold",
            width: "100px",
            borderRadius: "4px",
          }}
        />
      ) : (
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
    renderCell: (params: GridRowParams<ITransaction>) => {
      const { row } = params;
      return (
        <Typography
          noWrap
          textAlign="start"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {row.showTime.movie}
        </Typography>
      );
    },
  },
  {
    field: "showTime",
    headerName: "Suất chiếu",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams<ITransaction>) => {
      const { row } = params;
      return (
        <Typography>{ISOToDateTimeFormat(row.showTime.startTime)}</Typography>
      );
    },
  },
  {
    field: "bookTime",
    headerName: "Thời gian đặt",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 170,
    renderCell: (params: GridRowParams<ITransaction>) => {
      const { row } = params;
      return <Typography>{ISOToDateTimeFormat(row.createdAt)}</Typography>;
    },
  },
  {
    field: "seats",
    headerName: "Ghế",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 160,
    renderCell: (params: GridRowParams<ITransaction>) => {
      const { row } = params;
      return (
        <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {row.tickets.map((ticket) => ticket.seat.name).join(", ")}
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
    renderCell: (params: GridRowParams<ITransaction>) => {
      const { row } = params;
      return (
        <Typography fontWeight={800} color="primary">
          {printNumberWithCommas(row.totalPrice)} VNĐ
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
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transaction);
  const [transactionDetail, setTransactionDetail] =
    useState<ITransaction | null>(null);

  const handleOpenTransactionDetail = (transaction: ITransaction) => {
    setTransactionDetail(transaction);
  };

  const handleCloseTransactionDetail = () => {
    setTransactionDetail(null);
  };

  const mappedRows = transactions.map((transaction: ITransaction) => ({
    ...transaction,
    id: transaction._id,
    handleOpenDetail: handleOpenTransactionDetail,
  }));

  useEffect(() => {
    dispatch({ type: transactionSagaActionTypes.GET_TRANSACTIONS_SAGA });
  }, [dispatch]);

  return (
    <AuthorizeContainer>
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
          <Table rows={mappedRows} columns={columns} />
        </Card>
        <TransactionDetail
          open={!!transactionDetail}
          transaction={transactionDetail}
          onClose={handleCloseTransactionDetail}
        />
      </Container>
    </AuthorizeContainer>
  );
};

export default Transactions;
