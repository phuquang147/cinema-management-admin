import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Iconify from "~/components/Iconify";
import IStaff from "~/interfaces/staff.interface";
import AlertModal from "./AlertModal";

interface ActionMenuProps {
  item: any;
  handleOpenDetail?: (staff: IStaff) => void;
  onDelete?: () => void;
}

const ActionsMenu: React.FC<ActionMenuProps> = ({
  item,
  handleOpenDetail,
  onDelete,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const navigateToEditPage = () => {
    navigate(`${location.pathname}/${item.id}`);
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
      <IconButton color="info" onClick={navigateToEditPage}>
        <Iconify icon="material-symbols:edit-outline-rounded" />
      </IconButton>
      <IconButton color="error" onClick={handleShowConfirmDelete}>
        <Iconify icon="material-symbols:delete-outline-rounded" />
      </IconButton>
      {onDelete && (
        <AlertModal
          content="Bạn chắc chắn muốn xóa?"
          open={showConfirmDelete}
          onClose={handleCloseConfirmDelete}
          onAccept={onDelete}
        />
      )}
    </Box>
  );
};

export default ActionsMenu;
