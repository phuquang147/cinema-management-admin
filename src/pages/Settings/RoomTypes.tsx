import { Button, Card, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ActionsMenu from "~/components/ActionsMenu";
import Iconify from "~/components/Iconify";
import RoomTypeForm from "~/components/Settings/RoomTypeForm";
import Table from "~/components/Table";
import Modal from "~/HOC/Modal";
import IRoomType from "~/interfaces/roomType.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { roomTypeSagaActionTypes } from "~/redux/sagaActionTypes";

const columns = [
  {
    field: "name",
    headerName: "Tên loại phòng chiếu",
    headerClassName: "super-app-theme--header",
    headerAlign: "left",
    align: "left",
    minWidth: 250,
    renderCell: (params: any) => {
      const { row } = params;
      return (
        <Typography variant="subtitle2" noWrap textAlign="start">
          {row.name}
        </Typography>
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
    minWidth: 180,
    flex: 1,
    renderCell: (params: any) => {
      const { handleOpenDetail, handleEdit, handleDelete, ...roomType } =
        params.row;

      return (
        <ActionsMenu
          item={roomType}
          handleOpenDetail={handleOpenDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    },
  },
];

const RoomTypes: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingRoomType, setEditingRoomType] = useState<IRoomType | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const roomTypes = useAppSelector((state) => state.roomType.roomTypes);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (roomType: IRoomType) => {
    setEditingRoomType(roomType);
    setShowModal(true);
  };

  const handleDelete = async (roomTypeId: string) => {
    dispatch({
      type: roomTypeSagaActionTypes.DELETE_ROOM_TYPE_SAGA,
      payload: { id: roomTypeId },
    });
  };

  const mappedRows = roomTypes.map((roomType) => ({
    ...roomType,
    id: roomType._id,
    handleEdit,
    handleDelete,
  }));

  useEffect(() => {
    dispatch({ type: roomTypeSagaActionTypes.GET_ROOM_TYPES_SAGA });
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
        <Typography variant="h4">Loại phòng chiếu</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleShowModal}
        >
          Thêm loại phòng chiếu
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
      <Modal
        open={Boolean(showModal)}
        onClose={handleCloseModal}
        title={
          !editingRoomType
            ? "Thêm loại phòng chiếu"
            : "Chỉnh sửa loại phòng chiếu"
        }
      >
        <RoomTypeForm
          type={!editingRoomType ? "new" : "edit"}
          roomType={editingRoomType}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </Container>
  );
};

export default RoomTypes;
