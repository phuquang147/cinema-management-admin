import { Box, Chip, Divider, Grid, Typography, useTheme } from "@mui/material";
import Modal from "~/HOC/Modal";
import Transaction from "~/interfaces/transaction.interface";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

type TransactionDetailProps = {
  open: boolean;
  // staff: IStaff | null;
  onClose: () => void;
};

const transaction: Transaction = {
  _id: "tran1",
  name: "Phu Quang",
  movieName: "Fast and Furious",
  showTime: new Date().toISOString(),
  bookTime: new Date().toISOString(),
  seats: [
    "A1",
    "A2asdasdasd",
    "A3asdasdas",
    "A4asdasds",
    "A5sdfsdfs",
    "A6",
    "A7",
    "A8",
  ],
  snacks: [
    { id: "rasdasd", name: "Combo bắp nước lớn asd", price: 50000 },
    { id: "rasdad", name: "Combo bắp nước lớn", price: 50000 },
  ],
  total: 500000,
};

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Modal title="Chi tiết giao dịch" open={open} onClose={onClose}>
      <Grid container sx={{ width: 600, maxWidth: "100%" }} rowGap={1}>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            ID:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>{transaction._id}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Tên người đặt:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>{transaction.name}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Loại người đặt:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
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
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Phim:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>{transaction.movieName}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Xuất chiếu:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>{ISOToDateTimeFormat(transaction.showTime)}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Thời gian đặt:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>{ISOToDateTimeFormat(transaction.bookTime)}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Ghế đã chọn:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>{transaction.seats.join(", ")}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Món đã chọn:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            {transaction.snacks?.map((snack) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{snack.name}</Typography>
                <Typography color="primary" fontWeight={800}>
                  {printNumberWithCommas(snack.price)} VNĐ
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ margin: 0, textAlign: "end" }}>
        Tổng tiền:{" "}
        <span style={{ color: theme.palette.primary.main }}>
          {printNumberWithCommas(transaction.total)} VNĐ
        </span>
      </Typography>
    </Modal>
  );
};

export default TransactionDetail;
