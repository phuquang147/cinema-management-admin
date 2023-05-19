import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { SEAT_TYPES } from "~/constants";
import { ITicket } from "~/interfaces/ticket.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { selectTickets } from "~/redux/reducers/BookingReducer";
import ShowTimeServices from "~/services/showTimeServices";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";
import Iconify from "../Iconify";
import Ticket from "./Ticket";

interface SelectTicketProps {
  handleBack: () => void;
  handleNext: () => void;
}

const SelectTicket: React.FC<SelectTicketProps> = ({
  handleBack,
  handleNext,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [tickets, setTickets] = useState<ITicket[][]>([]);
  const [selectedTickets, setSelectedTickets] = useState<ITicket[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { showTime } = useAppSelector((state) => state.booking);

  useEffect(() => {
    const getShowTime = async () => {
      try {
        let { data, status } = await ShowTimeServices.getShowTimesById(
          showTime?._id || ""
        );

        if (status === 200) {
          setTickets(data.showTime.tickets);
        }
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    };

    if (showTime) {
      getShowTime();
    }
  }, [showTime]);

  const selectTicket = (
    ticket: ITicket,
    rowIndex: number,
    colIndex: number
  ) => {
    if (ticket.ticketId.seat.type === SEAT_TYPES.SINGLE) {
      setSelectedTickets((prevSelectedTickets) => [
        ...prevSelectedTickets,
        ticket,
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + ticket.ticketId.price);
    } else {
      // if (ticket.ticketId.seat.position === "left") {
      setSelectedTickets((prevSelectedTickets) => [
        ...prevSelectedTickets,
        ticket,
        // tickets[rowIndex][colIndex + 1],
      ]);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + ticket.ticketId.price
        // tickets[rowIndex][colIndex + 1].ticketId.price
      );
      // } else {
      //   setSelectedTickets((prevSelectedTickets) => [
      //     ...prevSelectedTickets,
      //     tickets[rowIndex][colIndex - 1],
      //     ticket,
      //   ]);
      //   setTotalPrice(
      //     (prevTotalPrice) =>
      //       prevTotalPrice +
      //       ticket.ticketId.price +
      //       tickets[rowIndex][colIndex - 1].ticketId.price
      //   );
      // }
    }
  };
  console.log(tickets);

  const unSelectTicket = (
    ticket: ITicket,
    rowIndex: number,
    colIndex: number
  ) => {
    if (ticket.ticketId.seat.type === SEAT_TYPES.SINGLE) {
      setSelectedTickets((prevSelectedTickets) =>
        prevSelectedTickets.filter(
          (selectTicket) => selectTicket._id !== ticket._id
        )
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice - ticket.ticketId.price);
    } else {
      // if (ticket.ticketId.seat.position === "left") {
      setSelectedTickets((prevSelectedTickets) =>
        prevSelectedTickets.filter(
          (selectTicket) => selectTicket._id !== ticket._id
          // selectTicket._id !== tickets[rowIndex][colIndex + 1]._id
        )
      );
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice - ticket.ticketId.price
        // tickets[rowIndex][colIndex + 1].ticketId.price)
      );
      // } else {
      //   setSelectedTickets((prevSelectedTickets) =>
      //     prevSelectedTickets.filter(
      //       (selectTicket) =>
      //         selectTicket._id !== ticket._id &&
      //         selectTicket._id !== tickets[rowIndex][colIndex - 1]._id
      //     )
      //   );
      //   setTotalPrice(
      //     (prevTotalPrice) =>
      //       prevTotalPrice -
      //       (ticket.ticketId.price +
      //         tickets[rowIndex][colIndex - 1].ticketId.price)
      //   );
      // }
    }
  };

  console.log(tickets);

  return (
    <Stack
      direction="column"
      gap={1}
      justifyContent="center"
      alignItems="center"
      sx={{ p: 2, overflow: "hidden" }}
    >
      <Stack direction="row" alignItems="center" gap={3} sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              height: "30px",
              width: "30px",
              borderRadius: "4px",
              backgroundColor: "#bbb",
            }}
          />
          <Typography>Ghế trống</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              height: "30px",
              width: "30px",
              borderRadius: "4px",
              backgroundColor: "#eee",
            }}
          />
          <Typography>Đường đi</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              height: "30px",
              width: "30px",
              borderRadius: "4px",
              backgroundColor: theme.palette.primary.main,
            }}
          />
          <Typography>Ghế đã chọn</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              height: "30px",
              width: "30px",
              borderRadius: "4px",
            }}
            className="booked-seat"
          />
          <Typography>Ghế đã đặt</Typography>
        </Stack>
      </Stack>
      <TransformWrapper minScale={0.5}>
        <TransformComponent>
          <Stack gap={1}>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#777",
                textAlign: "center",
                borderRadius: "4px",
                mb: 2,
                py: 1,
                color: "#fff",
              }}
            >
              Màn hình
            </Box>
            <Box>
              {tickets.map((row, rowIndex) => (
                <Stack
                  key={`${rowIndex}${row[0] && row[0]._id}`}
                  direction="row"
                  sx={{ width: "fit-content" }}
                >
                  {row.map((col, colIndex) => {
                    return (
                      <Ticket
                        key={col ? col._id : `${rowIndex}${colIndex}`}
                        ticket={col}
                        selectedTickets={selectedTickets}
                        selectTicket={selectTicket}
                        unSelectTicket={unSelectTicket}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                      />
                    );
                  })}
                </Stack>
              ))}
            </Box>
          </Stack>
        </TransformComponent>
      </TransformWrapper>

      <Divider sx={{ width: "100%", mt: 2 }} />
      <Stack
        direction="row"
        sx={{ width: "100%" }}
        gap={1}
        flexWrap="wrap"
        alignItems="center"
      >
        <Typography>Ghế đã chọn:</Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {selectedTickets.map((selectTicket) => (
            <Typography
              variant="body2"
              sx={{ p: 1, border: "1px solid #ccc", borderRadius: "4px" }}
            >
              {selectTicket.ticketId.seat.name} (
              {printNumberWithCommas(selectTicket.ticketId.price)} VNĐ)
            </Typography>
          ))}
        </Box>
      </Stack>
      <Stack direction="row" sx={{ width: "100%" }} gap={1}>
        <Typography>Tổng tiền:</Typography>
        <Typography fontWeight="bold" color="primary">
          {printNumberWithCommas(totalPrice)} VNĐ
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="end"
        gap={1}
        sx={{ width: "100%", mt: 2 }}
      >
        <Button variant="outlined" onClick={handleBack}>
          <Iconify
            icon="ic:round-chevron-left"
            sx={{ height: "20px", width: "20px" }}
          />
          Chọn suất chiếu
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(selectTickets(selectedTickets));
            handleNext();
          }}
          disabled={selectedTickets.length === 0}
        >
          Chọn bắp nước
          <Iconify
            icon="ic:round-chevron-right"
            sx={{ height: "20px", width: "20px" }}
          />
        </Button>
      </Stack>
    </Stack>
  );
};

export default SelectTicket;
