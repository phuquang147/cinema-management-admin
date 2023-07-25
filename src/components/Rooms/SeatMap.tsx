import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SEAT_TYPES } from "~/constants";
import { ISeat } from "~/interfaces/seat.interface";
import ContextMenuContainer from "../ContextMenu/ContextMenuContainer";
import { useDragSelect } from "../DragSelectProvider";
import Seat from "./Seat";
import { toast } from "react-toastify";
import { NewSeat } from "./RoomForm";

interface SeatMapProps {
  seats: (ISeat | NewSeat)[][];
  onUpdateSeats: (seats: (ISeat | NewSeat)[][]) => void;
}

type SelectEvent = {
  event: MouseEvent;
  isDragging: boolean;
  items: HTMLButtonElement[];
};

const SeatMap: React.FC<SeatMapProps> = ({ seats, onUpdateSeats }) => {
  const theme = useTheme();
  const mouseDownEvent = useRef<{ clientX: number; clientY: number } | null>(
    null
  );

  const [selectEvent, setSelectEvent] = useState<SelectEvent | null>(null);

  const ds = useDragSelect();

  useEffect(() => {
    const id = ds?.subscribe("callback", (e: any) => {
      if (
        !(
          (mouseDownEvent.current?.clientX === e.event.clientX &&
            mouseDownEvent.current?.clientY === e.event.clientY) ||
          e.items.length === 0 ||
          e.items.length === 1
        )
      ) {
        setSelectEvent(e);
      }
    });

    return () => {
      ds?.unsubscribe("callback", undefined, id);
    };
  }, [ds]);

  const getSeatType = (seat: ISeat | NewSeat) => {
    return seat.hasOwnProperty("_id")
      ? (seat as ISeat).seatId.type
      : (seat as NewSeat).type;
  };

  const getSeatPosition = (seat: ISeat | NewSeat) => {
    return seat.hasOwnProperty("_id")
      ? (seat as ISeat).seatId.position
      : (seat as NewSeat).position;
  };

  const handleChangeSeatToNoneOrSingle = (type: "none" | "single") => {
    const newSeats = seats.map((seatsRow) => [...seatsRow]);

    const handleChangeSeatType = (row: number, col: number) => {
      if (newSeats[row][col].hasOwnProperty("_id")) {
        newSeats[row][col] = {
          ...newSeats[row][col],
          seatId: {
            ...(newSeats[row][col] as ISeat).seatId,
            type: type === "none" ? SEAT_TYPES.NONE : SEAT_TYPES.SINGLE,
          },
        };
      } else {
        newSeats[row][col] = {
          type: type === "none" ? SEAT_TYPES.NONE : SEAT_TYPES.SINGLE,
        };
      }
    };

    const handleChangeRelatedDoubleSeat = (row: number, col: number) => {
      const seatType = getSeatType(newSeats[row][col]);
      const seatPosition = getSeatPosition(newSeats[row][col]);

      if (seatType === SEAT_TYPES.DOUBLE && seatPosition === "left")
        handleChangeSeatType(row, col + 1);
      if (seatType === SEAT_TYPES.DOUBLE && seatPosition === "right")
        handleChangeSeatType(row, col - 1);
    };

    if (selectEvent && selectEvent?.items.length > 0) {
      selectEvent?.items.forEach((seat) => {
        const { row: rowData, col: colData }: DOMStringMap = seat.dataset;

        if (rowData && colData) {
          const row = parseInt(rowData),
            col = parseInt(colData);

          if (newSeats[row][col]) {
            handleChangeRelatedDoubleSeat(row, col);
            handleChangeSeatType(row, col);
          }
        }
      });
    }

    onUpdateSeats(newSeats);
  };

  const handleChangeSeatToDouble = () => {
    if (
      selectEvent?.items.length === 2 &&
      selectEvent.items[0].dataset.row === selectEvent.items[1].dataset.row &&
      Math.abs(
        parseInt(selectEvent.items[0].dataset.col || "0") -
          parseInt(selectEvent.items[1].dataset.col || "0")
      ) === 1
    ) {
      const row1 = parseInt(selectEvent?.items[0].dataset.row || "0"),
        row2 = parseInt(selectEvent?.items[1].dataset.row || "0"),
        col1 = parseInt(selectEvent?.items[0].dataset.col || "0"),
        col2 = parseInt(selectEvent?.items[1].dataset.col || "0");

      const seatType1 = getSeatType(seats[row1][col1]);
      const seatType2 = getSeatType(seats[row2][col2]);
      if (seatType1 === SEAT_TYPES.DOUBLE || seatType2 === SEAT_TYPES.DOUBLE) {
        toast.error("Vui lòng chọn các ghế không phải là ghế đôi");
      } else {
        const newSeats = seats.map((seatsRow) => [...seatsRow]);

        const handleChangeSeatType = (
          row: number,
          col: number,
          type: string,
          position?: "left" | "right"
        ) => {
          if (newSeats[row][col].hasOwnProperty("_id"))
            newSeats[row][col] = {
              ...(newSeats[row][col] as ISeat),
              seatId: {
                ...(newSeats[row][col] as ISeat).seatId,
                type,
                position: position ? position : "left",
              },
            };
          else {
            newSeats[row][col] = { type, position };
          }
        };

        if (col1 < col2) {
          handleChangeSeatType(row1, col1, SEAT_TYPES.DOUBLE, "left");
          handleChangeSeatType(row2, col2, SEAT_TYPES.DOUBLE, "right");
        } else {
          handleChangeSeatType(row1, col1, SEAT_TYPES.DOUBLE, "right");
          handleChangeSeatType(row2, col2, SEAT_TYPES.DOUBLE, "left");
        }

        onUpdateSeats(newSeats);
      }
    } else {
      toast.error("Vui lòng chọn hai ghế liền kề nhau trên một hàng");
    }
  };

  return (
    <Stack
      direction="column"
      gap={1}
      sx={{ width: "auto", position: "relative", overflow: "auto" }}
      className="seats-container"
    >
      <Box
        sx={{
          width: "auto",
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
      <ContextMenuContainer
        contextContent={
          <List
            style={{
              backgroundColor: "white",
              boxShadow: theme.shadows[2],
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleChangeSeatToNoneOrSingle("none")}
              >
                <ListItemText primary="Chuyển thành đường đi" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleChangeSeatToNoneOrSingle("single")}
              >
                <ListItemText primary="Chuyển thành ghế đơn" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleChangeSeatToDouble}>
                <ListItemText primary="Chuyển thành ghế đôi" />
              </ListItemButton>
            </ListItem>
          </List>
        }
        selectEvent={selectEvent}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          onMouseDown={(e) => {
            mouseDownEvent.current = { clientX: e.clientX, clientY: e.clientY };
          }}
        >
          {seats[0] && (
            <Stack direction="row">
              <Box
                sx={{
                  height: "36px",
                  width: "36px",
                  borderRadius: "4px",
                  margin: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>
              {seats[0].map((value, index) => {
                return (
                  <Box
                    key={`${Math.random()}${index}`}
                    sx={{
                      height: "36px",
                      width: "36px",
                      borderRadius: "4px",
                      margin: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {index + 1}
                  </Box>
                );
              })}
            </Stack>
          )}

          {seats.map((row, rowIndex) => (
            <Stack key={rowIndex} direction="row" sx={{ width: "fit-content" }}>
              <Box
                key={`${Math.random()}${rowIndex}`}
                sx={{
                  height: "36px",
                  width: "36px",
                  borderRadius: "4px",
                  margin: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {String.fromCharCode(65 + rowIndex)}
              </Box>
              {row.map((col, colIndex) => {
                return (
                  <Seat
                    key={`${rowIndex}${colIndex}`}
                    seat={col}
                    row={rowIndex}
                    col={colIndex}
                  />
                );
              })}
            </Stack>
          ))}
        </Box>
      </ContextMenuContainer>
    </Stack>
  );
};

export default SeatMap;
