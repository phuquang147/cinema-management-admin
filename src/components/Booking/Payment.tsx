import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { transactionSagaActionTypes } from "~/redux/sagaActionTypes";
import { isoToDateTime } from "~/utils/formatDateTime";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import Iconify from "../Iconify";

export interface TransactionData {
  tickets: string[];
  items: { id: string; quantity: number }[];
}

interface PaymentProps {
  handleBack: () => void;
  handleNext: () => void;
}

const Payment: React.FC<PaymentProps> = ({ handleBack, handleNext }) => {
  const dispatch = useAppDispatch();
  const { showTime, tickets, snacks } = useAppSelector(
    (state) => state.booking
  );

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(
      tickets.reduce((prev, current) => {
        return prev + current.ticketId.price;
      }, 0) +
        snacks.reduce((prev, current) => {
          return prev + current.price * current.count;
        }, 0)
    );
  }, [tickets, snacks]);

  const handleSubmit = async () => {
    dispatch({
      type: transactionSagaActionTypes.ADD_TRANSACTION_SAGA,
      payload: {
        transaction: {
          tickets: tickets.map((ticket) => ticket.ticketId._id),
          items: snacks
            .filter((snack) => snack.count > 0)
            .map((snack) => ({
              id: snack._id,
              quantity: snack.count,
            })),
        },
        handleNext,
      },
    });
  };

  return (
    <Stack>
      <Typography variant="h5">Thông tin thanh toán</Typography>
      <Typography sx={{ mt: 1 }}>
        <b>Tên phim: </b>
        {showTime?.movie.name}
      </Typography>
      <Typography sx={{ mt: 1 }}>
        <b>Suất chiếu: </b>
        {dayjs(isoToDateTime(showTime ? showTime.startTime : "")).format(
          "hh:mm DD/MM/YYYY"
        )}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Typography sx={{ mt: 1 }} variant="h6">
            Các ghế đã chọn
          </Typography>
          <Stack sx={{ mt: 1 }} gap={1}>
            {tickets.map((ticket, index) => (
              <Box
                sx={{
                  py: 1,
                  px: 2,
                  bgcolor: index % 2 !== 0 ? "white" : "#eee",
                }}
              >
                <Typography key={ticket._id}>
                  <b>{ticket.ticketId.seat.name}</b> (
                  {printNumberWithCommas(ticket.ticketId.price)} VNĐ)
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography sx={{ mt: 1 }} variant="h6">
            Các món đã chọn
          </Typography>
          <Stack sx={{ mt: 1 }} gap={1}>
            {snacks
              .filter((snack) => snack.count > 0)
              .map((snack, index) => (
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    bgcolor: index % 2 !== 0 ? "white" : "#eee",
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>
                      <b>{snack.name}</b> ({printNumberWithCommas(snack.price)}{" "}
                      VNĐ)
                    </Typography>
                    <Typography>
                      x <b>{snack.count}</b>
                    </Typography>
                  </Stack>
                </Box>
              ))}
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
      <Typography variant="h5" sx={{ textAlign: "end", mt: 2 }}>
        Tổng tiền: <b>{printNumberWithCommas(total)} VNĐ</b>
      </Typography>
      <Stack direction="row" justifyContent="end" gap={1} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={handleBack}>
          <Iconify
            icon="ic:round-chevron-left"
            sx={{ height: "20px", width: "20px" }}
          />
          Chọn món
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Xác nhận thanh toán
        </Button>
      </Stack>
    </Stack>
  );
};

export default Payment;
