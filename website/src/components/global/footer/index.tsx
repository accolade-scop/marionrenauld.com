import Link from "next/link";

export default function Footer() {
    return (<footer>
            <section>
                <Link target="_blank"
                      href="http://poincare.univ-lorraine.fr/fr/membre-associe/marion-renauld">philosophie</Link>
                <Link target="_blank" href="https://www.instagram.com/marionrenauld/">
                    <img src="/img/photo.svg" className="picto" alt="Lien Instagram"/></Link>
                <Link href="mailto:marion.renauld1@gmail.com">marion.renauld1@gmail.com</Link>
            </section>

            <section>
                <span>marion.renauld © 2017</span>
                <span>Conception <Link target="_blank" href="http://lea-candat.fr/">Léa Candat</Link></span>
                <span><Link href="/mentions-legales/">Mentions légales</Link></span>
            </section>
        </footer>);
}
