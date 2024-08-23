import React from "react";

const ImageItem = ({
  removeImage,
  index,
  src,
}: {
  removeImage: (index: number) => void;
  index: number;
  src: string;
}) => {
  const downloadImage = (imageSrc: string) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "captured_photo.png";
    link.click();
  };

  return (
    <div key={index} className="flex flex-col items-center">
      <img
        src={src}
        alt={`Captured ${index + 1}`}
        className="border rounded mb-2 w-40 h-40 object-contain"
      />
      <button
        onClick={() => downloadImage(src)}
        className="bg-purple-500 text-white p-2 rounded mb-2"
      >
        Download
      </button>
      <button
        onClick={() => removeImage(index)}
        className="bg-red-500 text-white p-2 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default ImageItem;
