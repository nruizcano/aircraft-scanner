import Webcam from "react-webcam";
import Image from "next/image";

export const CameraFrame = (
  webcamRef: React.RefObject<Webcam>,
  videoConstraints: {
    facingMode: string;
  },
  resizedImage: string | ArrayBuffer | null,
) => {
  return (
    <div className="flex-grow mx-6 mt-8 border-8 border-[--accent] shadow-slate-950/80 shadow-2xl rounded-3xl bg-transparent overflow-hidden">
      {resizedImage ? (
        <Image
          src={resizedImage as string}
          alt="Resized"
          width={512}
          height={512}
          className="w-full h-full object-cover"
        />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          forceScreenshotSourceSize={true}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
