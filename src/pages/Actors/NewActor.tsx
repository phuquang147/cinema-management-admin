import { Card, Container, Stack, Typography } from "@mui/material";
import ActorForm from "~/components/Actors/ActorForm";

const NewActor: React.FC = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Thêm diễn viên
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <ActorForm />
      </Card>
    </Container>
  );
};

export default NewActor;
