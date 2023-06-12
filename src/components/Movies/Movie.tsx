import { Box, Card, Chip, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import IMovie from "~/interfaces/movie.interface";

interface MovieProps {
  movie: IMovie;
}

type MovieStatusProps = {
  premiereDay: string;
  endDay: string;
};

const MovieStatus: FC<MovieStatusProps> = ({ premiereDay, endDay }) => {
  if (new Date(premiereDay) > new Date())
    return (
      <Chip
        label="Sắp chiếu"
        color="info"
        sx={{
          mt: 1,
          bgcolor: "info.light",
          color: "info.dark",
          fontSize: "13px",
          fontWeight: "bold",
          borderRadius: "4px",
        }}
      />
    );

  if (new Date(endDay) < new Date())
    return (
      <Chip
        label="Ngừng chiếu"
        color="error"
        sx={{
          mt: 1,
          bgcolor: "error.light",
          color: "error.dark",
          fontSize: "13px",
          fontWeight: "bold",
          borderRadius: "4px",
        }}
      />
    );
  return (
    <Chip
      label="Đang chiếu"
      color="success"
      sx={{
        mt: 1,
        bgcolor: "success.light",
        color: "success.dark",
        fontSize: "13px",
        fontWeight: "bold",
        borderRadius: "4px",
      }}
    />
  );
};

const Movie: React.FC<MovieProps> = ({ movie }) => {
  return (
    <Link
      to={`/phim/${movie._id}`}
      state={{ movie }}
      style={{ textDecoration: "none" }}
    >
      <Card elevation={10}>
        <Box sx={{ width: "100%", pt: "100%", position: "relative" }}>
          <img
            src={movie.thumbnail}
            alt=""
            style={{
              top: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              objectFit: "cover",
            }}
          ></img>
        </Box>
        <Box sx={{ pt: 1, pb: 3, px: 3 }}>
          <Typography
            sx={{
              overflow: "hidden",
              WebkitLineClamp: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            {movie.name}
          </Typography>
          <MovieStatus premiereDay={movie.premiereDay} endDay={movie.endDay} />
        </Box>
      </Card>
    </Link>
  );
};

export default Movie;
