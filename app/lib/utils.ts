import Webcam from "react-webcam";

export type SetState<T> = (value: T | ((prev: T) => T)) => void;

export async function takePhoto(
  webcamRef: React.RefObject<Webcam>,
  play: () => void,
  isPhotoTaken: boolean,
  setIsPhotoTaken: SetState<boolean>,
  setResizedImage: SetState<string | ArrayBuffer | null>,
  setAnalysisResult: SetState<string | null>,
  router: any
): Promise<void> {
  if (!isPhotoTaken) {
    const imageSrc = webcamRef.current?.getScreenshot();
    play();

    if (!imageSrc) {
      return;
    }

    handleImage(imageSrc, setIsPhotoTaken, setResizedImage, setAnalysisResult, router);
  }

  return;
};

export async function uploadImage(
  event: React.ChangeEvent<HTMLInputElement>,
  isPhotoTaken: boolean,
  setIsPhotoTaken: SetState<boolean>,
  setResizedImage: SetState<string | ArrayBuffer | null>,
  setAnalysisResult: SetState<string | null>,
  router: any
): Promise<void> {
  if (!isPhotoTaken) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const image = await readImageAsDataURL(file);

    await handleImage(image, setIsPhotoTaken, setResizedImage, setAnalysisResult, router);
  }

  return;
}

export async function handleImage(
  image: string,
  setIsPhotoTaken: SetState<boolean>,
  setResizedImage: SetState<string | ArrayBuffer | null>,
  setAnalysisResult: SetState<string | null>,
  router: any
): Promise<void> {
  try {
    setIsPhotoTaken(true);

    const resizedImage = await resizeImage(image);
    setResizedImage(resizedImage);

    const analysisResult = await analyzeImage(resizedImage);
    setAnalysisResult(analysisResult);

    if (analysisResult) {
      localStorage.setItem("imageSent", image);
      localStorage.setItem("analysisResult", analysisResult);
      router.push("camera/scanned");
    }
  } catch (error) {
    console.error("Error handling image: ", error);
  }
}

export function readImageAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function resizeImage(imageSrc: string, maxWidth: number = 512, maxHeight: number = 512): Promise<string> {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      let ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      }
    };
  });
}

export async function analyzeImage(imageSrc: string): Promise<string | null> {
  try {
    const response = await fetch("../api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64Image: imageSrc.split(",")[1] }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing image: ", error);
    return null;
  }
}

export function formatText(text: string): string {
  text = text.replace(/\n/g, "<br/>");
  text = text.replace(/### (.+)/g, "<h3>$1</h3>");
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  text = text.replace(/(?:\n|^)- (.+)/g, "\n<li>$1</li>");
  text = text.replace(/<\/li>\n<li>/g, "</li><li>");
  text = text.replace(/(?:<\/li>)\n*(?=<li>)/g, "</li></ul><ul>");
  text = text.replace(/(<li>.+<\/li>)/g, "<ul>$1</ul>");

  return text;
};