import { Card, Container, Stack, Typography } from "@mui/material";
import MovieForm from "~/components/Movies/MovieForm";

const NewMovie: React.FC = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Thêm phim
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <MovieForm />
      </Card>
    </Container>
  );
};

export default NewMovie;
