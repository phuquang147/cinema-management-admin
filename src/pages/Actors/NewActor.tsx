import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActorForm from "~/components/Actors/ActorForm";
import Iconify from "~/components/Iconify";

const NewActor: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="start"
        mb={5}
        gap={1}
      >
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <Iconify icon="ion:arrow-back" />
        </IconButton>
        <Typography variant="h4">Thêm diễn viên</Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <ActorForm />
      </Card>
    </Container>
  );
};

export default NewActor;
