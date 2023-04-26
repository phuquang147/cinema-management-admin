import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import Iconify from "~/components/Iconify";
import IStaff from "~/interfaces/staff.interface";
import AlertModal from "./AlertModal";

interface ActionMenuProps {
  item: any;
  handleOpenDetail?: (staff: IStaff) => void;
  onEdit?: (item: any) => void;
  onDelete?: (id: String) => void;
}

const ActionsMenu: React.FC<ActionMenuProps> = ({
  item,
  handleOpenDetail,
  onEdit,
  onDelete,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <Box>
      {handleOpenDetail && (
        <IconButton
          color="success"
          onClick={() => {
            handleOpenDetail(item);
          }}
        >
          <Iconify icon="material-symbols:info-outline-rounded" />
        </IconButton>
      )}
      {onEdit && (
        <IconButton
          color="info"
          onClick={() => {
            onEdit(item);
          }}
        >
          <Iconify icon="material-symbols:edit-outline-rounded" />
        </IconButton>
      )}
      {onDelete && (
        <IconButton color="error" onClick={handleShowConfirmDelete}>
          <Iconify icon="material-symbols:delete-outline-rounded" />
        </IconButton>
      )}
      {onDelete && (
        <AlertModal
          content="Bạn chắc chắn muốn xóa?"
          open={showConfirmDelete}
          onClose={handleCloseConfirmDelete}
          onAccept={() => onDelete(item.id)}
        />
      )}
    </Box>
  );
};

export default ActionsMenu;
