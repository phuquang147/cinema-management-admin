import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { ReactNode } from "react";
import Iconify from "~/components/Iconify";

interface ModalProps {
  title?: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, open, onClose }) => {
  return (
    <Dialog maxWidth="sm" onClose={onClose} open={open}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle>{title || ""}</DialogTitle>
        <IconButton sx={{ mr: 2 }} color="primary" onClick={onClose}>
          <Iconify icon="ic:round-close"></Iconify>
        </IconButton>
      </Stack>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
