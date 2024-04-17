import Image from 'next/image';
import Link from 'next/link';

export default function Header() {

    return <>

    <header>

        <section>

            <Link href="/" className="-o-logo__heading">
                <Image src="/img/logo-marion.png" alt="Logo" width={315} height={38}/>
            </Link>

            <ul className="menu">
                <li><Link href="/">Sommaire</Link></li>
                <li><Link href="/projet/action/">Action</Link></li>
                <li><Link href="/projet/langage/">Langage</Link></li>
                <li><Link href="/projet/objet/">Objet</Link></li>
                <li>
                    <button type={"button"} id="burger">
                        <img src="/img/expand.svg" className="picto" alt="Ouvrir le menu"/>
                    </button>
                </li>
            </ul>

        </section>

    </header>

    <nav>
        <ul className="menu-smart" id="menu-smart">
            <li><Link href="/">Sommaire</Link></li>
            <li><Link href="/projet/action/">Action</Link></li>
            <li><Link href="/projet/langage/">Langage</Link></li>
            <li><Link href="/projet/objet/">Objet</Link></li>
        </ul>
    </nav>

    </>
        ;
}
