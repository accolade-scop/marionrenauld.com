import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export default function Header() {

    return <>

    <Script src="/js/script.js"></Script>

    <header>

        <section>

            <Link href="/" className="-o-logo__heading">
                <Image src="/img/logo-marion.png" alt="Logo" width={315} height={38}/>
            </Link>

            <ul className="menu">
                <li><Link href="/">Sommaire</Link></li>
                <li><Link href="/categorie/action/">Action</Link></li>
                <li><Link href="/categorie/langage/">Langage</Link></li>
                <li><Link href="/categorie/objet/">Objet</Link></li>
                <li>
                    <button type={"button"} id={"burger"}>
                        <img src="/img/expand.svg" className="picto" alt="Ouvrir le menu"/>
                    </button>
                </li>
            </ul>

        </section>

    </header>

    <nav>
        <ul className="menu-smart" id={"menu-smart"}>
            <li><Link href="/">Sommaire</Link></li>
            <li><Link href="/categorie/action/">Action</Link></li>
            <li><Link href="/categorie/langage/">Langage</Link></li>
            <li><Link href="/categorie/objet/">Objet</Link></li>
        </ul>
    </nav>

    </>
        ;
}
