export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center relative h-dvh w-full">
      <div
        className="spinner"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      ></div>
    </main>
  );
}
