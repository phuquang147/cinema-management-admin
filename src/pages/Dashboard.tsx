import { Card, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import RecentTransactions from "~/components/Dashboard/RecentTransactions";
import SoldTickets from "~/components/Dashboard/SoldTickets";
import Stat from "~/components/Dashboard/Stat";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { reportSagaActionTypes } from "~/redux/sagaActionTypes";
import { printNumberWithCommas } from "~/utils/printNumerWithCommas";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dashboard } = useAppSelector((state) => state.report);

  useEffect(() => {
    dispatch({ type: reportSagaActionTypes.GET_DASHBOARD_SAGA });
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <Stat
            title="Doanh thu hôm nay"
            icon="ph:money"
            value={`${printNumberWithCommas(
              dashboard ? dashboard.revenue : 0
            )} VNĐ`}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Stat
            title="Số vé đã bán hôm nay"
            icon="heroicons:ticket"
            value={`${printNumberWithCommas(
              dashboard ? dashboard.soldTickets : 0
            )}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Stat
            title="Số phim đang chiếu"
            icon="icon-park-outline:movie"
            value={`${dashboard?.onGoingMovies}`}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ py: 2, px: 3 }}>
            <Typography variant="h6">Vé đã bán / Còn lại</Typography>
            <SoldTickets
              soldTickets={dashboard ? dashboard.soldTickets : 0}
              remainingTickets={dashboard ? dashboard.remainingTickets : 0}
            />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6">Giao dịch mới nhất</Typography>
            <RecentTransactions
              recentTransactions={dashboard ? dashboard.recentTransactions : []}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
