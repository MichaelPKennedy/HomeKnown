import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ onCropComplete }) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imageRef = useRef(null);

  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onCompleteCrop = (newCrop) => {
    setCompletedCrop(newCrop);
  };

  const getCroppedImage = () => {
    const canvas = document.createElement("canvas");
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imageRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  const handleCrop = async () => {
    const croppedImageUrl = await getCroppedImage();
    onCropComplete(croppedImageUrl);
  };

  const handleImageUrlInput = (e) => {
    setSrc(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter image URL"
        onBlur={handleImageUrlInput}
      />
      {src && (
        <>
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onChange={onCropChange}
            onComplete={onCompleteCrop}
          />
          <button onClick={handleCrop}>Crop Image</button>
        </>
      )}
    </div>
  );
};

export default ImageCropper;
