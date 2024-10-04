"use client";

import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      {CameraFrame(webcamRef, videoConstraints, resizedImage)}
      {SnapButton(
        webcamRef,
        isPhotoTaken,
        setIsPhotoTaken,
        setResizedImage,
        setAnalysisResult,
        router,
      )}
      {ImportButton(
        isPhotoTaken,
        setIsPhotoTaken,
        setResizedImage,
        setAnalysisResult,
        router,
      )}
    </main>
  );
}
