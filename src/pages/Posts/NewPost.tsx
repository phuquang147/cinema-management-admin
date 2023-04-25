import { Container, Stack, Typography } from "@mui/material";
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

      <PostForm />
    </Container>
  );
};

export default NewPost;
