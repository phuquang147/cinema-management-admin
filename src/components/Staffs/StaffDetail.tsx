import { Avatar, Box, Grid, Typography } from "@mui/material";
import Modal from "~/HOC/Modal";
import IStaff from "~/interfaces/staff.interface";

interface StaffDetailProps {
  open: boolean;
  staff: IStaff | null;
  onClose: () => void;
}

const StaffDetail: React.FC<StaffDetailProps> = ({ open, staff, onClose }) => {
  return (
    <Modal title="Chi tiết nhân viên" open={open} onClose={onClose}>
      {staff ? (
        <Grid container sx={{ width: "100%", p: 4 }} rowGap={1}>
          <Grid
            item
            xs={12}
            width="100%"
            sx={{ display: "flex", justifyContent: "center", pb: 2 }}
          >
            <Avatar
              alt=""
              src="https://i.pravatar.cc/300"
              sx={{ width: "100px", height: "100px" }}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography fontWeight="bold">Họ và tên:</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography sx={{ width: "fit-content" }}>{staff.name}</Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography fontWeight="bold">Email:</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography sx={{ width: "fit-content" }}>{staff.email}</Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography fontWeight="bold">Số điện thoại:</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography sx={{ width: "fit-content" }}>{staff.phone}</Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography fontWeight="bold">Giới tính:</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography sx={{ width: "fit-content" }}>
              {staff.gender}
            </Typography>
          </Grid>
          {/* <Grid item xs={12} lg={3}>
            <Typography fontWeight="bold">Ngày sinh:</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography sx={{ width: "fit-content" }}>
              {staff.birthdate.toISOString()}
            </Typography>
          </Grid> */}
          <Grid item xs={12} lg={3}>
            <Typography fontWeight="bold">Địa chỉ:</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography sx={{ width: "fit-content" }}>
              {staff.address}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography fontWeight="bold">Tình trạng:</Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography sx={{ width: "fit-content" }}>
              {staff.status}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Box></Box>
      )}
    </Modal>
  );
};

export default StaffDetail;
