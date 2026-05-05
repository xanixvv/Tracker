import "./globals.css";

export const metadata = {
  title: "Discipline App",
  description: "Self Improvement System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#000000" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
      <body className="bg-black text-white">
        <div className="max-w-md mx-auto min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}