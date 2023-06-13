import {
  Avatar,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ActionsMenu from "~/components/ActionsMenu";
import Iconify from "~/components/Iconify";
import Table from "~/components/Table";
import IStaff from "~/interfaces/staff.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { staffSagaActionTypes } from "~/redux/sagaActionTypes";

const columns = [
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    renderCell: (params: GridRowParams) => {
      const { row } = params;

      return (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt=""
            src={row.avatar ? row.avatar : "/assets/images/user.png"}
          />
        </Stack>
      );
    },
  },
  {
    field: "name",
    headerName: "Tên nhân viên",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 200,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return (
        <Typography variant="subtitle2" noWrap textAlign="start">
          {row.name}
        </Typography>
      );
    },
  },
  {
    field: "gender",
    headerName: "Giới tính",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    minWidth: 120,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      return row.gender === "Nam" ? (
        <Chip
          label="Nam"
          color="info"
          sx={{
            bgcolor: "info.light",
            color: "info.dark",
            fontSize: "13px",
            fontWeight: "bold",
            width: "60px",
            borderRadius: "4px",
          }}
        />
      ) : (
        <Chip
          label="Nữ"
          color="error"
          sx={{
            bgcolor: "error.light",
            color: "error.dark",
            fontSize: "13px",
            fontWeight: "bold",
            width: "60px",
          }}
        />
      );
    },
  },
  {
    field: "birthdate",
    headerName: "Ngày sinh",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 150,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      const birthday = new Date(row.birthday).toLocaleDateString();
      return <Typography>{birthday}</Typography>;
    },
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 150,
  },
  {
    field: "status",
    headerName: "Tình trạng",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
    minWidth: 130,
    renderCell: (params: GridRowParams) => {
      const { row } = params;
      if (row.status === "Đang làm")
        return (
          <Chip
            label="Đang làm"
            color="success"
            sx={{
              bgcolor: "success.light",
              color: "success.dark",
              fontSize: "13px",
              fontWeight: "bold",
              width: "130px",
              borderRadius: "4px",
            }}
          />
        );
      else
        return (
          <Chip
            label="Đã nghỉ"
            color="error"
            sx={{
              bgcolor: "error.light",
              color: "error.dark",
              fontSize: "13px",
              fontWeight: "bold",
              width: "130px",
              borderRadius: "4px",
            }}
          />
        );
    },
  },
  {
    field: "Hành động",
    headerName: "",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "right",
    sortable: false,
    hideable: false,
    filterable: false,
    minWidth: 80,
    flex: 1,
    renderCell: (params: GridRowParams) => {
      const { handleEdit, ...staff } = params.row;

      return <ActionsMenu item={staff} onEdit={handleEdit} />;
    },
  },
];

export default function Staffs() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const staffs = useAppSelector((state) => state.staff.staffs);

  const handleEdit = (staff: IStaff) => {
    navigate(`/nhan-vien/${staff._id}`, { state: { staff } });
  };

  const mappedRows = staffs.map((staff) => ({
    ...staff,
    id: staff._id,
    handleEdit,
  }));

  useEffect(() => {
    dispatch({ type: staffSagaActionTypes.GET_STAFFS_SAGA });
  }, [dispatch]);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        columnGap={2}
      >
        <Typography variant="h4">Nhân viên</Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/them-nhan-vien"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Thêm nhân viên
        </Button>
      </Stack>

      <Card
        sx={{
          width: "100%",
          "& .super-app-theme--header": {
            fontWeight: "bold",
            color: "#222",
            fontSize: "16px",
          },
        }}
      >
        <Table rows={mappedRows} columns={columns} />
      </Card>
    </Container>
  );
}
