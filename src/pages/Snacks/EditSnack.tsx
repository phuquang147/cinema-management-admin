import { Card, Container, Stack, Typography } from "@mui/material";
import SnackForm from "~/components/Snacks/SnackForm";

const EditSnack: React.FC = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa món
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <SnackForm type="edit" />
      </Card>
    </Container>
  );
};

export default EditSnack;
