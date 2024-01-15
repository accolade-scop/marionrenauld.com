import Footer from '@/components/global/footer';
import Header from '@/components/global/header';
import { ReactNode } from 'react';
import './assets/globals.sass';

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
      <html lang="fr">
      <head>
          <title>marion.renauld | Performances artistiques | Méditations publiques | Livres uniques</title>
          <meta property="og:title" content="marion.renauld | Performances artistiques | Méditations publiques | Livres uniques"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://marionrenauld.com/"/>
          <meta property="og:image" content=""/>
          <meta property="description"
                content="marion.renauld écrit, agence & active le verbe sous forme de performances artistiques, de livres uniques, de recueils poétiques et de méditations publiques."/>
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link rel="icon" href="/favicon.ico" sizes="any"/>
      </head>

      <body>
      <Header/>
      {children}
      <Footer/>
      </body>
      </html>
  )
}
