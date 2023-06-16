import { Card, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "~/components/Iconify";
import MovieForm from "~/components/Movies/MovieForm";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const NewMovie: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthorizeContainer staffCanView={false}>
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
          <Typography variant="h4">Thêm phim</Typography>
        </Stack>

        <Card sx={{ padding: 4 }}>
          <MovieForm />
        </Card>
      </Container>
    </AuthorizeContainer>
  );
};

export default NewMovie;
