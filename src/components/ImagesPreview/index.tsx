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
      <h2 className="text-xl font-bold mb-4">
        Captured Images (will fix the UI)
      </h2>
      {capturedImages.length > 0 && (
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
      )}
    </div>
  );
};

export default ImagesPreview;
