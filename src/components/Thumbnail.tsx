import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Iconify from "./Iconify";
import ImageCropper from "./ImageCropper";

interface ThumbnailProps {
  thumbnail: string;
  handleChangeThumbnail: (value: string) => void;
  crop?: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  handleChangeThumbnail,
  crop = false,
}) => {
  const [showCrop, setShowCrop] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleCloseCrop = () => {
    setShowCrop(false);
  };

  const handleChangeImage = (e: any) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      if (crop) {
        setSelectedFile(e.target.files[0]);
        setShowCrop(true);
      } else uploadImage(e.target.files[0]);
    }
  };

  const uploadImage = (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // ImageServices.postImage(formData)
      //   .then((response) => {
      //     handleChangeThumbnail(response.data.link);
      //   })
      //   .catch((error) => {
      //     showSweetAlert("Tải ảnh thất bại", "error");
      //   });
    }
  };

  const handleDeleteThumbnail = () => {
    handleChangeThumbnail("");
  };

  return (
    <Grid
      item
      xs={12}
      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      <Typography>Thumbnail</Typography>
      {thumbnail === "" ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button
            variant="outlined"
            color="info"
            component="label"
            sx={{ width: "60px", height: "60px" }}
          >
            <Iconify
              icon="tabler:camera-plus"
              sx={{ height: "24px", width: "24px" }}
            />
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              hidden
              onChange={(e) => handleChangeImage(e)}
            />
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#fff",
              height: "100px",
              width: "auto",
              objectFit: "contain",
            }}
            variant="rounded"
            src={thumbnail}
          ></Avatar>
          <IconButton
            color="error"
            onClick={handleDeleteThumbnail}
            sx={{ ml: 1 }}
          >
            <Iconify icon="tabler:trash" />
          </IconButton>
        </Box>
      )}
      <ImageCropper
        file={selectedFile}
        open={showCrop}
        onClose={handleCloseCrop}
        setSelectedFile={setSelectedFile}
      />
    </Grid>
  );
};

export default Thumbnail;
