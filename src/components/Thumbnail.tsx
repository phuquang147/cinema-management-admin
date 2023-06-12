import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { imageSagaActionTypes } from "~/redux/sagaActionTypes";
import Iconify from "./Iconify";
import ImageCropper from "./ImageCropper";
interface ThumbnailProps {
  thumbnail: string;
  handleChangeThumbnail: (value: string) => void;
  crop?: boolean;
  aspect?: number;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  handleChangeThumbnail,
  crop = false,
  aspect,
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading.loading);
  const [showCrop, setShowCrop] = useState<boolean>(false);
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

  const handleUploadCroppedImage = (image: File) => {
    uploadImage(image);
  };

  const uploadImage = (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch({
        type: imageSagaActionTypes.POST_IMAGE_SAGA,
        payload: { image: formData, handleGetImageUrl: handleChangeThumbnail },
      });
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
      <Typography>Ảnh chính</Typography>
      {thumbnail === "" ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LoadingButton
            variant="outlined"
            color="info"
            component="label"
            sx={{ width: "60px", height: "60px" }}
            loading={loading}
          >
            <Iconify
              icon="tabler:camera-plus"
              sx={{ height: "24px", width: "24px" }}
            />
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              hidden
              onChange={(e) => handleChangeImage(e)}
            />
          </LoadingButton>
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
        handleUploadCroppedImage={handleUploadCroppedImage}
        aspect={aspect}
      />
    </Grid>
  );
};

export default Thumbnail;
