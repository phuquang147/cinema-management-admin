import { Card, Container, Stack, Typography } from "@mui/material";
import RoomForm from "~/components/Rooms/RoomForm";

const NewRoom: React.FC = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Thêm phòng chiếu
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <RoomForm />
      </Card>
    </Container>
  );
};

export default NewRoom;
