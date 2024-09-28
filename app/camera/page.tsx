"use client";

import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { resizeImage, analyzeImage } from "../lib/utils";
import { CameraFrame } from "../components/camera-frame";
import { SnapButton } from "../components/snap-button";
import { ImportButton } from "../components/import-button";

export default function CameraPage() {
  const webcamRef = useRef<Webcam>(null);
  const videoConstraints = {
    facingMode: "environment",
  };

  const [isPhotoTaken, setIsPhotoTaken] = useState<boolean>(false);
  const [resizedImage, setResizedImage] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const router = useRouter();

  const takePhoto = async () => {
    if (!isPhotoTaken) {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setIsPhotoTaken(true);

        const resizedImage = await resizeImage(imageSrc);
        setResizedImage(resizedImage);

        const analysisResult = await analyzeImage(resizedImage);
        setAnalysisResult(analysisResult);

        if (analysisResult) {
          localStorage.setItem(
            "imageSent",
            resizedImage.startsWith("data:image/jpeg;base64,")
              ? resizedImage
              : `data:image/jpeg;base64,${resizedImage}`,
          );
          localStorage.setItem("analysisResult", analysisResult);
          router.push("camera/scanned");
        }
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      {CameraFrame(webcamRef, videoConstraints, resizedImage)}
      <SnapButton
        onClick={takePhoto}
        webcamRef={webcamRef}
        videoConstraints={videoConstraints}
      />
      {ImportButton(
        setIsPhotoTaken,
        setResizedImage,
        setAnalysisResult,
        router,
      )}
    </main>
  );
}
