import { ButtonBase, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { SEAT_TYPES } from "~/constants";
import { ITicket } from "~/interfaces/ticket.interface";

interface TicketProps {
  ticket: ITicket | null;
  selectedTickets: ITicket[];
  selectTicket: (ticket: ITicket, rowIndex: number, colIndex: number) => void;
  unSelectTicket: (ticket: ITicket, rowIndex: number, colIndex: number) => void;
  rowIndex: number;
  colIndex: number;
}

const Ticket: React.FC<TicketProps> = ({
  ticket,
  selectedTickets,
  selectTicket,
  unSelectTicket,
  rowIndex,
  colIndex,
}) => {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState<boolean>();

  useEffect(() => {
    if (ticket)
      setIsSelected(
        selectedTickets.findIndex(
          (selectedTicket) => selectedTicket._id === ticket._id
        ) !== -1
      );
  }, [selectedTickets, ticket]);

  if (!ticket)
    return (
      <ButtonBase
        sx={{
          height: "36px",
          width: "36px",
          borderRadius: "4px",
          backgroundColor: "#eee",
          margin: "4px",
        }}
        className="seat"
        disabled
      ></ButtonBase>
    );

  const seatType = ticket.ticketId.seat.type;
  const position = ticket.ticketId.seat.position;

  switch (seatType) {
    case SEAT_TYPES.SINGLE:
      return (
        <ButtonBase
          sx={{
            height: "36px",
            width: "36px",
            borderRadius: "4px",
            backgroundColor: isSelected ? theme.palette.primary.main : "#bbb",
            margin: "4px",
          }}
          data-id={ticket.ticketId._id}
          onClick={() => {
            isSelected
              ? unSelectTicket(ticket, rowIndex, colIndex)
              : selectTicket(ticket, rowIndex, colIndex);
          }}
          disabled={ticket.ticketId.isBooked}
          className={ticket.ticketId.isBooked ? "booked-seat" : ""}
        ></ButtonBase>
      );

    case SEAT_TYPES.DOUBLE:
      return position === "left" ? (
        <ButtonBase
          sx={{
            height: "36px",
            width: "80px",
            borderRadius: "4px",
            bgcolor: isSelected ? theme.palette.primary.main : "#bbb",
            margin: "4px",
            marginRight: "4px",
          }}
          data-id={ticket.ticketId._id}
          onClick={() => {
            isSelected
              ? unSelectTicket(ticket, rowIndex, colIndex)
              : selectTicket(ticket, rowIndex, colIndex);
          }}
          disabled={ticket.ticketId.isBooked}
          className={ticket.ticketId.isBooked ? "booked-seat" : ""}
        ></ButtonBase>
      ) : null;
    // <ButtonBase
    //   sx={{
    //     height: "36px",
    //     width: "40px",
    //     borderRadius: "0 4px 4px 0",
    //     bgcolor: isSelected ? theme.palette.primary.main : "#bbb",
    //     margin: "4px",
    //     marginLeft: 0,
    //   }}
    //   data-id={ticket.ticketId._id}
    //   onClick={() => {
    //     isSelected
    //       ? unSelectTicket(ticket, rowIndex, colIndex)
    //       : selectTicket(ticket, rowIndex, colIndex);
    //   }}
    // ></ButtonBase>
    default:
      return (
        <ButtonBase
          sx={{
            height: "36px",
            width: "36px",
            borderRadius: "4px",
            backgroundColor: "#eee",
            margin: "4px",
          }}
          className="seat"
          disabled
          data-id={ticket.ticketId._id}
        ></ButtonBase>
      );
  }
};

export default Ticket;
