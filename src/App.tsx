import React, { useState, useRef } from "react";
import ImagesPreview from "./components/ImagesPreview";

const App: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraAccessible, setIsCameraAccessible] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isUsingBackCamera, setIsUsingBackCamera] = useState(false); // State to track camera type
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestCameraAccess = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      if (permissionStatus.state === "granted") {
        setIsCameraAccessible(true);
      } else if (permissionStatus.state === "prompt") {
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          setIsCameraAccessible(true);
        } catch (error) {
          console.error("Error accessing camera: ", error);
          alert("Camera access denied or unavailable.");
        }
      } else {
        alert(
          "Camera access is denied. Please enable camera access in your browser settings."
        );
      }
    } catch (error) {
      console.error("Error requesting camera permissions: ", error);
      alert("Error requesting camera permissions.");
    }
  };

  const openCamera = async (useBackCamera = false) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: useBackCamera ? "environment" : "user", // Toggle between front and back cameras
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOpen(true);
          setIsUsingBackCamera(useBackCamera);
        }
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const switchCamera = () => {
    closeCamera(); // Close the current camera
    openCamera(!isUsingBackCamera); // Open the opposite camera
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Ensure the canvas matches the video stream's dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setCapturedImages((prevImages) => [...prevImages, imageData]);
      }
    }
  };

  const removeImage = (index: number) => {
    setCapturedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="relative bg-anilist-white_firefly min-h-screen grid grid-cols-1 md:grid-cols-4">
      <div className="flex flex-col items-center justify-center col-span-1 md:col-span-3">
        {!isCameraAccessible ? (
          <button
            onClick={requestCameraAccess}
            className="bg-gray-500 text-anilist-aqua_haze p-2 rounded mb-4"
          >
            Request Camera Access
          </button>
        ) : (
          <div className="grid w-full grid-cols-3 gap-12">
            <div />
            {!isCameraOpen ? (
              <button
                onClick={() => openCamera(isUsingBackCamera)}
                className="bg-anilist-persian_green text-anilist-aqua_haze w-fit p-2 rounded mb-4"
              >
                Open Camera
              </button>
            ) : (
              <>
                <button
                  onClick={closeCamera}
                  className="bg-anilist-mandy text-anilist-aqua_haze p-2 w-fit rounded mb-4"
                >
                  Close Camera
                </button>
                <button
                  onClick={switchCamera}
                  className="bg-anilist-mirage text-anilist-aqua_haze p-2 w-fit rounded mb-4"
                >
                  Switch Camera
                </button>
              </>
            )}
          </div>
        )}

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            className={`border rounded ${isCameraOpen ? "block" : "hidden"}`}
            width="400"
            height="300"
          ></video>

          {/* Square overlay for camera screen */}
          {isCameraOpen && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center pointer-events-none">
              <div className="border-4 border-anilist-atlantis w-[80%] h-[80%]"></div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden"></canvas>

        {isCameraOpen && (
          <button
            onClick={takePhoto}
            className="bg-anilist-cerulean text-anilist-aqua_haze p-2 rounded my-4"
          >
            Take Photo
          </button>
        )}
      </div>
      <ImagesPreview
        {...{
          capturedImages,
          removeImage,
        }}
      />
    </div>
  );
};

export default App;
