import { LoadingButton } from "@mui/lab";
import {
  Box,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { imageSagaActionTypes } from "~/redux/sagaActionTypes";
import Iconify from "./Iconify";
import ImageCropper from "./ImageCropper";

interface ImageGalleryProps {
  gallery: string[];
  handleChangeGallery: (gallery: string[]) => void;
  crop?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  gallery,
  handleChangeGallery,
  crop,
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
        payload: { image: formData, handleGetImageUrl: handleUpdateGallery },
      });
    }
  };

  const handleUpdateGallery = (filePath: string) => {
    console.log([...gallery, filePath]);

    handleChangeGallery([...gallery, filePath]);
  };

  const handleDeleteImage = (image: string) => {
    const newGallery = gallery.filter((item) => item !== image);
    handleChangeGallery(newGallery);
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "8px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography>Album ảnh</Typography>
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
            accept="image/png, image/gif, image/jpeg, image/webp"
            hidden
            onChange={(e) => handleChangeImage(e)}
          />
        </LoadingButton>
      </Box>
      <ImageList variant="masonry" cols={4} gap={8}>
        {gallery.map((image) => (
          <ImageListItem key={image}>
            <img src={image} alt="" loading="lazy" />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => {
                    handleDeleteImage(image);
                  }}
                >
                  <Iconify icon="tabler:trash" />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <ImageCropper
        file={selectedFile}
        open={showCrop}
        onClose={handleCloseCrop}
        handleUploadCroppedImage={handleUploadCroppedImage}
      />
    </Grid>
  );
};

export default ImageGallery;
