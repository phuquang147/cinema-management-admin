import { Container, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PostForm from "~/components/Posts/PostForm";
import ViewPost from "~/components/Posts/ViewPost";
import IPost from "~/interfaces/post.interface";
import { useAppSelector } from "~/redux/hooks";

const EditPost: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();
  const post = location.state ? (location.state.post as IPost) : null;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          {post && user && user._id === post.author._id
            ? "Chỉnh sửa bài viết"
            : "Xem bài viết"}
        </Typography>
      </Stack>

      {post && user && user._id === post.author._id ? (
        <PostForm type="edit" />
      ) : (
        <ViewPost post={post} />
      )}
    </Container>
  );
};

export default EditPost;
