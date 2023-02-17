import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Post from "~/components/Posts/Post";
import posts from "~/_mock/posts";

export default function Posts() {
  return (
    <Container sx={{ pb: 8 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Bài viết
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/them-bai-viet"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Thêm bài viết
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <Post key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
