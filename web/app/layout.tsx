import "./globals.css";
import GlobalVideoPlayer from "@/components/GlobalVideoPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GlobalVideoPlayer />
        {children}
      </body>
    </html>
  );
}
