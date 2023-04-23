import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" paragraph>
          Không tìm thấy trang
        </Typography>

        <Box
          component="img"
          src="/assets/images/404.png"
          sx={{ height: 240, mx: "auto", my: { xs: 2, sm: 4 } }}
          draggable={false}
        />

        <Button to="/" size="large" variant="contained" component={RouterLink}>
          Về trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
