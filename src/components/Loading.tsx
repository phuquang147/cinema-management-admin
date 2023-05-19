import { Box, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box
      style={{
        width: "100%",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
