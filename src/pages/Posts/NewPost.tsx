import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "~/components/Iconify";
import PostForm from "~/components/Posts/PostForm";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

const NewPost: React.FC = () => {
  const navigate = useNavigate();

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
          <Typography variant="h4">Thêm bài viết</Typography>
        </Stack>

        <PostForm />
      </Container>
    </AuthorizeContainer>
  );
};

export default NewPost;
