import { Button, Card, Stack, Typography } from "@mui/material";
import { MappedShowTime } from "./SelectShowTime";
import IShowTime from "~/interfaces/showTime.interface";

type ShowTimeProps = {
  showTime: MappedShowTime;
  handleSelectShowTime: (showTime: IShowTime) => void;
};

const ShowTime: React.FC<ShowTimeProps> = ({
  showTime,
  handleSelectShowTime,
}) => {
  return (
    <Card>
      <Stack direction="row" sx={{ p: 1 }}>
        <img
          src={showTime.thumbnail}
          alt=""
          style={{
            width: "25%",
            objectFit: "cover",
            borderRadius: "8px",
            aspectRatio: "3/4",
          }}
        />
        <Stack sx={{ px: 2, pb: 1 }}>
          <Typography variant="h6">{showTime.name}</Typography>

          <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
            {showTime.showTimes.map((showTime) => (
              <Button
                key={showTime._id}
                variant="outlined"
                onClick={() => {
                  handleSelectShowTime(showTime);
                }}
              >
                {showTime.startTime.slice(11, 16)}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ShowTime;
