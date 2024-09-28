import { handleImageUpload } from "../lib/utils";
import Image from "next/image";

type SetState<T> = (value: T | ((prev: T) => T)) => void;

export const ImportButton = (
  setIsPhotoTaken: SetState<boolean>,
  setResizedImage: SetState<string | ArrayBuffer | null>,
  setAnalysisResult: SetState<string | null>,
  router: any,
) => {
  return (
    <button
      type="button"
      onClick={() => document.getElementById("fileInput")?.click()}
      className="w-20 flex items-center justify-around text-white bg-[--buttons] transition-colors duration-100 hover:bg-[--hover-buttons] rounded-md pt-0.5 px-0.5 mb-8"
    >
      <input
        type="file"
        id="fileInput"
        onChange={(event) =>
          handleImageUpload(
            event,
            setIsPhotoTaken,
            setResizedImage,
            setAnalysisResult,
            router,
          )
        }
        className="hidden"
      />
      <Image
        src="/import-gallery.png"
        alt="import-icon"
        width={18}
        height={18}
      />
      Import
    </button>
  );
};
