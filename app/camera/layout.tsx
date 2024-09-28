import { Header } from "../components/header";
import { Footer } from "../components/footer";

export default function CameraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col relative h-dvh">
        <Header />
        {children}
        <Footer />
    </div>
  );
}
