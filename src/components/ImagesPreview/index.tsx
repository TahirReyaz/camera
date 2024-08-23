import React from "react";
import ImageItem from "./ImageItem";

const ImagesPreview = ({
  removeImage,
  capturedImages,
}: {
  removeImage: (index: number) => void;
  capturedImages: string[];
}) => {
  return (
    <div className="flex flex-col items-center bg-anilist-mirage p-4">
      <h2 className="text-xl font-medium mb-4 text-anilist-aqua_haze">
        Captured Images
      </h2>
      {capturedImages.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {capturedImages.map((src: string, index: number) => (
            <ImageItem
              {...{
                index,
                removeImage,
                src,
              }}
            />
          ))}
        </div>
      ) : (
        <h3 className="text-lg text-anilist-aqua_haze">No images</h3>
      )}
    </div>
  );
};

export default ImagesPreview;
