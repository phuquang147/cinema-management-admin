import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "~/components/Iconify";
import MovieForm from "~/components/Movies/MovieForm";

const EditMovie: React.FC = () => {
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
        <Typography variant="h4">Chỉnh sửa phim</Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <MovieForm type="edit" />
      </Card>
    </Container>
  );
};

export default EditMovie;
