import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import Modal from "~/HOC/Modal";
import { useDebounceEffect } from "~/hooks/useDebounceEffect";
import { canvasPreview } from "./canvasPreview";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface ImageCropperProps {
  file: File | undefined;
  open: boolean;
  onClose: () => void;
  handleUploadCroppedImage: (image: File) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  file,
  open,
  onClose,
  handleUploadCroppedImage,
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  useEffect(() => {
    if (file) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  }, [file]);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0
        );
      }
    },
    100,
    [completedCrop, 1, 0]
  );

  const handleSubmit = () => {
    onClose();
    previewCanvasRef.current!.toBlob((blob: any) => {
      let newFile = new File([blob], "name", { type: file!.type });
      handleUploadCroppedImage(newFile);
    });
  };

  return (
    <Modal title="Cắt ảnh" open={open} onClose={onClose}>
      <Box sx={{ p: 1, maxWidth: "500px" }}>
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => {
              setCompletedCrop(c);
            }}
            aspect={1}
          >
            <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        )}
        <div>
          {!!completedCrop && (
            <Box sx={{ display: "none" }}>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </Box>
          )}
        </div>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageCropper;
