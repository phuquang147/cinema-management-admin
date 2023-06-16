import {
  Box,
  Card,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import GeneralReport from "~/components/Report/GeneralReport";
import MovieReport from "~/components/Report/MovieReport";
import AuthorizeContainer from "~/routes/AuthorizeContainer";

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

const Report: FC = () => {
  const [tab, setTab] = useState<number>(0);
  const handleChangeTab = (event: SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <AuthorizeContainer staffCanView={false}>
      <Container sx={{ pb: 4 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          columnGap={2}
        >
          <Typography variant="h4">Giao dịch</Typography>
        </Stack>

        <Card
          sx={{
            width: "100%",
            px: 3,
          }}
        >
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label="Báo cáo chung" {...a11yProps(0)} />
            <Tab label="Báo cáo theo phim" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <GeneralReport />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <MovieReport />
          </TabPanel>
        </Card>
      </Container>
    </AuthorizeContainer>
  );
};

export default Report;
