import ClientWrapper from "./components/ClientWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen overflow-x-hidden">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
