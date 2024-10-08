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
    <div className="flex flex-col items-center bg-anilist-mirage pt-4 md:max-h-screen justify-between">
      <h2 className="text-xl font-medium mb-4 text-anilist-aqua_haze">
        Captured Images
      </h2>
      <div className="px-4 md:overflow-auto">
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
      <div className="py-4 bg-anilist-bunker w-full flex justify-center">
        <div className="text-lg text-anilist-aqua_haze font-medium w-fit p-4 px-12 rounded bg-anilist-mirage text-center cursor-pointer">
          Upload All
        </div>
      </div>
    </div>
  );
};

export default ImagesPreview;
