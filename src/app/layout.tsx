import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import Image from "next/image";
import { inter, rubikMonoOne } from '~/styles/font';

export const metadata = {
  title: "PEMILU HMM ITB",
  description: "Website Pemilihan Umum HMM",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <div className="relative z-0 flex h-[calc(100vh-4rem)] flex-col overflow-hidden bg-blue-900/60 *:flex-1">
            <div className="absolute bottom-0 z-0 left-0 aspect-square h-full -translate-x-1/2 translate-y-2/3 rounded-full bg-navy/90 p-16">
              <div className="h-full w-full rounded-full bg-navy p-16">
                <div className="h-full w-full rounded-full bg-black"></div>
              </div>
            </div>
            <Image
              src="/vector.png"
              alt="logo"
              width={1000}
              height={1000}
              className="absolute right-0 pointer-events-none z-0"
              draggable={false}
            />
            {children}
          </div>
          <div className="relative flex h-14 items-center justify-center px-6 py-1">
            <h1 className={`${rubikMonoOne.className} text-2xl leading-none`}>
              Web Pemilu HMM ITB 2024
            </h1>
            <Image
              src="/kolaborasi-berkarya.png"
              alt="logo"
              width={200}
              height={500}
              className="absolute left-0 h-[80%] object-contain pointer-events-none"
              draggable={false}
            />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
