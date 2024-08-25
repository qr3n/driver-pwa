import NextTopLoader from 'nextjs-toploader';
import { Providers } from "@/providers";
import { PropsWithChildren } from "react";
import { Menu } from "@/widgets/menu";
import { metadata } from "@/app/meta";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "next-client-cookies/server";
export { metadata }

export default function RootLayout({ children }: PropsWithChildren) {
  return (
      <html lang="en">
      <head>
          <title>Test</title>
          <meta name="description" content={'Test'}/>
          <meta name="generator" content={'Next.js'}/>
          <link rel="manifest" href={"/manifest.json"}/>
          <meta name="keywords" content={["nextjs", "nextjs14", "next14", "pwa", "next-pwa"].join(", ")}/>
          <meta name="theme-color" media={"(prefers-color-scheme: dark)"} content={"#000000"}/>
          <meta
              name="author"
              content={"Alldo Faiz Ramadhani"} {...("Alldo Faiz Ramadhani" && {href: 'https://github.com/qr3n'})}
          />
          <meta
              name="viewport"
              content={"minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"}
          />
          <link rel={"apple-touch-icon"} href={"icons/icon-128x128.png"}/>
          <link rel={"icon"} href={"icons/icon-128x128.png"}/>
      </head>
      <body>
      <Providers>
          <Toaster toastOptions={{
                  style: {
                      background: '#333',
                      color: '#fff',
                      borderRadius: '200px',
                      fontWeight: 500
                  },
           }}/>
          <NextTopLoader color="#4E79FFFF" template='<div class="bar" role="bar"><div class="peg"></div></divz'
                         showSpinner={false}/>
          <CookiesProvider>
              <div className='flex flex-col sm:flex-row w-[100dvw] h-[100dvh]'>
                  <div className='w-full h-full'>
                      {children}
                  </div>
                  <Menu/>
              </div>
          </CookiesProvider>
      </Providers>
      </body>
      </html>
  );
}
