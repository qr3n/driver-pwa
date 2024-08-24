import { Providers } from "@/providers";
import { PropsWithChildren } from "react";
import { metadata } from "@/app/meta";
import { Menu } from "@/app/Menu";
export { metadata }
import "./globals.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className='flex flex-col sm:flex-row w-screen h-screen'>
              <div className='w-full h-full p-4'>
                  { children }
              </div>
              <Menu/>
          </div>
        </Providers>
      </body>
    </html>
  );
}
