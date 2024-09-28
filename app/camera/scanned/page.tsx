"use client";

import { useEffect, useState } from "react";
import { formatText } from "@/app/lib/utils";
import Image from "next/image";

export default function ScannedPage() {
  const [imageSent, setImageSent] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("imageSent");
    const storedResult = localStorage.getItem("analysisResult");

    console.log("Stored Image:", storedImage);
    console.log("Stored Result:", storedResult);

    if (storedResult) {
      setImageSent(storedImage);
      setAnalysisResult(formatText(storedResult));
    } else {
      setAnalysisResult(
        "Scan an aircraft to instantly get detailed information!",
      );
    }
  }, []);

  return (
    <main className="flex flex-col items-center px-6 sm:px-16 gap-10 h-full w-full scroll-smooth overflow-auto">
      {imageSent && (
        <Image
          src={imageSent ?? ""}
          alt="Aircraft"
          width={512}
          height={512}
          className="w-auto max-h-96 shadow-slate-950/80 shadow-2xl rounded-lg mt-8"
        />
      )}

      {analysisResult && (
        <p
          dangerouslySetInnerHTML={{ __html: analysisResult }}
          className="pb-8"
        />
      )}
    </main>
  );
}