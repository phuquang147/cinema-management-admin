import { Card, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import IRoom from "~/interfaces/room.interface";

interface RoomProps {
  room: IRoom;
}

const Room: React.FC<RoomProps> = ({ room }) => {
  return (
    <Card elevation={10} sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" columnGap={2}>
        <img
          src="/assets/images/door.png"
          alt=""
          style={{ width: "20%", height: "auto", objectFit: "contain" }}
        ></img>
        <Stack gap={1} alignItems="flex-start" justifyContent="flex-start">
          <Typography
            component={Link}
            to={`/phong-chieu/${room._id}`}
            state={{ room }}
            sx={{
              color: "#000",
              textDecoration: "none",
              overflow: "hidden",
              WebkitLineClamp: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              ":hover": {
                color: "primary.main",
              },
              wordWrap: "break-word",
            }}
          >
            {room.name}
          </Typography>
          <Chip label={room.roomType.name} size="small" />
        </Stack>
      </Stack>
    </Card>
  );
};

export default Room;
