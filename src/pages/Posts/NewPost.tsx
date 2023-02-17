import { Card, Container, Stack, Typography } from "@mui/material";
import PostForm from "~/components/Posts/PostForm";

const NewPost: React.FC = () => {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Thêm bài viết
        </Typography>
      </Stack>

      <Card sx={{ padding: 4 }}>
        <PostForm />
      </Card>
    </Container>
  );
};

export default NewPost;
