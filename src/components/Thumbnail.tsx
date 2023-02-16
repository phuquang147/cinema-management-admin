import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Iconify from "./Iconify";

interface ThumbnailProps {
  thumbnail: string;
  handleChangeThumbnail: (value: string) => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  handleChangeThumbnail,
}) => {
  const uploadImage = (file: File | null) => {
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
              onChange={(e) => {
                uploadImage(e.target.files![0]);
              }}
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
    </Grid>
  );
};

export default Thumbnail;
