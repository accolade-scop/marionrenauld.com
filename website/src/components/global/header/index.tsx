import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export default function Header() {

    return <>

    <Script src="/js/script.js"></Script>

    <header>

        <section>

            <Link href="/" className="-o-logo__heading">
                <Image src="/img/logo-marion.png" alt="Logo"/>
            </Link>

            <ul className="menu">
                <li><Link href="/">Sommaire</Link></li>
                <li><Link href="/categorie/action/">Action</Link></li>
                <li><Link href="/categorie/langage/">Langage</Link></li>
                <li><Link href="/categorie/objet/">Objet</Link></li>
                <li><span className="material-icons">expand_more</span></li>
            </ul>

        </section>

    </header>

    <nav className="smart">
        <ul className="menu">
            <li><Link href="/website/public">Sommaire</Link></li>
            <li><Link href="/portfolio/action/">Action</Link></li>
            <li><Link href="/portfolio/langage/">Langage</Link></li>
            <li><Link href="/portfolio/objet/">Objet</Link></li>
            <li><span className="material-icons">expand_more</span></li>
        </ul>
    </nav>

</>
    ;
}
