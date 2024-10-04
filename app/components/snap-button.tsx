import Webcam from "react-webcam";
import useSound from "use-sound";
import Image from "next/image";
import { SetState } from "../lib/utils";
import { takePhoto } from "../lib/utils";

export const SnapButton = (
  webcamRef: React.RefObject<Webcam>,
  isPhotoTaken: boolean,
  setIsPhotoTaken: SetState<boolean>,
  setResizedImage: SetState<string | ArrayBuffer | null>,
  setAnalysisResult: SetState<string | null>,
  router: any,
) => {
  const [play] = useSound("/snap.mp3");

  return (
    <button
      className="mt-8 mb-4 bg-[radial-gradient(circle_at_center,var(--neutral),var(--dark-neutral))] rounded-full"
      onClick={() => {
        takePhoto(
          webcamRef,
          play,
          isPhotoTaken,
          setIsPhotoTaken,
          setResizedImage,
          setAnalysisResult,
          router,
        );
      }}
      type="button"
    >
      <Image
        src="/lens.png"
        alt="Snap Button"
        width={64}
        height={64}
        className="overflow-hidden opacity-30"
      />
    </button>
  );
};
