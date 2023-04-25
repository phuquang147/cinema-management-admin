import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "~/components/Iconify";
import Post from "~/components/Posts/Post";
import IPost from "~/interfaces/post.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { postSagaActionTypes } from "~/redux/sagaActionTypes";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Posts() {
  const dispatch = useAppDispatch();
  const allPosts = useAppSelector((state) => state.post.allPosts);
  const myPosts = useAppSelector((state) => state.post.myPosts);
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    dispatch({ type: postSagaActionTypes.GET_ALL_POSTS_SAGA });
    dispatch({ type: postSagaActionTypes.GET_MY_POSTS_SAGA });
  }, [dispatch]);

  const handleChangeTab = (event: SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

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

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
        >
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Cá nhân" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Grid container spacing={3}>
          {allPosts.map((post: IPost, index: number) => (
            <Post key={post._id} post={post} index={index} />
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Grid container spacing={3}>
          {myPosts.map((post: IPost, index: number) => (
            <Post key={post._id} post={post} index={index} />
          ))}
        </Grid>
      </TabPanel>
    </Container>
  );
}
