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

interface SeatMapProps {
  seats: (ISeat | string)[][];
  onUpdateSeats: (seats: (ISeat | string)[][]) => void;
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

  const handleChangeSeatToNoneOrSingle = (type: "none" | "single") => {
    const newSeats = [...seats];

    const handleChangeSeatType = (row: number, col: number) => {
      if (typeof newSeats[row][col] === "string") {
        newSeats[row][col] =
          type === "none" ? SEAT_TYPES.NONE : SEAT_TYPES.SINGLE;
      } else {
        newSeats[row][col] = {
          ...(newSeats[row][col] as ISeat),
          seatId: {
            ...(newSeats[row][col] as ISeat).seatId,
            type: type === "none" ? SEAT_TYPES.NONE : SEAT_TYPES.SINGLE,
          },
        };
      }
    };

    const handleChangeRelatedDoubleSeat = (row: number, col: number) => {
      const seatType =
        typeof newSeats[row][col] === "string"
          ? newSeats[row][col]
          : (newSeats[row][col] as ISeat).seatId.type;

      if (seatType === SEAT_TYPES.MAIN_DOUBLE)
        handleChangeSeatType(row, col + 1);

      if (seatType === SEAT_TYPES.DOUBLE) handleChangeSeatType(row, col - 1);
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
    const getSeatType = (seat: ISeat | string) => {
      return typeof seat === "string" ? seat : (seat as ISeat).seatId.type;
    };
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
      if (
        seatType1 === SEAT_TYPES.DOUBLE ||
        seatType1 === SEAT_TYPES.MAIN_DOUBLE ||
        seatType2 === SEAT_TYPES.DOUBLE ||
        seatType2 === SEAT_TYPES.MAIN_DOUBLE
      ) {
        toast.error("Vui lòng chọn các ghế không phải là ghế đôi");
      } else {
        const newSeats = [...seats];

        const handleChangeSeatType = (
          row: number,
          col: number,
          type: string
        ) => {
          if (typeof newSeats[row][col] === "string") newSeats[row][col] = type;
          else {
            newSeats[row][col] = {
              ...(newSeats[row][col] as ISeat),
              seatId: {
                ...(newSeats[row][col] as ISeat).seatId,
                type,
              },
            };
          }
        };

        if (col1 < col2) {
          handleChangeSeatType(row1, col1, SEAT_TYPES.MAIN_DOUBLE);
          handleChangeSeatType(row2, col2, SEAT_TYPES.DOUBLE);
        } else {
          handleChangeSeatType(row1, col1, SEAT_TYPES.DOUBLE);
          handleChangeSeatType(row2, col2, SEAT_TYPES.MAIN_DOUBLE);
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
      sx={{ position: "relative", overflow: "auto" }}
      className="seats-container"
    >
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
          {seats.map((row, rowIndex) => (
            <Stack key={rowIndex} direction="row" sx={{ width: "fit-content" }}>
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
