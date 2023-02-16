import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import Iconify from "./Iconify";

interface ImageGalleryProps {
  gallery: string[];
  handleChangeGallery: (gallery: string[]) => void;
}
const ImageGallery: React.FC<ImageGalleryProps> = ({
  gallery,
  handleChangeGallery,
}) => {
  const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    // ImageServices.postImage(formData)
    //   .then((response) => {
    //     const newGallery = gallery;
    //     newGallery.push(response.data.link);
    //     handleChangeGallery(newGallery);
    //   })
    //   .catch((error) => {
    //     showSweetAlert("Tải ảnh thất bại", "error");
    //   });
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
            onChange={(e) => {
              uploadImage(e.target.files![0]);
            }}
          />
        </Button>
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
    </Grid>
  );
};

export default ImageGallery;
