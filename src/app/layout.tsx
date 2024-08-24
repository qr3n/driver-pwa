import NextTopLoader from 'nextjs-toploader';
import { Providers } from "@/providers";
import { PropsWithChildren } from "react";
import { Menu } from "@/widgets/menu";
import { metadata } from "@/app/meta";
import "./globals.css";
import { Toaster } from "react-hot-toast";
export { metadata }

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <Toaster toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '200px',
                    fontWeight: 500
                },

                duration: 700
            }} />
            <NextTopLoader color="#FF551F" template='<div class="bar" role="bar"><div class="peg"></div></divz' showSpinner={false} />
            <div className='flex flex-col sm:flex-row w-[100dvw] h-[100dvh]'>
              <div className='w-full h-full'>
                  { children }
              </div>
              <Menu/>
          </div>
        </Providers>
      </body>
    </html>
  );
}
