import {
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Modal from "~/HOC/Modal";
import ITransaction from "~/interfaces/transaction.interface";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

type TransactionDetailProps = {
  open: boolean;
  transaction: ITransaction | null;
  onClose: () => void;
};

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  open,
  transaction,
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
          <Typography>{transaction ? transaction._id : ""}</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Tên người đặt:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>
            {transaction && transaction.staff
              ? transaction.staff.name
              : transaction?.customer?.name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Người đặt:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          {transaction && transaction.customer ? (
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
          ) : (
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
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Phim:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>
            {transaction ? transaction.showTime.movie : ""}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Xuất chiếu:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>
            {ISOToDateTimeFormat(
              transaction
                ? transaction.showTime.startTime
                : new Date().toISOString()
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Thời gian đặt:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>
            {ISOToDateTimeFormat(
              transaction ? transaction.createdAt : new Date().toISOString()
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Ghế đã chọn:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          {transaction
            ? transaction.tickets.map((ticket) => (
                <Stack direction="row" justifyContent="space-between">
                  <Typography>{ticket.seat.name}</Typography>
                  <Typography color="primary" fontWeight={800}>
                    {printNumberWithCommas(ticket.price)} VNĐ
                  </Typography>
                </Stack>
              ))
            : null}
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontWeight="bold" sx={{ margin: 0 }}>
            Món đã chọn:
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            {transaction
              ? transaction.items?.map((item) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{item.id.name}</Typography>
                    <Stack direction="row" gap={1}>
                      <Typography>{item.quantity} x</Typography>

                      <Typography color="primary" fontWeight={800}>
                        {printNumberWithCommas(item.id.price)} VNĐ
                      </Typography>
                    </Stack>
                  </Box>
                ))
              : null}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ margin: 0, textAlign: "end" }}>
        Tổng tiền:{" "}
        <span style={{ color: theme.palette.primary.main }}>
          {printNumberWithCommas(transaction ? transaction.totalPrice : 0)} VNĐ
        </span>
      </Typography>
    </Modal>
  );
};

export default TransactionDetail;
