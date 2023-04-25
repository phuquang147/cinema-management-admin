import { Box, Card, Typography } from "@mui/material";
import IPost from "~/interfaces/post.interface";
import { ISOToDateTime } from "~/utils/formatDateTime";

type ViewPostProps = {
  post: IPost | null;
};

const ViewPost: React.FC<ViewPostProps> = ({ post }) => {
  return (
    <Box>
      <Card
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Typography>
          <b>Tiêu đề: </b>
          {post ? post.title : ""}
        </Typography>
        <Typography>
          <b>Tác giả: </b>
          {post ? post.author.name : ""}
        </Typography>
        <Typography>
          <b>Ngày đăng: </b>
          {post ? ISOToDateTime(post.createdAt) : ""}
        </Typography>
      </Card>
      <Card sx={{ padding: 4, mt: 2 }}>
        <Box
          sx={{ width: "100%" }}
          className="ql-editor"
          dangerouslySetInnerHTML={{
            __html: post ? post.content : "",
          }}
        ></Box>
      </Card>
    </Box>
  );
};

export default ViewPost;
