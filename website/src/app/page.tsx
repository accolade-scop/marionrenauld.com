import { ACMS, ACMSConfig } from '@/utils/tool';
import Link from 'next/link';

export default async function Home() {

    // on récupère la liste de tous les projets
    const actionsList = (await ACMS.getList('action')).sort((a, b) => (a.date || '') > (b.date || '') ? -1 : 1);
    const langagesList = (await ACMS.getList('langage')).sort((a, b) => (a.date || '') > (b.date || '') ? -1 : 1);
    const objetsList = (await ACMS.getList('objet')).sort((a, b) => (a.date || '') > (b.date || '') ? -1 : 1);


    return (
        <main className="sommaire">
            <article className="container">
                <nav>
                    <h1><Link href="/projet/action/">Action</Link></h1>
                    {actionsList.map((a, index)=> <Link href={ACMS.getLink('action', a)} key={index}>{a.name}</Link>)}
                </nav>
                <nav>
                    <h1><Link href="/projet/langage/">Langage</Link></h1>
                    {langagesList.map((a, index)=> <Link href={a.fichier?.src || ''} key={index} target="_blank">{a.name}</Link>)}
                </nav>
                <nav>
                    <h1><Link href="/projet/objet/">Objet</Link></h1>
                    {objetsList.map((a, index)=> <Link href={ACMS.getLink('objet', a)} key={index}>{a.name}</Link>)}
                </nav>

            </article>

        </main>
    )
}
