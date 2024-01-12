import Footer from '@/app/components/global/footer';
import Header from '@/app/components/global/header';
import './assets/globals.sass';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="fr">

      <head>
          <title>marion.renauld | Performances artistiques | Méditations publiques | Livres uniques</title>
          <meta property="og:title" content="marion.renauld | Performances artistiques | Méditations publiques | Livres uniques"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://www.anim-gag.fr"/>
          <meta property="og:image" content=""/>
          <meta property="description"
                content="appmarion.renauld écrit, agence & active le verbe sous forme de performances artistiques, de livres uniques, de recueils poétiques et de méditations publiques."/>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
          <link rel="icon" href="/favicon.ico" sizes="any"/>
      </head>

      <body>
      <Header/>
      <main>
          {children}
      </main>
      <Footer/>
      </body>
      </html>
  )
}
