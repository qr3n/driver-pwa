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
      <head>
          <title>Test</title>
          <meta name="description" content={'Test'}/>
          <meta name="generator" content={'Next.js'}/>
          <link rel="manifest" href={"/manifest.json"}/>
          <meta name="keywords" content={["nextjs", "nextjs14", "next14", "pwa", "next-pwa"].join(", ")}/>
          {[{ media: "(prefers-color-scheme: dark)", color: "#fff" }].map(({media, color}, index) => (
              <meta key={index} name="theme-color" media={media} content={color}/>
          ))}
          {[
              { name: "Alldo Faiz Ramadhani" },
              {
                  name: "Alldo Faiz Ramadhani",
                  url: "https://www.linkedin.com/in/alldofaiz/",
              },
          ].map(({name, url}, index) => (
              <meta key={index} name="author" content={name} {...(url && {href: url})} />
          ))}
          <meta name="viewport" content={"minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"}/>
          {[
              { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
              { rel: "icon", url: "icons/icon-128x128.png" },
          ].map(({rel, url}, index) => (
              <link key={index} rel={rel} href={url}/>
          ))}
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

              duration: 700
          }}/>
          <NextTopLoader color="#FF551F" template='<div class="bar" role="bar"><div class="peg"></div></divz'
                         showSpinner={false}/>
          <div className='flex flex-col sm:flex-row w-[100dvw] h-[100dvh]'>
              <div className='w-full h-full'>
                  {children}
              </div>
              <Menu/>
          </div>
      </Providers>
      </body>
      </html>
  );
}
