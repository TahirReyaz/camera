import React, { useState, useRef } from "react";

const App: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraAccessible, setIsCameraAccessible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestCameraAccess = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      if (permissionStatus.state === "granted") {
        setIsCameraAccessible(true);
        alert("Camera access granted. You can now open the camera.");
      } else if (permissionStatus.state === "prompt") {
        // Try accessing the camera to trigger the prompt
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          setIsCameraAccessible(true);
          alert(
            "Camera access granted after prompt. You can now open the camera."
          );
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

  const openCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOpen(true);
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

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        setImageSrc(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  const downloadImage = () => {
    if (imageSrc) {
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = "captured_photo.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {!isCameraAccessible ? (
        <button
          onClick={requestCameraAccess}
          className="bg-gray-500 text-white p-2 rounded mb-4"
        >
          Request Camera Access
        </button>
      ) : (
        <>
          {!isCameraOpen ? (
            <button
              onClick={openCamera}
              className="bg-green-500 text-white p-2 rounded mb-4"
            >
              Open Camera
            </button>
          ) : (
            <button
              onClick={closeCamera}
              className="bg-yellow-500 text-white p-2 rounded mb-4"
            >
              Close Camera
            </button>
          )}
        </>
      )}

      <video
        ref={videoRef}
        autoPlay
        className={`border rounded ${isCameraOpen ? "block" : "hidden"}`}
        width="400"
        height="300"
      ></video>

      <canvas
        ref={canvasRef}
        className="hidden"
        width="400"
        height="300"
      ></canvas>

      {isCameraOpen && (
        <button
          onClick={takePhoto}
          className="bg-blue-500 text-white p-2 rounded mb-4"
        >
          Take Photo
        </button>
      )}

      {imageSrc && (
        <div className="flex flex-col items-center">
          <img src={imageSrc} alt="Captured" className="border rounded mb-4" />
          <button
            onClick={downloadImage}
            className="bg-purple-500 text-white p-2 rounded"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
