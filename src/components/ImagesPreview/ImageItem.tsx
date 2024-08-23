import React from "react";
import { FaDownload } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

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
    <div key={index} className="flex flex-col items-center relative">
      <img
        src={src}
        alt={`Captured ${index + 1}`}
        className="rounded mb-2 w-40 h-40 object-contain"
      />
      <div className="absolute z-10 p-2 right-0 h-full flex flex-col justify-between items-end w-fit">
        <div className="cursor-pointer text-anilist-aqua_haze bg-anilist-mandy p-1 rounded">
          <RxCross2
            {...{
              onClick: () => removeImage(index),
            }}
          />
        </div>
        <div className="cursor-pointer text-anilist-aqua_haze bg-anilist-cerulean p-1 rounded">
          <FaDownload
            {...{
              onClick: () => downloadImage(src),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageItem;
