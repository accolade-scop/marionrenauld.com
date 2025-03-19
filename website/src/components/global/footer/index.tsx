import Link from "next/link";
import { ACMS } from '@/utils/tool';

export default async function Footer() {
    const fileList= await ACMS.getList('cv');
    const selected = fileList.sort((a, b) => {
        return new Date(b.lastupdate || '') > new Date(a.lastupdate || '') ? 1 : -1
    })[0];
    const url = selected.fichier?.src || '';

    return (<footer>
            <section>
                <Link target="_blank"
                      href="http://poincare.univ-lorraine.fr/fr/membre-associe/marion-renauld">philosophie</Link>
                <Link target="_blank" href={url}>
                    <img src="/img/cv.svg" className="picto" alt="Lien vers curriculum vitae"/></Link>
                <Link target="_blank" href="https://www.instagram.com/marionrenauld/">
                    <img src="/img/photo.svg" className="picto" alt="Lien Instagram"/></Link>
                <Link href="mailto:marion.renauld1@gmail.com">marion.renauld1@gmail.com</Link>
            </section>

        <section>
            <span>marion.renauld © 2024</span>
            <span>Conception <Link target="_blank" href="http://lea-candat.fr/">Léa Candat</Link> et <Link target="_blank" href="https://accolade.coop/">Accolade</Link></span>
            <span><Link href="/mentions-legales/">Mentions légales</Link></span>
        </section>
    </footer>);
}
