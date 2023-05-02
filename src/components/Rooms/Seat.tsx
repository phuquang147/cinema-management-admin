import { ButtonBase } from "@mui/material";
import { useEffect, useRef } from "react";
import { SEAT_TYPES } from "~/constants";
import { ISeat } from "~/interfaces/seat.interface";
import { useDragSelect } from "../DragSelectProvider";

interface SeatProps {
  seat: ISeat | string;
  row: number;
  col: number;
}

const Seat: React.FC<SeatProps> = ({ seat, row, col }) => {
  const seatType = typeof seat === "string" ? seat : seat.seatId.type;
  const ds = useDragSelect();
  const inputEl = useRef(null);

  useEffect(() => {
    const element = inputEl.current as unknown as HTMLElement;
    if (!element || !ds) return;
    ds.addSelectables(element);
  }, [ds, inputEl]);

  switch (seatType) {
    case SEAT_TYPES.SINGLE:
      return (
        <ButtonBase
          ref={inputEl}
          sx={{
            height: "36px",
            width: "36px",
            borderRadius: "4px",
            backgroundColor: "#bbb",
            margin: "4px",
          }}
          className="seat"
          data-row={row}
          data-col={col}
        ></ButtonBase>
      );
    case SEAT_TYPES.MAIN_DOUBLE:
      return (
        <ButtonBase
          ref={inputEl}
          sx={{
            height: "36px",
            width: "40px",
            borderRadius: "4px 0 0 4px",
            bgcolor: "#bbb",
            margin: "4px",
            marginRight: "0",
          }}
          className="seat"
          data-row={row}
          data-col={col}
        ></ButtonBase>
      );
    case SEAT_TYPES.DOUBLE:
      return (
        <ButtonBase
          ref={inputEl}
          sx={{
            height: "36px",
            width: "40px",
            borderRadius: "0 4px 4px 0",
            bgcolor: "#bbb",
            margin: "4px",
            marginLeft: 0,
          }}
          className="seat"
          data-row={row}
          data-col={col}
        ></ButtonBase>
      );
    default:
      return (
        <ButtonBase
          ref={inputEl}
          sx={{
            height: "36px",
            width: "36px",
            borderRadius: "4px",
            backgroundColor: "#eee",
            margin: "4px",
          }}
          className="seat"
          disabled
          data-row={row}
          data-col={col}
        ></ButtonBase>
      );
  }
};

export default Seat;
