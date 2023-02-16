import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Movie from "~/components/Movies/Movie";
import Select from "~/components/Select";
import movies from "~/_mock/movies";

const OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "showing", label: "Đang chiếu" },
  { value: "stopShowing", label: "Ngừng chiếu" },
  { value: "comingSoon", label: "Sắp chiếu" },
];

const Movies: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState(OPTIONS[0]);

  return (
    <Container sx={{ pb: 8 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        columnGap={2}
      >
        <Typography variant="h4">Phim</Typography>
        <Stack direction="row" columnGap={2}>
          <Select
            options={OPTIONS}
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
          <Button
            variant="contained"
            component={Link}
            to="/them-phim"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm phim
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={6} sm={4} md={3}>
            <Movie movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Movies;
