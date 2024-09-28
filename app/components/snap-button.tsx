import Webcam from "react-webcam";
import useSound from "use-sound";
import Image from "next/image";

export const SnapButton = ({
  onClick,
  webcamRef,
  videoConstraints,
}: {
  onClick: () => void;
  webcamRef: React.RefObject<Webcam>;
  videoConstraints: { facingMode: string };
}) => {
  const [play] = useSound("/snap.mp3");

  return (
    <button
      className="mt-8 mb-4 bg-[radial-gradient(circle_at_center,var(--neutral),var(--dark-neutral))] rounded-full"
      onClick={() => {
        onClick();
        play();
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
