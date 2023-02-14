import { Box, Button, DialogContent } from "@mui/material";
import MuiTypography from "@mui/material/Typography";
import Modal from "~/HOC/Modal";

interface AlertModalProps {
  open: boolean;
  content: string;
  onClose: () => void;
  onAccept: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  content,
  onClose,
  onAccept,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <DialogContent>
        <MuiTypography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
          {content}
        </MuiTypography>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={onClose} color="error" sx={{ mr: 1 }}>
            Huỷ
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="info"
            onClick={onAccept}
          >
            Xác nhận
          </Button>
        </Box>
      </DialogContent>
    </Modal>
  );
};

export default AlertModal;
