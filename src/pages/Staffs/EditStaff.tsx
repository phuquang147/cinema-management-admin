import { Card, Container, Stack, Typography } from "@mui/material";
import StaffForm from "~/components/Staffs/StaffForm";

const EditStaff: React.FC = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa nhân viên
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <StaffForm type="edit" />
      </Card>
    </Container>
  );
};

export default EditStaff;
