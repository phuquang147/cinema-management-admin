import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Iconify from "~/components/Iconify";
import PostForm from "~/components/Posts/PostForm";
import ViewPost from "~/components/Posts/ViewPost";
import IPost from "~/interfaces/post.interface";
import { useAppSelector } from "~/redux/hooks";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const EditPost: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();
  const post = location.state ? (location.state.post as IPost) : null;

  return (
    <AuthorizeContainer>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          mb={5}
          gap={1}
        >
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <Iconify icon="ion:arrow-back" />
          </IconButton>
          <Typography variant="h4">
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
    </AuthorizeContainer>
  );
};

export default EditPost;
