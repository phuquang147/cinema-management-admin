import { StyledComponent } from "@emotion/styled";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { MUIStyledCommonProps } from "@mui/system";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "~/components/Iconify";
import { POST_STATUS } from "~/constants";
import IPost from "~/interfaces/post.interface";
import { ISOToDateTimeFormat } from "~/utils/formatDateTime";
import SvgIconStyle from "../SvgIconStyle";

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const TitleStyle: StyledComponent<
  {
    children: ReactNode;
    [x: string]: any;
  } & MUIStyledCommonProps<Theme>,
  {},
  {}
> = styled(Typography)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

type PostProps = {
  post: IPost;
  index: number;
};

const Post: React.FC<PostProps> = ({ post, index }) => {
  const theme = useTheme();
  const { thumbnail, title, author, view, createdAt, status } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
      to={`/bai-viet/${post.slug}`}
      component={RouterLink}
      state={{ post }}
      sx={{ textDecoration: "none" }}
    >
      <Card sx={{ position: "relative" }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          <SvgIconStyle
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
              ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
          />
          <AvatarStyle
            alt={""}
            src={author ? author.avatar : "/assets/images/user.png"}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <CoverImgStyle alt={title} src={thumbnail} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute",
            }),
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Iconify
              icon="bxs:user"
              sx={{
                color:
                  index < 3
                    ? theme.palette.common.white
                    : theme.palette.common.black,
                height: 16,
                width: 16,
              }}
            />
            <Typography
              gutterBottom
              sx={{
                color:
                  index < 3
                    ? theme.palette.common.white
                    : theme.palette.common.black,
                display: "block",
                fontSize: 13,
                fontWeight: 700,
                margin: 0,
              }}
            >
              {author ? author.name : ""}
            </Typography>
          </Box>

          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block", marginTop: 1 }}
          >
            {ISOToDateTimeFormat(createdAt)}
          </Typography>

          <TitleStyle
            color="inherit"
            variant="subtitle2"
            sx={{
              ...(latestPostLarge && { typography: "h5", height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: "common.white",
              }),
            }}
          >
            {title}
          </TitleStyle>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  height: 16,
                  width: 16,
                  borderRadius: 8,
                  backgroundColor:
                    status === POST_STATUS.PUBLIC
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                }}
              ></Box>
              <Typography
                variant="caption"
                color={
                  index < 3
                    ? theme.palette.common.white
                    : theme.palette.common.black
                }
              >
                {status}
              </Typography>
            </Box>
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                ml: index === 0 ? 0 : 1.5,
                ...((latestPostLarge || latestPost) && {
                  color: "grey.500",
                }),
              }}
            >
              <Iconify
                icon="eva:eye-fill"
                sx={{ width: 16, height: 16, mr: 0.5 }}
              />
              <Typography variant="caption">{view}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Post;
