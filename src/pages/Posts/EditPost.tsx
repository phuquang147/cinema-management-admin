import { Card, Container, Stack, Typography } from "@mui/material";
import PostForm from "~/components/Posts/PostForm";

const EditPost: React.FC = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa bài viết
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <PostForm type="edit" />
      </Card>
    </Container>
  );
};

export default EditPost;
