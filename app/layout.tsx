// app/layout.tsx
import "./globals.css";
import Header from "./Components/Header";

export const metadata = {
  title: "NGO Website",
  description: "Next.js app with components routing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div id="root" className="min-h-screen flex flex-col">

          {/* Global Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
