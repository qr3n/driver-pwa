import NextTopLoader from 'nextjs-toploader';
import { Providers } from "@/providers";
import { PropsWithChildren } from "react";
import { Menu } from "@/widgets/menu";
import { metadata } from "@/app/meta";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "next-client-cookies/server";
import { SliderMenu } from "@/widgets/slider-menu/ui/SliderMenu";
import { Share } from "@/widgets/share";
export { metadata }
import { Toaster as ShadcnToaster } from "@/shared/shadcn/ui/toaster"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
      <html lang="en">
      <head>
          <title>PBOX - Driver</title>
          <meta name="description" content={'PostaDriver'}/>
          <meta name="generator" content={'PostaDriver'}/>
          <link rel="manifest" href={"/manifest.json"}/>
          <meta name="keywords" content={["nextjs", "nextjs14", "next14", "pwa", "next-pwa"].join(", ")}/>
          <meta name="theme-color" media={"(prefers-color-scheme: dark)"} content={"#000000"}/>
          <meta
              name="author"
              content={"https://github.com/qr3n"}
          />
          <meta
              name="viewport"
              content={"minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"}
          />
          <link rel={"apple-touch-icon"} href={"icons/icon-128x128.png"}/>
          <link rel={"icon"} href={"icons/icon-128x128.png"}/>
      </head>
      <body>
      <Share/>
      <Providers>
          <Toaster toastOptions={{
                  style: {
                      background: '#333',
                      color: '#fff',
                      borderRadius: '200px',
                      fontWeight: 500
                  },
           }}/>
          <ShadcnToaster/>
          <NextTopLoader color="#4E79FFFF" template='<div class="bar" role="bar"><div class="peg"></div></divz'
                         showSpinner={false}/>
          <CookiesProvider>
              <div className='flex flex-col sm:flex-row w-[100dvw] h-[100dvh]'>
                  <div className='w-full h-full'>
                      {children}
                  </div>
                  <Menu/>
                  <SliderMenu/>
              </div>
          </CookiesProvider>
      </Providers>
      </body>
      </html>
  );
}
