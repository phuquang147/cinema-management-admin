import { Card, Container, Stack, Typography } from "@mui/material";
import SnackForm from "~/components/Snacks/SnackForm";

const NewSnack: React.FC = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Thêm món
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <SnackForm />
      </Card>
    </Container>
  );
};

export default NewSnack;
