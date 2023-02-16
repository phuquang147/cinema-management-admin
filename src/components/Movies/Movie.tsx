import { Box, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import IMovie from "~/interfaces/movie.interface";

interface MovieProps {
  movie: IMovie;
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
  return (
    <Link to={`/phim/${movie.id}`}>
      <Card elevation={10}>
        <img
          src={movie.thumbnail}
          alt=""
          style={{ width: "100%", height: "340px", objectFit: "cover" }}
        ></img>
        <Box sx={{ py: 2, px: 3 }}>
          <Typography>{movie.name}</Typography>
        </Box>
      </Card>
    </Link>
  );
};

export default Movie;
