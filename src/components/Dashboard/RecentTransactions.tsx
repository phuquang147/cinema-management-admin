import {
  Avatar,
  Button,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import { RecentTransaction } from "~/redux/reducers/ReportReducer";

type RecentTransactionsProps = {
  recentTransactions: RecentTransaction[];
};

const RecentTransactions: FC<RecentTransactionsProps> = ({
  recentTransactions,
}) => {
  return (
    <Stack>
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {recentTransactions.map((transaction) => (
          <ListItem
            key={transaction._id}
            sx={{ bgcolor: "#f6f6f6", borderRadius: 1 }}
          >
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <Avatar src={transaction.movie.thumbnail} variant="rounded" />
                <Stack sx={{ ml: 2 }}>
                  <Typography fontWeight={700}>
                    {`${
                      transaction.customer
                        ? transaction.customer.name
                        : transaction.staff?.name
                    } (${transaction.customer ? "Khách hàng" : "Nhân viên"})`}
                  </Typography>
                  <Typography fontSize={14}>
                    {transaction.movie.name}
                  </Typography>
                </Stack>
              </Stack>
              <Typography fontSize={14}>
                {dayjs(transaction.createdAt).toNow()}
              </Typography>
            </Stack>
          </ListItem>
        ))}
      </List>
      <Button component={Link} to="/giao-dich">
        Xem tất cả
      </Button>
    </Stack>
  );
};

export default RecentTransactions;
